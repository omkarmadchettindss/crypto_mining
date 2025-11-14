import axios, { AxiosHeaders } from 'axios';
import { API_BASE_URL } from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Inject token into every request
API.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      if (typeof (config.headers as any).set === 'function') {
        (config.headers as AxiosHeaders).set(
          'Authorization',
          `Bearer ${token}`,
        );
      } else {
        (config.headers as any)['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {}
  return config;
});

export async function loginOrRegister(walletId: string) {
  const response = await API.post('/user/login', { walletId });
  return response.data;
}

export async function startMining(hours: number, multiplier: number) {
  const response = await API.post('/mining/start', {
    selectedHour: hours,
    multiplier,
  });
  return response.data.miningSession;
}

export async function finishMining() {
  const response = await API.post('/mining/finish');
  return response.data;
}

export async function updateMultiplier(multiplier: number) {
  const response = await API.post('/mining/update-multiplier', {
    multiplier,
  });
  return response.data;
}

export async function getUserBalance() {
  const response = await API.get('/mining/balance');
  return response.data;
}

export async function getCurrentMiningSession() {
  const response = await API.get('/mining/session');
  return response.data;
}

export async function getMiningConfig() {
  const response = await API.get('/config/mining');
  return response.data;
}

export async function getLeaderboard() {
  const response = await API.get('/leaderboard');
  return response.data.leaderboard;
}

export async function claimAdReward() {
  const response = await API.post('/mining/claim-ad-reward');
  return response.data;
}
