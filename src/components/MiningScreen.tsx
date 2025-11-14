import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';
import { TrendingUp, Clock, Zap } from 'lucide-react-native';
import { MiningScreenStyles as styles } from './styles/MiningScreenStyles';
import { updateMultiplier, getCurrentMiningSession } from '../services/api';
import { loadRewardedAd, showRewardedAd } from './RewardedAdManager';

export interface MiningSession {
  duration: number;
  multiplier: number;
  startTime: number;
  rewardRate: number;
  totalReward: number;
}

interface MiningScreenProps {
  session: MiningSession;
  onCancel: (shouldStopMining: boolean) => void;
  onUpgradeMultiplier: (newMultiplier: number) => void;
  onMiningCompleted: () => void;
}

export function MiningScreen({
  session,
  onCancel,
  onUpgradeMultiplier,
  onMiningCompleted,
}: MiningScreenProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(session.duration);
  const [progress, setProgress] = useState(0);
  const [currentMultiplier, setCurrentMultiplier] = useState(
    session.multiplier,
  );
  const [adVisible, setAdVisible] = useState(false);
  const [adCountdown, setAdCountdown] = useState(10);
  const [isCompleted, setIsCompleted] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const adTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasTriggeredCompletionRef = useRef(false);

  const pollBackendProgress = useCallback(async () => {
    try {
      const data = await getCurrentMiningSession();
      if (!data?.hasActiveSession) return;

      setCurrentValue(data.currentMined);
      setProgress(data.progressPercentage);
      setCurrentMultiplier(data.multiplier);
      setTimeRemaining(data.remainingSeconds);

      if (
        !hasTriggeredCompletionRef.current &&
        (data.remainingSeconds <= 0 || data.progressPercentage >= 100)
      ) {
        hasTriggeredCompletionRef.current = true;
        setIsCompleted(true);
      }
    } catch (error) {
      console.log('Progress error', error);
    }
  }, []);

  useEffect(() => {
    pollBackendProgress();
    intervalRef.current = setInterval(pollBackendProgress, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pollBackendProgress]);

  useEffect(() => {
    if (isCompleted) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      onMiningCompleted();
    }
  }, [isCompleted, onMiningCompleted]);

  const handleUpgrade = useCallback(async () => {
    try {
      const backend = await getCurrentMiningSession();
      if (!backend?.hasActiveSession) return;

      const newMultiplier = Math.min(backend.multiplier + 1, 6);
      await updateMultiplier(newMultiplier);
      onUpgradeMultiplier(newMultiplier);
      setCurrentMultiplier(newMultiplier);
      pollBackendProgress();
    } catch (error) {
      console.log('Upgrade failed', error);
    }
  }, [onUpgradeMultiplier, pollBackendProgress]);

  const upgradeRef = useRef(handleUpgrade);
  useEffect(() => {
    upgradeRef.current = handleUpgrade;
  }, [handleUpgrade]);

  useEffect(() => {
    loadRewardedAd(async reward => {
      console.log('✅ Reward earned', reward);

      if (adTimeoutRef.current) {
        clearTimeout(adTimeoutRef.current);
        adTimeoutRef.current = null;
      }

      setAdVisible(false);
      setAdCountdown(0);
      await upgradeRef.current();
    });
  }, []);

  const handleWatchAdPress = () => {
    if (isCompleted) return;

    setAdVisible(true);
    setAdCountdown(10);
    showRewardedAd();

    if (adTimeoutRef.current) clearTimeout(adTimeoutRef.current);
    adTimeoutRef.current = setTimeout(() => {
      console.log('⏳ Ad failed to load — closing modal');
      setAdVisible(false);
      setAdCountdown(0);
      adTimeoutRef.current = null;
    }, 10000);
  };

  const handleClose = () => onCancel(false);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ImageBackground
      source={require('../assets/images/HomeScreen1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {isCompleted ? 'Mining Completed' : 'Mining Active'}
            </Text>
          </View>

          <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
            <Image
              source={require('../assets/images/xButton.png')}
              style={styles.cancelButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Animation */}
        <View style={styles.animationContainer}>
          <ImageBackground
            source={require('../assets/images/miningHero.png')}
            style={styles.miningIcon}
            imageStyle={styles.miningIconImage}
          />
        </View>

        {/* Tokens Card */}
        <ImageBackground
          source={require('../assets/images/img1.png')}
          style={styles.cardBackground}
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.cardInner}>
            <View style={styles.cardHeader}>
              <TrendingUp size={25} color="#4ade80" />
              <Text style={styles.cardLabel}>Tokens Mined</Text>
            </View>

            <View style={styles.valueRow}>
              <Text style={styles.valueAmount}>
                {isCompleted
                  ? session.totalReward.toFixed(4)
                  : currentValue.toFixed(4)}
              </Text>
              <Text style={styles.valueUnit}>tokens</Text>
            </View>

            <Text style={styles.valueSubtext}>
              {isCompleted
                ? 'Mining ended'
                : 'Live mining based on server time'}
            </Text>
          </View>
        </ImageBackground>

        {/* Progress Card */}
        <ImageBackground
          source={require('../assets/images/img1.png')}
          style={styles.cardBackground}
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.card}>
            <View style={styles.progressHeader}>
              <Text style={styles.cardLabel}>Mining Progress</Text>
              <Text style={styles.progressPercent}>{progress.toFixed(1)}%</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>

            <View style={styles.timeRow}>
              <Clock size={16} color="#fbbf24" />
              <Text style={styles.timeLabelText}>Time Remaining</Text>
              <Text style={styles.timeValue}>
                {isCompleted ? '00:00:00' : formatTime(timeRemaining)}
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* Multiplier + Rate */}
        <View style={styles.detailsGrid}>
          {/* Multiplier Card */}
          <ImageBackground
            source={require('../assets/images/img3.png')}
            style={styles.subCardBackground}
            imageStyle={styles.subCardImageStyle}
          >
            <TouchableOpacity
              disabled={isCompleted || currentMultiplier >= 6}
              onPress={handleWatchAdPress}
              style={[
                styles.card,
                styles.detailCard,
                (isCompleted || currentMultiplier >= 6) && { opacity: 0.4 },
              ]}
              activeOpacity={0.85}
            >
              <View style={styles.detailHeader}>
                <Zap size={16} color="#fbbf24" />
                <Text style={styles.detailLabel}>
                  {currentMultiplier >= 6 
                    ? 'Max Multiplier\nReached' 
                    : 'Multiplier\n(tap to watch ad)'}
                </Text>
              </View>
              <Text style={styles.detailValue}>{currentMultiplier}×</Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={{ marginLeft: -85 }} />

          {/* Rate Card */}
          <ImageBackground
            source={require('../assets/images/img3.png')}
            style={styles.subCardBackground}
            imageStyle={styles.subCardImageStyle}
          >
            <View style={[styles.card, styles.detailCard]}>
              <View style={styles.detailHeader}>
                <TrendingUp size={16} color="#4ade80" />
                <Text style={styles.detailLabel}>Rate</Text>
              </View>
              <View style={styles.rateRow}>
                <Text style={styles.detailValue}>
                  {(currentMultiplier * 0.01).toFixed(4)}
                </Text>
                <Text style={styles.rateUnit}>/sec</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      {/* Ad Loading Modal */}
      <Modal visible={adVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>Loading Ad...</Text>
          <Text
            style={[
              styles.subText,
              { color: '#fff', marginTop: 8, fontSize: 14 },
            ]}
          >
            Please wait {adCountdown}s before retrying
          </Text>
        </View>
      </Modal>
    </ImageBackground>
  );
}
