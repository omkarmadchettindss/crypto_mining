import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, AppState } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SignupScreen } from './src/components/SignupScreen';
import { HomeScreen } from './src/components/HomeScreen';
import { SelectDurationPopup } from './src/components/SelectDurationPopup';
import { MiningScreen } from './src/components/MiningScreen';
import { ClaimPopup } from './src/components/ClaimPopup';
import { SplashScreen } from './src/components/SplashScreen';
import { LeaderboardScreen } from './src/components/LeaderboardScreen';
import { WatchAdsScreen } from './src/components/WatchAdsScreen';
import { ReferAndEarnScreen } from './src/components/ReferAndEarnScreen';

import {
  startMining as apiStartMining,
  finishMining as apiFinishMining,
  getUserBalance,
  getCurrentMiningSession,
} from './src/services/api';
import { notificationService } from './src/services/notificationService';

type Screen = 'signup' | 'home' | 'mining' | 'leaderboard' | 'watchads' | 'refer';

export interface MiningSession {
  duration: number;
  multiplier: number;
  startTime: number;
  rewardRate: number;
  totalReward: number;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('signup');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [showSelectDuration, setShowSelectDuration] = useState(false);
  const [showClaimPopup, setShowClaimPopup] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [miningSession, setMiningSession] = useState<MiningSession | null>(null);
  const [claimedAmount, setClaimedAmount] = useState(0);
  const [hasMiningSession, setHasMiningSession] = useState(false);
  const [leaderboardRefreshKey, setLeaderboardRefreshKey] = useState(0);
  const [actualMinedAmount, setActualMinedAmount] = useState(0);

  const hasNotifiedRef = useRef(false);
  const scheduledNotificationId = useRef<string | null>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        // Initialize notification service
        await notificationService.initialize();

        // Check for initial notification (app opened from notification)
        const initialNotification = await notifee.getInitialNotification();
        if (initialNotification) {
          console.log('🔔 App opened from notification:', initialNotification);
          await AsyncStorage.setItem('openClaim', 'true');
        }
      } catch (err) {
        console.error('❌ Notification setup error:', err);
      }
    };

    setupNotifications();
  }, []);

  // ✅ Handle foreground notification events
  useEffect(() => {
    console.log('🔵 Setting up foreground listener...');
    
    const unsubscribe = notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log('🔵 [FOREGROUND EVENT] Type:', type);
      console.log('🔵 [FOREGROUND EVENT] Detail:', JSON.stringify(detail));

      if (type === EventType.PRESS) {
        console.log('🔵 Notification tapped in FOREGROUND');
        
        try {
          await AsyncStorage.setItem('openClaim', 'true');
          console.log('✅ Set openClaim flag');

          // Navigate to mining screen if not already there
          if (screen !== 'mining') {
            console.log('🔵 Navigating to mining screen...');
            setScreen('mining');
          }
          
          // Show claim popup after a brief delay
          setTimeout(() => {
            console.log('🔵 Showing claim popup...');
            setShowClaimPopup(true);
          }, 300);
        } catch (error) {
          console.error('❌ Error handling foreground press:', error);
        }
      }
    });

    return () => {
      console.log('🔵 Cleaning up foreground listener');
      unsubscribe();
    };
  }, [screen]);

  // ✅ Check for notification tap on app launch/resume
  useEffect(() => {
    console.log('📱 Setting up app state listener...');

    const checkClaimIntent = async () => {
      try {
        console.log('🔍 Checking for openClaim flag...');
        const openClaim = await AsyncStorage.getItem('openClaim');
        console.log('🔍 openClaim value:', openClaim);

        if (openClaim === 'true') {
          console.log('✅ Found openClaim flag - opening claim popup');
          await AsyncStorage.removeItem('openClaim');

          // Load mining session if needed
          if (!miningSession) {
            console.log('🔍 Loading mining session...');
            const data = await getCurrentMiningSession();
            if (data?.hasActiveSession) {
              const baseRate = 0.01;
              const durationSeconds = data.selectedHour * 3600;
              setMiningSession({
                duration: durationSeconds,
                multiplier: data.multiplier,
                startTime: new Date(data.startTime).getTime(),
                rewardRate: baseRate * data.multiplier,
                totalReward: baseRate * data.multiplier * durationSeconds,
              });
            }
          }

          // Navigate to mining screen
          setScreen('mining');
          
          // Show claim popup
          setTimeout(() => {
            console.log('✅ Showing claim popup');
            setShowClaimPopup(true);
          }, 500);
        }
      } catch (error) {
        console.error('❌ Error checking claim intent:', error);
      }
    };

    // Check on mount
    checkClaimIntent();

    // Listen for app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log('📱 App state changed:', appState.current, '->', nextAppState);
      
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('📱 App came to FOREGROUND - checking claim intent');
        checkClaimIntent();
      }
      
      appState.current = nextAppState;
    });

    return () => {
      console.log('📱 Cleaning up app state listener');
      subscription.remove();
    };
  }, [miningSession]);

  // ✅ Initialize app
  useEffect(() => {
    const init = async () => {
      try {
        console.log('🚀 Initializing app...');
        const token = await AsyncStorage.getItem('token');
        const walletId = await AsyncStorage.getItem('walletId');

        await new Promise<void>(resolve => setTimeout(resolve, 3000));

        if (token && walletId) {
          console.log('✅ User authenticated');
          setWalletAddress(walletId);
          setScreen('home');

          // Check for active mining session
          const data = await getCurrentMiningSession();
          if (data?.hasActiveSession) {
            console.log('⛏️ Found active mining session');
            setHasMiningSession(true);
            const baseRate = 0.01;
            const durationSeconds = data.selectedHour * 3600;

            setMiningSession({
              duration: durationSeconds,
              multiplier: data.multiplier,
              startTime: new Date(data.startTime).getTime(),
              rewardRate: baseRate * data.multiplier,
              totalReward: baseRate * data.multiplier * durationSeconds,
            });
            setScreen('mining');
          }
        } else {
          console.log('❌ User not authenticated');
          setScreen('signup');
        }
      } catch (err) {
        console.error('❌ Init error:', err);
        setScreen('signup');
      } finally {
        setShowSplash(false);
      }
    };

    init();
  }, []);

  const fetchBalance = useCallback(async () => {
    try {
      const res = await getUserBalance();
      if (typeof res.balance === 'number') setBalance(res.balance);
    } catch (err) {
      console.error('❌ Balance fetch error:', err);
    }
  }, []);

  useEffect(() => {
    if (!showSplash && screen === 'home') {
      fetchBalance();
      getCurrentMiningSession().then(res =>
        setHasMiningSession(res.hasActiveSession === true),
      );
    }
  }, [screen, showSplash, fetchBalance]);

  // ✅ Schedule notification with exact alarm
  const scheduleNotification = async (endTime: number) => {
    try {
      // Cancel any existing notifications first
      if (scheduledNotificationId.current) {
        await notificationService.cancelNotification(scheduledNotificationId.current);
      }
      await notificationService.cancelNotification('mining-complete');

      // Schedule new notification
      const notificationId = await notificationService.scheduleMiningCompleteNotification(endTime);
      
      if (notificationId) {
        scheduledNotificationId.current = notificationId;
        
        // Verify the notification was scheduled
        await notificationService.getScheduledNotifications();
      }

      return notificationId;
    } catch (error) {
      console.error('❌ Error scheduling notification:', error);
      return null;
    }
  };

  // ✅ Start mining
  const handleDurationSelect = async (hours: number, multiplier: number) => {
    try {
      // 🧪 TEST MODE: Set to true to use 30 seconds instead of hours for testing
      const TEST_MODE = false; // Change to true to test notifications quickly
      const TEST_DURATION_SECONDS = 30; // 30 seconds for testing
      
      console.log(`⛏️ Starting mining: ${hours} hours, ${multiplier}x multiplier`);
      
      if (TEST_MODE) {
        console.log('🧪 TEST MODE ENABLED: Using', TEST_DURATION_SECONDS, 'seconds instead of', hours, 'hours');
        console.log('🧪 This allows you to test background notifications quickly!');
      }
      
      hasNotifiedRef.current = false;
      
      const sessionData = await apiStartMining(hours, multiplier);

      const baseRate = 0.01;
      
      // Get server start time
      const serverStartTime = new Date(sessionData.miningStartTime).getTime();
      const now = Date.now();
      
      // Calculate duration and end time
      let durationSeconds;
      let endTime;
      
      if (TEST_MODE) {
        // In test mode, use test duration from current time
        durationSeconds = TEST_DURATION_SECONDS;
        endTime = now + (TEST_DURATION_SECONDS * 1000);
      } else {
        // In production, use actual hours and sync with server
        durationSeconds = hours * 3600;
        
        // Calculate elapsed time since server started
        const elapsedMs = Math.max(0, now - serverStartTime);
        const remainingMs = (durationSeconds * 1000) - elapsedMs;
        
        // End time is current time + remaining time
        endTime = now + Math.max(0, remainingMs);
      }
      
      const startTime = TEST_MODE ? now : serverStartTime;

      console.log('📊 Mining Session Details:');
      console.log('  - Duration (seconds):', durationSeconds);
      console.log('  - Duration (hours):', durationSeconds / 3600);
      console.log('  - Start time:', new Date(startTime).toLocaleString());
      console.log('  - End time:', new Date(endTime).toLocaleString());
      console.log('  - TEST_MODE:', TEST_MODE);

      const newSession: MiningSession = {
        duration: durationSeconds,
        multiplier: sessionData.multiplier,
        startTime: startTime,
        rewardRate: baseRate * sessionData.multiplier,
        totalReward: baseRate * sessionData.multiplier * durationSeconds,
      };

      setMiningSession(newSession);
      setHasMiningSession(true);
      setShowSelectDuration(false);
      setScreen('mining');

      // Schedule notification - THIS IS CRITICAL FOR BACKGROUND/FOREGROUND
      console.log('⏰ Scheduling notification...');
      console.log('  Current time:', new Date().toLocaleString());
      console.log('  End time:', new Date(endTime).toLocaleString());
      console.log('  Seconds until notification:', Math.round((endTime - Date.now()) / 1000));
      
      const notifId = await scheduleNotification(endTime);
      
      if (notifId) {
        console.log('✅ Notification scheduled successfully!');
        console.log('  Notification ID:', notifId);
        console.log('📌 Notification will fire at:', new Date(endTime).toLocaleString());
        console.log('📌 Put app in BACKGROUND to test notification');
      } else {
        console.error('❌ Failed to schedule notification!');
        console.error('  Check notification permissions');
        console.error('  Check exact alarm permission (Android 12+)');
      }
    } catch (err) {
      console.error('❌ Start mining error:', err);
    }
  };

  // ✅ Cancel scheduled notification
  const cancelScheduledNotification = async () => {
    try {
      if (scheduledNotificationId.current) {
        await notificationService.cancelNotification(scheduledNotificationId.current);
        scheduledNotificationId.current = null;
      }
      
      // Also cancel by ID in case of issues
      await notificationService.cancelNotification('mining-complete');
    } catch (error) {
      console.error('❌ Error canceling notification:', error);
    }
  };

  // ✅ Handle mining completion (called when notification is tapped)
  const handleMiningCompleted = useCallback(async () => {
    if (hasNotifiedRef.current) {
      console.log('⚠️ Already handled, skipping');
      return;
    }

    hasNotifiedRef.current = true;
    console.log('✅ Mining completed - handling claim');

    // Fetch actual mined amount from backend - this is the EXACT amount
    try {
      const sessionData = await getCurrentMiningSession();
      if (sessionData?.hasActiveSession) {
        const actualAmount = sessionData.currentMined || 0;
        setActualMinedAmount(actualAmount);
        console.log('💰 Actual mined amount from backend (for popup):', actualAmount);
      } else {
        // If no active session, use the miningSession totalReward
        if (miningSession) {
          setActualMinedAmount(miningSession.totalReward);
          console.log('💰 Using miningSession totalReward:', miningSession.totalReward);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching actual mined amount:', error);
      // Fallback to miningSession totalReward
      if (miningSession) {
        setActualMinedAmount(miningSession.totalReward);
      }
    }

    // Show claim popup
    console.log('✅ Showing claim popup');
    setShowClaimPopup(true);
  }, [miningSession]);

  // ✅ Monitor server status to handle DB time changes
  useEffect(() => {
    if (!miningSession) return;

    console.log('⏱️ Starting server status monitor...');
    let interval: any;

    const checkServerStatus = async () => {
      try {
        const data = await getCurrentMiningSession();
        
        if (!data?.hasActiveSession) {
          console.log('⚠️ No active session on server');
          return;
        }

        const serverRemaining = data.remainingSeconds || 0;
        
        // Only log every 30 seconds to reduce noise
        if (serverRemaining % 30 === 0 || serverRemaining <= 10) {
          console.log('⏱️ Server remaining:', serverRemaining, 'seconds');
        }
        
        // If server says mining is complete, trigger notification
        if (serverRemaining <= 0 && !hasNotifiedRef.current) {
          console.log('⏰ Server says mining complete!');
          hasNotifiedRef.current = true;
          
          // Cancel any scheduled notification
          await cancelScheduledNotification();
          
          // Fetch actual mined amount
          const actualAmount = data.currentMined || 0;
          setActualMinedAmount(actualAmount);
          console.log('💰 Actual mined amount:', actualAmount);
          
          // Show notification
          try {
            await notificationService.displayImmediateNotification(
              '⛏️ Mining Completed!',
              'Tap here to claim your rewards now!'
            );
            console.log('✅ Notification displayed');
          } catch (error) {
            console.error('❌ Error displaying notification:', error);
          }
          
          // Show claim popup if on mining screen
          if (screen === 'mining') {
            setShowClaimPopup(true);
          }
        }
      } catch (err) {
        console.error('❌ Server status check error:', err);
      }
    };

    // Check every 10 seconds
    interval = setInterval(checkServerStatus, 10000);
    
    // Check immediately
    checkServerStatus();

    return () => {
      console.log('⏱️ Stopping server status monitor');
      clearInterval(interval);
    };
  }, [miningSession, screen]);

  // ✅ Claim rewards
  const handleClaim = async () => {
    if (!miningSession) return;

    try {
      console.log('💰 Claiming rewards...');
      const amountToShow = actualMinedAmount || miningSession.totalReward;
      console.log('💰 Amount shown in popup:', amountToShow);
      
      await cancelScheduledNotification();
      
      const result = await apiFinishMining();
      
      // Use the backend's rewardGained as the source of truth
      // This is what gets added to the user's balance
      const gained = typeof result.rewardGained === 'number'
        ? result.rewardGained
        : amountToShow;

      console.log('💰 Amount from backend (rewardGained):', result.rewardGained);
      console.log('💰 Final claimed amount to display:', gained);

      // Set this as the claimed amount to show in HomeScreen
      setClaimedAmount(gained);
      await fetchBalance();
      setLeaderboardRefreshKey(prev => prev + 1);
      
      console.log('✅ Claimed:', gained, 'tokens');
    } catch (err) {
      console.error('❌ Claim error:', err);
    } finally {
      hasNotifiedRef.current = false;
      setMiningSession(null);
      setHasMiningSession(false);
      setActualMinedAmount(0);
      setShowClaimPopup(false);
      setScreen('home');
    }
  };

  // ✅ Cancel mining
  const handleCancelMining = async (shouldStop: boolean) => {
    if (shouldStop) {
      try {
        console.log('🛑 Cancelling mining session...');
        await cancelScheduledNotification();
        await apiFinishMining();
        await fetchBalance();
      } catch (err) {
        console.error('❌ Cancel mining error:', err);
      }
    }
    hasNotifiedRef.current = false;
    setMiningSession(null);
    setHasMiningSession(false);
    setScreen('home');
  };

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {screen === 'signup' && (
            <SignupScreen
              onSignup={addr => {
                setWalletAddress(addr);
                setClaimedAmount(0);
                setBalance(0);
                setScreen('home');
              }}
            />
          )}

          {screen === 'home' && (
            <HomeScreen
              balance={balance}
              walletAddress={walletAddress}
              onStartMining={() => setShowSelectDuration(true)}
              onOpenMining={async () => {
                if (!hasMiningSession) return;
                const data = await getCurrentMiningSession();
                if (data?.hasActiveSession) {
                  const baseRate = 0.01;
                  const durationSeconds = data.selectedHour * 3600;
                  setMiningSession({
                    duration: durationSeconds,
                    multiplier: data.multiplier,
                    startTime: new Date(data.startTime).getTime(),
                    rewardRate: baseRate * data.multiplier,
                    totalReward: baseRate * data.multiplier * durationSeconds,
                  });
                  setScreen('mining');
                }
              }}
              hasMiningSession={hasMiningSession}
              lastClaimed={claimedAmount}
              setBalance={setBalance}
              setHasMiningSession={setHasMiningSession}
              onLogout={async () => {
                await AsyncStorage.multiRemove(['token', 'walletId']);
                await cancelScheduledNotification();
                setWalletAddress('');
                setBalance(0);
                setClaimedAmount(0);
                setMiningSession(null);
                setHasMiningSession(false);
                setShowClaimPopup(false);
                setScreen('signup');
              }}
              onOpenLeaderboard={() => setScreen('leaderboard')}
              onOpenWatchAds={() => setScreen('watchads')}
              onOpenReferAndEarn={() => setScreen('refer')}
            />
          )}

          {screen === 'mining' && miningSession && (
            <MiningScreen
              session={miningSession}
              onCancel={handleCancelMining}
              onUpgradeMultiplier={m =>
                setMiningSession(prev =>
                  prev ? { ...prev, multiplier: m } : prev,
                )
              }
              onMiningCompleted={handleMiningCompleted}
            />
          )}

          {screen === 'leaderboard' && (
            <LeaderboardScreen
              key={leaderboardRefreshKey}
              navigation={{ goBack: () => setScreen('home') }}
              currentUserWallet={walletAddress}
            />
          )}

          {screen === 'watchads' && (
            <WatchAdsScreen
              onBack={() => setScreen('home')}
              onRewardClaimed={async (amount) => {
                setClaimedAmount(amount);
                await fetchBalance();
                setLeaderboardRefreshKey(prev => prev + 1);
              }}
            />
          )}

          {screen === 'refer' && (
            <ReferAndEarnScreen
              onBack={() => setScreen('home')}
              onReferralSuccess={async () => {
                await fetchBalance();
                setLeaderboardRefreshKey(prev => prev + 1);
              }}
            />
          )}

          <SelectDurationPopup
            open={showSelectDuration}
            onClose={() => setShowSelectDuration(false)}
            onSelect={handleDurationSelect}
          />

          <ClaimPopup
            open={showClaimPopup}
            amount={actualMinedAmount || miningSession?.totalReward || claimedAmount || 0}
            onClaim={handleClaim}
          />
        </>
      )}
    </View>
  );
}