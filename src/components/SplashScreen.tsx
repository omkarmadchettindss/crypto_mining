import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { SplashStyles as styles } from './styles/SplashStyles';

export function SplashScreen() {
  // ✅ Hooks are declared top-level (safe)
  const logoScale = useSharedValue(1);
  const titleOpacity = useSharedValue(0);

  useEffect(() => {
    // ✅ No conditional invocation of hooks — this is SAFE
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800, easing: Easing.out(Easing.quad) }),
        withTiming(1.0, { duration: 800, easing: Easing.in(Easing.quad) }),
      ),
      -1,
      true,
    );

    titleOpacity.value = withTiming(1, { duration: 600 });
  }, []);

  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const animatedTitle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  return (
    <ImageBackground
      source={require('../assets/images/Splashscreen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.logoContainer}>
        <Animated.View style={[styles.logo, animatedLogo]}>
          <Sparkles size={60} color="#fff" />
        </Animated.View>
      </View>

      <Animated.View style={[styles.titleContainer, animatedTitle]}>
        <Text style={styles.title}>Crypto Miner App</Text>
      </Animated.View>
    </ImageBackground>
  );
}
