import { StyleSheet } from 'react-native';

export const ClaimPopupStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // darker overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  container: {
    backgroundColor: '#1a1108', // ⚫ deeper, almost black ancient stone
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#5c3b1e', // darker subtle gold-brown border
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },

  trophyIcon: {
    width: 96,
    height: 96,
    backgroundColor: '#ffb300',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffb300',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 10,
  },

  sparkleIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },

  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    color: '#ffe7b3',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    color: '#d6b58c', // darker sand
    fontSize: 16,
    textAlign: 'center',
  },

  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
  },

  rewardCard: {
    backgroundColor: 'rgba(255, 187, 0, 0.12)', // darker gold tint
    borderColor: '#3a2614', // darker border
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  cardLabel: {
    color: '#ffdd77',
    fontSize: 16,
    fontWeight: '700',
  },

  rewardRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },

  rewardAmount: {
    color: '#ffe7b3',
    fontSize: 48,
    fontWeight: '800',
  },

  rewardUnit: {
    color: '#d6b58c',
    fontSize: 24,
  },

  messageCard: {
    backgroundColor: '#2a1c0f', // much darker stone
    borderWidth: 1,
    borderColor: '#3a2614',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  messageText: {
    color: '#ffdd77',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  claimButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffb300',
    borderRadius: 12,
    height: 64,
    marginBottom: 16,
  },

  claimButtonText: {
    color: '#1a1108', // matches container dark tone
    fontSize: 18,
    fontWeight: '700',
  },

  infoText: {
    color: '#d6b58c',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});
