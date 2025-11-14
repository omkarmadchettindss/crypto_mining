import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Trophy, Sparkles, TrendingUp } from 'lucide-react-native';
import { ClaimPopupStyles as styles } from './styles/ClaimPopupStyles';

interface ClaimPopupProps {
  open: boolean;
  amount: number;
  onClaim: () => void;
}

export function ClaimPopup({ open, amount, onClaim }: ClaimPopupProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Success Animation */}
          <View style={styles.iconContainer}>
            <View style={styles.trophyIcon}>
              <Trophy size={48} color="#ffffff" />
            </View>
            <View style={styles.sparkleIcon}>
              <Sparkles size={32} color="#fbbf24" />
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mining Complete!</Text>
            <Text style={styles.subtitle}>Your tokens are ready to claim</Text>
          </View>

          {/* Reward Card */}
          <View style={[styles.card, styles.rewardCard]}>
            <View style={styles.cardHeader}>
              <TrendingUp size={24} color="#4ade80" />
              <View style={{ marginLeft: 8 }} />
              <Text style={styles.cardLabel}>Total Mined Tokens</Text>
            </View>
            <View style={styles.rewardRow}>
              <Text style={styles.rewardAmount}>{amount.toFixed(2)}</Text>
              <View style={{ marginLeft: 8 }} />
              <Text style={styles.rewardUnit}>tokens</Text>
            </View>
          </View>

          {/* Celebration Message */}
          <View style={styles.messageCard}>
            <Text style={styles.messageText}>
              🎉 Congratulations! Your mining session was successful!
            </Text>
          </View>

          {/* Claim Button */}
          <TouchableOpacity
            onPress={onClaim}
            style={styles.claimButton}
            activeOpacity={0.8}
          >
            <Trophy size={24} color="#0f172a" />
            <View style={{ marginLeft: 8 }} />
            <Text style={styles.claimButtonText}>Claim Rewards</Text>
          </TouchableOpacity>

          {/* Info */}
          <Text style={styles.infoText}>
            After claiming, you can start a new mining session
          </Text>
        </View>
      </View>
    </Modal>
  );
}
