import { StyleSheet } from 'react-native';

export const LeaderboardStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  content: {
    padding: 24,
    paddingTop: 60,
  },

  cardBackground: {
    width: '113%',
    marginLeft: -20,
    padding: 40,
    overflow: 'hidden',
  },

  cardImage: {
    resizeMode: 'stretch',
    borderRadius: 20,
  },

  leaderboardList: {
    maxHeight: 360,
  },

  cardHeader: {
    color: '#ffdd77',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  topRow: {
    backgroundColor: 'rgba(255, 187, 0, 0.1)',
    borderRadius: 10,
    marginVertical: 4,
    paddingHorizontal: 10,
  },

  currentUserRow: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    padding: 10,
    marginLeft: -1,
    borderRadius: 50,
    marginVertical: 4,
    marginRight: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },

  currentUserText: {
    color: '#ffd700',
    fontWeight: '800',
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  rankBadge: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rankText: {
    color: '#ffdd77',
    fontSize: 18,
    fontWeight: '700',
    width: 45,
    textAlign: 'left',
  },

  walletInfo: {
    flex: 1,
    alignItems: 'center',
  },

  walletAddress: {
    color: '#ffe7b3',
    fontSize: 16,
    fontWeight: '600',
    width: 130,
    marginLeft: -10
  },

  earnedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 15
  },

  earnedValue: {
    color: '#4ade80',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },

  earnedUnit: {
    color: '#d6b58c',
    fontSize: 12,
    marginLeft: 4,
  },

  topThreeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: 20,
  },

  topThreeImage: {
    width: '110%',
    height: 350,
  },

  topBox: {
    position: 'absolute',
    alignItems: 'center',
  },

  firstBox: {
    top: 85,
    alignSelf: 'center',
    marginRight: 12,
  },

  secondBox: {
    left: 42,
    top: 190,
  },

  thirdBox: {
    right: 58,
    top: 190,
  },

  topName: {
    color: '#ffeb9a',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },

  topValue: {
    color: '#ffe7b3',
    fontSize: 38,
    fontWeight: '800',
    textAlign: 'center',
    top: -5
  },

  topTokenLabel: {
    color: '#d6b58c',
    fontSize: 14,
    textAlign: 'center',
    top: -10
  },

  topSmallLabel: {
    color: '#ffdd77',
    fontSize: 13,
    bottom: 15,
    fontWeight: '600',
  },

  topNameSmall: {
    color: '#ffeb9a',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 2,
  },

  topSmallValue: {
    color: '#ffe7b3',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',

  },

  topTokenLabelSmall: {
    color: '#d6b58c',
    fontSize: 12,
    textAlign: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 15,
    marginLeft: 145,
  },

  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 187, 0, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffb300',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginLeft: -20,
  },

  headerTitle: {
    color: '#ffdd77',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },

  cancelButton: {
    padding: 5,
    zIndex: 999,
    marginLeft: 80,
  },

  cancelButtonImage: {
    width: 50,
    height: 50,
  },

  spacer: {
    width: 30, // keeps spacing symmetry
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 180,
  },

  miningRight: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'capitalize',
  },

  miningRightSmall: {
    color: '#4ade80',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'capitalize',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  nameColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    maxWidth: 180,
  },

  miningTop: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  miningTopSmall: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  miningActiveText: {
    color: '#4ade80',
    textShadowColor: 'rgba(74, 222, 128, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  miningInactiveText: {
    color: '#ffe7b3',
    textShadowColor: 'rgba(255, 231, 179, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  miningTokenActive: {
    color: '#4ade80',
    textShadowColor: 'rgba(74, 222, 128, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },

  miningTokenInactive: {
    color: '#ffe7b3',
    textShadowColor: 'rgba(255, 231, 179, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
