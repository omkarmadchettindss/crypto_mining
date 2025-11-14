import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Share,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Gift, Copy, Share2, X } from 'lucide-react-native';
import { ReferAndEarnStyles as styles } from './styles/ReferAndEarnStyles';
import { getReferralCode, submitReferralCode, canUseReferral } from '../services/api';

interface ReferAndEarnScreenProps {
  onBack: () => void;
  onReferralSuccess?: () => void;
  isNewUser?: boolean;
}

export function ReferAndEarnScreen({
  onBack,
  onReferralSuccess,
  isNewUser = false,
}: ReferAndEarnScreenProps) {
  const [referralCode, setReferralCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [canUse, setCanUse] = useState(false);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [referredCount, setReferredCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [codeData, canUseData] = await Promise.all([
        getReferralCode(),
        canUseReferral(),
      ]);

      setReferralCode(codeData.referralCode);
      setReferralEarnings(codeData.referralEarnings || 0);
      setReferredCount(codeData.referredCount || 0);
      setCanUse(canUseData.canUseReferral);
    } catch (error) {
      console.error('Error loading referral data:', error);
    }
  };

  const handleCopyCode = () => {
    try {
      Clipboard.setString(referralCode);
      
      // Show feedback to user
      if (Platform.OS === 'android') {
        ToastAndroid.show('Referral code copied to clipboard!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Copied!', 'Referral code copied to clipboard');
      }
    } catch (error) {
      console.error('Error copying code:', error);
      Alert.alert('Error', 'Failed to copy code');
    }
  };

  const handleShareCode = async () => {
    try {
      await Share.share({
        message: `🎁 Join me on CryptoMiner and start earning tokens! Use my referral code: ${referralCode} to get started!`,
        title: 'Join CryptoMiner',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSubmitCode = async () => {
    if (!inputCode.trim()) {
      Alert.alert('Error', 'Please enter a referral code');
      return;
    }

    setLoading(true);
    try {
      const result = await submitReferralCode(inputCode.trim());
      Alert.alert(
        'Success!',
        `Referral code applied! The referrer earned ${result.referrerRewarded} tokens.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onReferralSuccess) onReferralSuccess();
              onBack();
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Invalid referral code'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/HomeScreen1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Gift size={24} color="#ffaa00b5" />
            <Text style={styles.headerTitle}>Refer & Earn</Text>
          </View>

          <TouchableOpacity onPress={onBack} style={styles.closeButton}>
            <Image
              source={require('../assets/images/xButton.png')}
              style={styles.closeButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Your Referral Code Section */}
        {!isNewUser && (
          <ImageBackground
            source={require('../assets/images/balance.png')}
            style={styles.cardBackground}
            imageStyle={styles.cardImage}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Your Referral Code</Text>
              <Text style={styles.cardSubtitle}>
                Share this code with friends and earn 100 tokens for each referral!
              </Text>

              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>{referralCode}</Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleCopyCode}
                >
                  <Copy size={20} color="#ffaa00b5" />
                  <Text style={styles.actionButtonText}>Copy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleShareCode}
                >
                  <Share2 size={20} color="#ffaa00b5" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
              </View>

              {/* Stats Section */}
              <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{referredCount}</Text>
                  <Text style={styles.statLabel}>Referrals</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{referralEarnings}</Text>
                  <Text style={styles.statLabel}>Tokens Earned</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        )}

        {/* Enter Referral Code Section */}
        {canUse && (
          <ImageBackground
            source={require('../assets/images/balance.png')}
            style={styles.cardBackground}
            imageStyle={styles.cardImage}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Have a Referral Code?</Text>
              <Text style={styles.cardSubtitle}>
                Enter a friend's code to help them earn 100 tokens!
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter referral code"
                placeholderTextColor="#d6b58c"
                value={inputCode}
                onChangeText={setInputCode}
                autoCapitalize="characters"
                maxLength={8}
              />

              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmitCode}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? 'Submitting...' : 'Submit Code'}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}

        {/* Info Section */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            • Share your unique referral code with friends{'\n'}
            • When they sign up and enter your code, you earn 100 tokens{'\n'}
            • You can only use one referral code per account{'\n'}
            • Start earning by sharing now!
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
