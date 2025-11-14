import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ CRITICAL: Register background handler BEFORE anything else
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('🟢 [BACKGROUND EVENT] Type:', type);
  console.log('🟢 [BACKGROUND EVENT] Detail:', JSON.stringify(detail, null, 2));

  // Handle notification press in background/quit state
  if (type === EventType.PRESS) {
    console.log('🟢 Notification PRESSED in BACKGROUND/QUIT state');
    try {
      await AsyncStorage.setItem('openClaim', 'true');
      console.log('✅ Set openClaim flag in background');
    } catch (error) {
      console.error('❌ Error setting openClaim in background:', error);
    }
  }

  // Handle delivered notifications
  if (type === EventType.DELIVERED) {
    console.log('🟢 Notification DELIVERED in background');
  }

  // Handle dismissed notifications
  if (type === EventType.DISMISSED) {
    console.log('🟢 Notification DISMISSED');
  }
});

AppRegistry.registerComponent(appName, () => App);
