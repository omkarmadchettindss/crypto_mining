import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import { TrendingUp, Users } from 'lucide-react-native';
import { getLeaderboard } from '../services/api';
import { LeaderboardStyles as styles } from './styles/LeaderboardStyles';

interface Leader {
  walletId: string;
  totalEarned: number;
  isMining?: boolean;
}

interface LeaderboardScreenProps {
  navigation: any;
  currentUserWallet?: string;
}

export function LeaderboardScreen({ navigation, currentUserWallet }: LeaderboardScreenProps) {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const isMounted = useRef(true);

  const formatAddress = (addr: string) =>
    addr.length <= 10 ? addr : `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  
  const isCurrentUser = (walletId: string) => 
    currentUserWallet && walletId.toLowerCase() === currentUserWallet.toLowerCase();

  const fetchLeaderboard = useCallback(async () => {
    try {
      const data = await getLeaderboard();
      if (isMounted.current) setLeaders(data);
    } catch (error) {
      console.log('Leaderboard fetch error:', error);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
    return () => {
      isMounted.current = false;
    };
  }, [fetchLeaderboard]);

  const onRefresh = useCallback(() => {
    if (isAtTop) {
      setRefreshing(true);
      fetchLeaderboard();
    }
  }, [fetchLeaderboard, isAtTop]);

  const handleScroll = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Consider "top" if scrolled less than 50 pixels
    setIsAtTop(offsetY < 50);
  }, []);

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <ImageBackground
      source={require('../assets/images/HomeScreen1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            enabled={isAtTop}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Users size={24} color="#ffaa00b5" />
            <Text style={styles.headerTitle}>Leaderboard</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <Image
              source={require('../assets/images/xButton.png')}
              style={styles.cancelButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.spacer} />
        </View>

        {/* Loader */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#ffdd77"
            style={{ marginTop: 40 }}
          />
        ) : (
          <>
            {/* 🏆 Top 3 */}
            <View style={styles.topThreeContainer}>
              <Image
                source={require('../assets/images/top3.png')}
                style={styles.topThreeImage}
                resizeMode="contain"
              />

              {/* 🥇 */}
              {top3[0] && (
                <View style={[styles.topBox, styles.firstBox]}>
                  <View style={styles.nameColumn}>
                    <Text style={[
                      styles.topName,
                      isCurrentUser(top3[0].walletId) && styles.currentUserText
                    ]}>
                      {formatAddress(top3[0].walletId)}
                    </Text>

                    {top3[0].isMining && (
                      <Text style={[styles.miningTop, styles.miningActiveText]}>
                        mining
                      </Text>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.topValue,
                      top3[0].isMining
                        ? styles.miningTokenActive
                        : styles.miningTokenInactive,
                    ]}
                  >
                    {top3[0].totalEarned.toFixed(0)}
                  </Text>
                  <Text style={styles.topTokenLabel}>tokens</Text>
                </View>
              )}

              {/* 🥈 */}
              {top3[1] && (
                <View style={[styles.topBox, styles.secondBox]}>
                  <Text style={styles.topSmallLabel}>2nd</Text>
                  <View style={styles.nameColumn}>
                    <Text style={[
                      styles.topNameSmall,
                      isCurrentUser(top3[1].walletId) && styles.currentUserText
                    ]}>
                      {formatAddress(top3[1].walletId)}
                    </Text>

                    {top3[1].isMining && (
                      <Text
                        style={[styles.miningTopSmall, styles.miningActiveText]}
                      >
                        mining
                      </Text>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.topSmallValue,
                      top3[1].isMining
                        ? styles.miningTokenActive
                        : styles.miningTokenInactive,
                    ]}
                  >
                    {top3[1].totalEarned.toFixed(0)}
                  </Text>
                  <Text style={styles.topTokenLabelSmall}>tokens</Text>
                </View>
              )}

              {/* 🥉 */}
              {top3[2] && (
                <View style={[styles.topBox, styles.thirdBox]}>
                  <Text style={styles.topSmallLabel}>3rd</Text>
                  <View style={styles.nameColumn}>
                    <Text style={[
                      styles.topNameSmall,
                      isCurrentUser(top3[2].walletId) && styles.currentUserText
                    ]}>
                      {formatAddress(top3[2].walletId)}
                    </Text>

                    {top3[2].isMining && (
                      <Text
                        style={[styles.miningTopSmall, styles.miningActiveText]}
                      >
                        mining
                      </Text>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.topSmallValue,
                      top3[2].isMining
                        ? styles.miningTokenActive
                        : styles.miningTokenInactive,
                    ]}
                  >
                    {top3[2].totalEarned.toFixed(0)}
                  </Text>
                  <Text style={styles.topTokenLabelSmall}>tokens</Text>
                </View>
              )}
            </View>

            {/* 🔹 Other Users */}
            {rest.length > 0 && (
              <ImageBackground
                source={require('../assets/images/balance.png')}
                style={styles.cardBackground}
                imageStyle={styles.cardImage}
              >
                <ScrollView
                  style={styles.leaderboardList}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                >
                  {rest.map((user, index) => (
                    <View 
                      key={user.walletId}
                      style={[
                        styles.row,
                        isCurrentUser(user.walletId) && styles.currentUserRow
                      ]}
                    >
                      <Text style={styles.rankText}>{index + 4}.</Text>

                      <View style={styles.walletRow}>
                        <Text style={[
                          styles.walletAddress,
                          isCurrentUser(user.walletId) && styles.currentUserText
                        ]}>
                          {formatAddress(user.walletId)}
                        </Text>
                        {user.isMining && (
                          <Text style={styles.miningRight}>mining</Text>
                        )}
                      </View>

                      <View style={styles.earnedSection}>
                        <TrendingUp size={18} color="#63b624e3" />
                        <Text
                          style={[
                            styles.earnedValue,
                            { color: user.isMining ? '#4ade80' : '#ffe7b3' },
                          ]}
                        >
                          {user.totalEarned.toFixed(0)}
                        </Text>
                        <Text style={styles.earnedUnit}> tokens</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </ImageBackground>
            )}
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
