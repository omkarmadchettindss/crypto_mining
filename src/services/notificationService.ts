import notifee, {
  AndroidImportance,
  TriggerType,
  TimestampTrigger,
  EventType,
} from '@notifee/react-native';
import { Platform } from 'react-native';

class NotificationService {
  private channelId = 'mining_channel';

  /**
   * Initialize notification channel and request permissions
   */
  async initialize() {
    try {
      console.log('🔔 Initializing notification service...');

      // Request permission
      const settings = await notifee.requestPermission();
      console.log('🔔 Permission status:', settings.authorizationStatus);

      // Create notification channel for Android
      if (Platform.OS === 'android') {
        await notifee.createChannel({
          id: this.channelId,
          name: 'Mining Notifications',
          importance: AndroidImportance.HIGH,
          sound: 'default',
          vibration: true,
          vibrationPattern: [300, 500],
          badge: true,
          lights: true,
          lightColor: '#FF0000',
        });
        console.log('✅ Notification channel created');
      }

      return true;
    } catch (error) {
      console.error('❌ Notification initialization error:', error);
      return false;
    }
  }

  /**
   * Schedule a notification for when mining completes
   */
  async scheduleMiningCompleteNotification(endTime: number): Promise<string | null> {
    try {
      console.log('⏰ Scheduling mining completion notification...');
      console.log('⏰ Current time:', new Date().toLocaleString());
      console.log('⏰ Target time:', new Date(endTime).toLocaleString());

      // Verify timestamp is in the future
      const now = Date.now();
      if (endTime <= now) {
        console.error('❌ Cannot schedule notification in the past!');
        return null;
      }

      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: endTime,
        alarmManager: {
          allowWhileIdle: true,
        },
      };

      const notificationId = await notifee.createTriggerNotification(
        {
          id: 'mining-complete',
          title: '⛏️ Mining Completed!',
          body: 'Your mining session has ended. Tap to claim your rewards!',
          android: {
            channelId: this.channelId,
            smallIcon: 'ic_launcher',
            pressAction: {
              id: 'default',
            },
            importance: AndroidImportance.HIGH,
            sound: 'default',
            vibrationPattern: [300, 500],
            autoCancel: true,
            showTimestamp: true,
            timestamp: endTime,
          },
          ios: {
            sound: 'default',
            critical: true,
            criticalVolume: 1.0,
          },
        },
        trigger,
      );

      const secondsUntil = Math.round((endTime - Date.now()) / 1000);
      console.log('✅ Notification scheduled successfully!');
      console.log('📌 Notification ID:', notificationId);
      console.log('⏱️ Time until notification:', secondsUntil, 'seconds');

      return notificationId;
    } catch (error) {
      console.error('❌ Error scheduling notification:', error);
      return null;
    }
  }

  /**
   * Display an immediate notification (for testing or when app is open)
   */
  async displayImmediateNotification(title: string, body: string) {
    try {
      await notifee.displayNotification({
        title,
        body,
        android: {
          channelId: this.channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,
          sound: 'default',
          vibrationPattern: [300, 500],
        },
        ios: {
          sound: 'default',
        },
      });
      console.log('✅ Immediate notification displayed');
    } catch (error) {
      console.error('❌ Error displaying notification:', error);
    }
  }

  /**
   * Cancel a specific notification
   */
  async cancelNotification(notificationId: string) {
    try {
      await notifee.cancelNotification(notificationId);
      console.log('🛑 Cancelled notification:', notificationId);
    } catch (error) {
      console.error('❌ Error cancelling notification:', error);
    }
  }

  /**
   * Cancel all notifications
   */
  async cancelAllNotifications() {
    try {
      await notifee.cancelAllNotifications();
      console.log('🛑 All notifications cancelled');
    } catch (error) {
      console.error('❌ Error cancelling all notifications:', error);
    }
  }

  /**
   * Get all scheduled notifications
   */
  async getScheduledNotifications() {
    try {
      const notifications = await notifee.getTriggerNotifications();
      console.log('📋 Scheduled notifications:', notifications.length);
      return notifications;
    } catch (error) {
      console.error('❌ Error getting scheduled notifications:', error);
      return [];
    }
  }
}

export const notificationService = new NotificationService();
