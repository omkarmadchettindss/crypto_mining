import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {
  Wallet,
  TrendingUp,
  Pickaxe,
  Sparkles,
  LogOut,
  Gift,
} from 'lucide-react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { HomeScreenStyles as styles } from './styles/HomeScreenStyles';
import { getUserBalance, getCurrentMiningSession, getReferralCode } from '../services/api';
import LottieView from 'lottie-react-native';
import miningAnimation from '../assets/animations/CoinBox.json';
import { BANNER_UNIT_ID } from '../config/constants';

interface HomeScreenProps {
  balance: number;
  walletAddress: string;
  onStartMining: () => void;
  onOpenMining: () => void;
  hasMiningSession: boolean;
  lastClaimed: number;
  setBalance: (value: number) => void;
  setHasMiningSession: (value: boolean) => void;
  onLogout: () => void;
  onOpenLeaderboard: () => void;
  onOpenWatchAds: () => void;
  onOpenReferAndEarn: () => void;
}

export function HomeScreen({
  balance,
  walletAddress,
  onStartMining,
  onOpenMining,
  hasMiningSession,
  lastClaimed,
  setBalance,
  setHasMiningSession,
  onLogout,
  onOpenLeaderboard,
  onOpenWatchAds,
  onOpenReferAndEarn,
}: HomeScreenProps) {
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [referralEarnings, setReferralEarnings] = useState(0);

  const formatAddress = (addr: string) =>
    addr.length <= 10 ? addr : `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  useEffect(() => {
    getUserBalance()
      .then(res => {
        setBalance(res.balance);
      })
      .catch(() => {});

    getCurrentMiningSession()
      .then(res => {
        setHasMiningSession(res.hasActiveSession === true);
      })
      .catch(() => {});

    getReferralCode()
      .then(res => {
        setReferralEarnings(res.referralEarnings || 0);
      })
      .catch(() => {});
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/HomeScreen1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <View style={styles.addressRow}>
              <Wallet size={16} color="#ffaa00b5" />
              <View style={{ marginLeft: 8 }} />
              <Text style={styles.address}>{formatAddress(walletAddress)}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={onOpenLeaderboard} style={styles.logo}>
              <Image
                source={require('../assets/images/leaderBoardIcon.png')}
                style={styles.crownImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={{ marginLeft: 14 }}>
              <LogOut size={25} color="#d6b58c" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <ImageBackground
          source={require('../assets/images/balance.png')}
          style={styles.balanceBackground}
          imageStyle={styles.balanceBackgroundImage}
        >
          {/* Lottie Animation */}
          <LottieView
            source={miningAnimation}
            autoPlay
            loop={false}
            style={styles.balanceLottie}
          />

          <View style={styles.cardHeader}>
            <TrendingUp size={20} color="#63b624e3" />
            <View style={{ marginLeft: 8 }} />
            <Text style={styles.cardLabel}>Total Balance</Text>
          </View>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>{balance.toFixed(2)}</Text>
            <View style={{ marginLeft: 8 }} />
            <Text style={styles.balanceUnit}>tokens</Text>
          </View>
        </ImageBackground>

        {/* Last Claimed */}
        {lastClaimed > 0 && (
          <View style={styles.claimedCard}>
            <View style={styles.claimedRow}>
              <Sparkles size={20} color="#ffaa00b5" />
              <View style={{ marginLeft: 8 }} />
              <Text style={styles.claimedText}>
                Last claimed:{' '}
                <Text style={styles.claimedAmount}>
                  {lastClaimed.toFixed(2)} tokens
                </Text>
              </Text>
            </View>
          </View>
        )}

        {/* Banner Ad */}
        {bannerLoaded && !bannerError && (
          <View style={styles.bannerAdContainer}>
            <BannerAd
              unitId={__DEV__ ? TestIds.BANNER : BANNER_UNIT_ID}
              size={BannerAdSize.FULL_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                console.log('✅ Banner ad loaded');
                setBannerLoaded(true);
                setBannerError(false);
              }}
              onAdFailedToLoad={(error) => {
                console.log('❌ Banner ad failed to load:', error);
                setBannerLoaded(false);
                setBannerError(true);
              }}
            />
          </View>
        )}

        {/* Hidden BannerAd to preload */}
        {!bannerLoaded && !bannerError && (
          <View style={{ height: 0, overflow: 'hidden' }}>
            <BannerAd
              unitId={__DEV__ ? TestIds.BANNER : BANNER_UNIT_ID}
              size={BannerAdSize.FULL_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              onAdLoaded={() => {
                console.log('✅ Banner ad loaded');
                setBannerLoaded(true);
                setBannerError(false);
              }}
              onAdFailedToLoad={(error) => {
                console.log('❌ Banner ad failed to load:', error);
                setBannerLoaded(false);
                setBannerError(true);
              }}
            />
          </View>
        )}

        {/* Mining Status */}
        <TouchableOpacity
          activeOpacity={hasMiningSession ? 0.8 : 1}
          onPress={() => hasMiningSession && onOpenMining()}
        >
          <ImageBackground
            source={require('../assets/images/balance.png')}
            style={styles.miningBackground}
            imageStyle={styles.balanceBackgroundImage}
          >
            <View style={styles.statusHeader}>
              <Text style={styles.ancientLabel}>Mining Status</Text>

              <View
                style={[
                  styles.statusBadgeAncient,
                  hasMiningSession && styles.statusBadgeAncientActive,
                ]}
              >
                <View
                  style={[
                    styles.statusDotAncient,
                    hasMiningSession && styles.statusDotAncientActive,
                  ]}
                />
                <View style={{ marginLeft: 8 }} />
                <Text
                  style={[
                    styles.statusAncientText,
                    hasMiningSession && styles.statusAncientTextActive,
                  ]}
                >
                  {hasMiningSession ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>

            <Text style={styles.statusDescriptionAncient}>
              {hasMiningSession
                ? 'Your mining session is currently active. Check progress in the mining screen.'
                : 'Start a new mining session to earn tokens automatically.'}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* Referral Earnings Notification */}
        {referralEarnings > 0 && (
          <View style={styles.referralEarningsCard}>
            <Gift size={20} color="#4ade80" />
            <View style={{ marginLeft: 8 }} />
            <Text style={styles.referralEarningsText}>
              Earned {referralEarnings} tokens from referrals! 🎉
            </Text>
          </View>
        )}

        {/* Watch Ads & Refer Buttons Row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={onOpenWatchAds}
            activeOpacity={0.8}
            style={styles.watchAdsButton}
          >
            <Sparkles size={20} color="#ffaa00b5" />
            <View style={{ marginLeft: 6 }} />
            <Text style={styles.watchAdsButtonText}>Watch Ads</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onOpenReferAndEarn}
            activeOpacity={0.8}
            style={styles.referButton}
          >
            <Gift size={20} color="#ffaa00b5" />
            <View style={{ marginLeft: 6 }} />
            <Text style={styles.referButtonText}>Refer & Earn</Text>
          </TouchableOpacity>
        </View>

        {/* Start Mining Button */}
        <TouchableOpacity
          onPress={onStartMining}
          disabled={hasMiningSession}
          activeOpacity={0.8}
          style={[
            styles.miningButton,
            hasMiningSession && styles.miningButtonDisabled,
          ]}
        >
          <Pickaxe size={24} color="#ffaa00b5" />
          <View style={{ marginLeft: 8 }} />
          <Text style={styles.miningButtonText}>Start Mining</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}
