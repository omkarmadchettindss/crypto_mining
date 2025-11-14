import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-2109340320413745/4647402619';

let rewardedAd: RewardedAd | null = null;
let rewardCallback: ((reward: any) => void) | null = null;

let unsubscribeLoaded: (() => void) | null = null;
let unsubscribeReward: (() => void) | null = null;
let unsubscribeClosed: (() => void) | null = null;
let unsubscribeError: (() => void) | null = null;

export const loadRewardedAd = (onReward: (reward: any) => void) => {
  rewardCallback = onReward;

  if (unsubscribeLoaded) unsubscribeLoaded();
  if (unsubscribeReward) unsubscribeReward();
  if (unsubscribeClosed) unsubscribeClosed();
  if (unsubscribeError) unsubscribeError();

  rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  unsubscribeLoaded = rewardedAd.addAdEventListener(
    RewardedAdEventType.LOADED,
    () => {
      console.log('✅ Rewarded Ad Loaded');
    },
  );

  unsubscribeReward = rewardedAd.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    reward => {
      console.log('🎁 Reward earned:', reward);
      if (rewardCallback) rewardCallback(reward);
    },
  );

  unsubscribeError = rewardedAd.addAdEventListener(AdEventType.ERROR, error => {
    console.log('❌ Ad failed to load:', error);
  });

  unsubscribeClosed = rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
    console.log('❌ Ad closed');
    loadRewardedAd(onReward);
  });

  rewardedAd.load();
};

export const showRewardedAd = () => {
  if (rewardedAd?.loaded) {
    rewardedAd.show();
  } else {
    console.log('⚠️ Rewarded ad not loaded yet');
  }
};
