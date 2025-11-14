import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Wallet, Sparkles } from 'lucide-react-native';
import { SignupScreenStyles as styles } from './styles/SignupScreen';
import { loginOrRegister } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignupScreenProps {
  onSignup: (address: string) => void;
}

export function SignupScreen({ onSignup }: SignupScreenProps) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!address.trim()) return;

    try {
      setLoading(true);

      const response = await loginOrRegister(address.trim());

      // Save token for authenticated APIs
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('walletId', response.walletId);

      // pass wallet to parent component
      onSignup(response.walletId);
    } catch (err) {
      console.log('Login error:', err);
      Alert.alert('Failed to login — check backend connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/LoginScreen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Sparkles size={40} color="#fff" />
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Crypto Miner App</Text>
            <Text style={styles.subtitle}>
              Start mining tokens effortlessly
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Wallet Address</Text>
            <View style={styles.inputWrapper}>
              <Wallet
                size={20}
                color="#a78bfa"
                style={{ marginHorizontal: 10 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Wallet Address"
                placeholderTextColor="#c4b5fd"
                value={address}
                onChangeText={setAddress}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={{ marginTop: 20 }}
              disabled={loading}
            >
              <LinearGradient
                colors={['#fbbf24', '#f97316']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Loading...' : 'Get Started'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Connect your wallet to start mining
            </Text>
            <Text style={styles.infoText}>and earn tokens automatically</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
