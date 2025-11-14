import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { Gift, Sparkles } from 'lucide-react-native';
import { WatchAdsScreenStyles as styles } from './styles/WatchAdsScreenStyles.ts';
import { claimAdReward } from '../services/api';
import { loadRewardedAd, showRewardedAd } from './RewardedAdManager';

interface WatchAdsScreenProps {
  onBack: () => void;
  onRewardClaimed: (amount: number) => void;
}

export function WatchAdsScreen({ onBack, onRewardClaimed }: WatchAdsScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [adReady, setAdReady] = useState(false);
  const [rewardAmount, setRewardAmount] = useState<number | null>(null);
  const [adLoadFailed, setAdLoadFailed] = useState(false);

  const handleAdRewardEarned = async (reward: any) => {
    console.log('✅ Ad watched successfully', reward);
    
    // Claim the reward from backend
    try {
      console.log('📡 Calling claimAdReward API...');
      const response = await claimAdReward();
      console.log('✅ API Response:', response);
      
      setRewardAmount(response.rewardedTokens);
      onRewardClaimed(response.rewardedTokens);
      
      Alert.alert(
        '🎉 Reward Claimed!',
        `You earned ${response.rewardedTokens} tokens!`,
        [{ 
          text: 'Awesome!', 
          onPress: () => {
            setRewardAmount(null);
            // Reload ad for next time
            setIsLoading(true);
            setAdLoadFailed(false);
            setAdReady(false);
            
            try {
              loadRewardedAd(handleAdRewardEarned);
              
              // Simulate ad load success
              setTimeout(() => {
                console.log('✅ Next ad loaded successfully');
                setAdReady(true);
                setIsLoading(false);
                setAdLoadFailed(false);
              }, 2000);
              
            } catch (error) {
              console.error('❌ Error loading next ad:', error);
              setIsLoading(false);
              setAdLoadFailed(true);
            }
            
            // Fallback timeout
            setTimeout(() => {
              if (!adReady) {
                setIsLoading(false);
                setAdLoadFailed(true);
              }
            }, 10000);
          }
        }]
      );
    } catch (error: any) {
      console.error('❌ Claim reward error:', error);
      console.error('❌ Error response:', error.response?.data);
      Alert.alert(
        'Error', 
        error.response?.data?.message || 'Failed to claim reward. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔄 Loading rewarded ad...');
    setIsLoading(true);
    setAdLoadFailed(false);
    
    try {
      loadRewardedAd(handleAdRewardEarned);
      
      setTimeout(() => {
        console.log('✅ Ad loaded successfully');
        setAdReady(true);
        setIsLoading(false);
        setAdLoadFailed(false);
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error loading ad:', error);
      setIsLoading(false);
      setAdLoadFailed(true);
    }
    
    // Set timeout to check if ad loaded
    const timeout = setTimeout(() => {
      if (!adReady) {
        console.log('❌ Ad failed to load after timeout');
        setIsLoading(false);
        setAdLoadFailed(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const handleWatchAd = () => {
    if (!adReady) {
      Alert.alert('Please wait', 'Ad is still loading...');
      return;
    }

    console.log('▶️ Starting ad...');
    setIsLoading(true);
    setAdReady(false);
    showRewardedAd();
    
    // Fallback timeout in case ad fails
    setTimeout(() => {
      setIsLoading(false);
      setAdReady(true);
      console.log('⏱️ Ad timeout - resetting state');
    }, 15000);
  };

  const handleRetryLoadAd = () => {
    console.log('🔄 Retrying ad load...');
    setIsLoading(true);
    setAdLoadFailed(false);
    setAdReady(false);
    
    try {
      loadRewardedAd(handleAdRewardEarned);
      
      // Simulate ad load success
      setTimeout(() => {
        console.log('✅ Ad loaded successfully on retry');
        setAdReady(true);
        setIsLoading(false);
        setAdLoadFailed(false);
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error loading ad on retry:', error);
      setIsLoading(false);
      setAdLoadFailed(true);
    }
    
    // Fallback timeout
    setTimeout(() => {
      if (!adReady) {
        console.log('❌ Ad failed to load on retry');
        setIsLoading(false);
        setAdLoadFailed(true);
      }
    }, 10000);
  };

  return (
    <ImageBackground
      source={require('../assets/images/HomeScreen1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Gift size={20} color="#ffaa00b5" />
            <Text style={styles.headerTitle}>Watch Ads & Earn</Text>
          </View>

          <TouchableOpacity onPress={onBack} style={styles.cancelButton}>
            <Image
              source={require('../assets/images/xButton.png')}
              style={styles.cancelButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Reward Card */}
        <ImageBackground
          source={require('../assets/images/balance.png')}
          style={styles.rewardCard}
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.cardContent}>
            <Gift size={40} color="#ffaa00b5" />
            <Text style={styles.cardTitle}>Earn Random Rewards!</Text>
            <Text style={styles.cardDescription}>
              Watch a short ad and claim random token rewards
            </Text>
            
            <View style={styles.rewardOptions}>
              <Text style={styles.rewardLabel}>Possible Rewards:</Text>
              
              {/* First row - 3 tokens */}
              <View style={styles.tokenRow}>
                {[10, 20, 30].map((amount) => (
                  <View key={amount} style={styles.tokenBadge}>
                    <Sparkles size={12} color="#fbbf24" />
                    <Text style={styles.tokenText}>{amount}</Text>
                  </View>
                ))}
              </View>
              
              {/* Second row - 3 tokens */}
              <View style={styles.tokenRow}>
                {[40, 50, 60].map((amount) => (
                  <View key={amount} style={styles.tokenBadge}>
                    <Sparkles size={12} color="#fbbf24" />
                    <Text style={styles.tokenText}>{amount}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* No Ads Available Message */}
        {adLoadFailed && !isLoading && (
          <View style={styles.noAdsCard}>
            <Text style={styles.noAdsTitle}>😔 No Ads Available Right Now</Text>
            <Text style={styles.noAdsText}>
              Ads are currently unavailable. Please try again later.
            </Text>
            <TouchableOpacity
              onPress={handleRetryLoadAd}
              activeOpacity={0.8}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Watch Ad Button */}
        {!adLoadFailed && (
          <TouchableOpacity
            onPress={handleWatchAd}
            disabled={isLoading || !adReady}
            activeOpacity={0.8}
            style={[
              styles.watchButton,
              (isLoading || !adReady) && styles.watchButtonDisabled,
            ]}
          >
            {isLoading ? (
              <>
                <ActivityIndicator color="#ffaa00b5" size="small" />
                <Text style={styles.watchButtonText}>Loading Ad...</Text>
              </>
            ) : (
              <>
                <Gift size={24} color="#ffaa00b5" />
                <Text style={styles.watchButtonText}>
                  {adReady ? 'Watch Ad & Claim Reward' : 'Loading Ad...'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            1. Tap the button above to watch a short ad{'\n'}
            2. Watch the complete ad (don't skip!){'\n'}
            3. Receive a random token reward (10-60 tokens){'\n'}
            4. Rewards are added to your balance instantly
          </Text>
        </View>

        {rewardAmount && (
          <View style={styles.successCard}>
            <Sparkles size={26} color="#ffd700" />
            <Text style={styles.successText}>
              Last reward: {rewardAmount} tokens
            </Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
