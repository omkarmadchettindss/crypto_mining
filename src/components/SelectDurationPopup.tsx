import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { X, Clock, Zap, TrendingUp } from 'lucide-react-native';
import { SelectDurationPopupStyles as styles } from './styles/SelectDurationStyles';
import { getMiningConfig } from '../services/api';

interface SelectDurationPopupProps {
  open: boolean;
  onClose: () => void;
  onSelect: (hours: number, multiplier: number) => void;
}

export function SelectDurationPopup({
  open,
  onClose,
  onSelect,
}: SelectDurationPopupProps) {
  const [durations, setDurations] = useState<
    { hours: number; label: string }[]
  >([]);
  const [multipliers, setMultipliers] = useState<
    { value: number; rate: number; reward1h: number }[]
  >([]);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(1);
  const [adVisible, setAdVisible] = useState(false);
  const [adCountdown, setAdCountdown] = useState(10);
  const [loading, setLoading] = useState(false);

  // ✅ Always run hooks in same order
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const data = await getMiningConfig();
        setDurations(data.durations || []);
        setMultipliers(data.multipliers || []);
        if (data.durations?.length > 0) {
          setSelectedDuration(data.durations[0].hours);
        }
      } catch (err) {
        console.log('❌ Failed to load mining config:', err);
        Alert.alert('Error', 'Unable to fetch mining configuration.');
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchConfig();
      setSelectedMultiplier(1);
    }
  }, [open]);

  useEffect(() => {
    if (!adVisible) return;
    setAdCountdown(10);

    const timer = setInterval(() => {
      setAdCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setAdVisible(false);
          setSelectedMultiplier(m => Math.min(m + 1, 6));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [adVisible]);

  const calculateReward = () => {
    const rate =
      multipliers.find(m => m.value === selectedMultiplier)?.rate || 0.01;
    const hours = selectedDuration || 1;
    return rate * hours * 3600;
  };

  // ✅ No early return — instead, conditionally render loading UI inside modal
  return (
    <Modal visible={open} transparent animationType="slide">
      <View style={styles.overlay}>
        {loading ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fbbf24" />
            <Text style={{ color: '#fff', marginTop: 10 }}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Clock size={24} color="#fbbf24" />
                <Text style={styles.headerTitle}>Select Mining Duration</Text>
              </View>

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.sectionLabel}>Choose Duration</Text>

              <View style={styles.durationGrid}>
                {durations.map(duration => {
                  const isSelected = selectedDuration === duration.hours;
                  return (
                    <TouchableOpacity
                      key={duration.hours}
                      onPress={() => setSelectedDuration(duration.hours)}
                      activeOpacity={0.8}
                      disabled={adVisible}
                      style={[
                        styles.durationCard,
                        isSelected && styles.durationSelected,
                        adVisible && { opacity: 0.4 },
                      ]}
                    >
                      <Clock
                        size={18}
                        color={isSelected ? '#FFC934' : '#fbbe247a'}
                      />
                      <Text
                        style={[
                          styles.durationText,
                          isSelected && styles.durationTextSelected,
                        ]}
                      >
                        {duration.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.multiplierHeader}>
                <Text style={styles.sectionLabel}>Choose Multiplier</Text>
                <View style={styles.multiplierBadge}>
                  <Zap size={16} color="#FFC934" />
                  <Text style={styles.multiplierValue}>
                    {selectedMultiplier}×
                  </Text>
                </View>
              </View>

              <View style={styles.multiplierGrid}>
                {multipliers.map(m => {
                  const isActive = selectedMultiplier === m.value;
                  return (
                    <View
                      key={m.value}
                      style={[
                        styles.multiplierCard,
                        isActive && styles.multiplierCardSelected,
                        !isActive && { opacity: 0.4 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.multiplierText,
                          isActive && styles.multiplierTextActive,
                        ]}
                      >
                        {m.value}×
                      </Text>
                      <Text style={styles.multiplierRate}>
                        {m.rate.toFixed(2)}/sec
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View style={[styles.card, styles.rewardCard]}>
                <View style={styles.rewardHeader}>
                  <TrendingUp size={20} color="#4ADE80" />
                  <Text style={styles.rewardLabel}>Estimated Reward</Text>
                </View>

                <Text style={styles.rewardMain}>
                  {calculateReward().toFixed(2)}{' '}
                  <Text style={styles.rewardUnit}>tokens</Text>
                </Text>

                <Text style={styles.rewardSub}>
                  {selectedDuration}h × {selectedMultiplier}× multiplier
                </Text>
              </View>
            </ScrollView>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={onClose}
                disabled={adVisible}
                style={[
                  styles.actionBtn,
                  styles.cancelBtn,
                  adVisible && { opacity: 0.4 },
                ]}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (adVisible) {
                    Alert.alert('Please wait', 'Multiplier boost in progress…');
                    return;
                  }
                  if (!selectedDuration) {
                    Alert.alert(
                      'Select Duration',
                      'Please choose a duration first.',
                    );
                    return;
                  }
                  onSelect(selectedDuration, selectedMultiplier);
                }}
                disabled={adVisible}
                style={[
                  styles.actionBtn,
                  styles.startBtn,
                  adVisible && { opacity: 0.4 },
                ]}
              >
                <Zap size={16} color="#0F172A" />
                <Text style={styles.startBtnText}>Start Mining</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
