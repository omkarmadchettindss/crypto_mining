import { StyleSheet } from 'react-native';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  content: {
    padding: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
    paddingTop: 50,
  },

  

  welcomeText: {
    color: '#ffdd77', // warm gold
    fontSize: 14,
    marginBottom: 4,
  },

  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  address: {
    color: '#ffe7b3', // light parchment gold
    fontSize: 16,
  },

  logo: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },

  crownImage: {
    width: 50,
    height: 50,
    borderRadius: 15
  },

  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: -25,
  },

  /** ✅ CARD LABEL COLOR UPDATED */
  cardLabel: {
    color: '#ffdd77', // brighter engraved gold
    fontSize: 14,
    fontWeight: '600',
  },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  /** ✅ BALANCE MAIN NUMBER COLOR UPDATED */
  balanceAmount: {
    color: '#ffe7b3', // strong gold
    fontSize: 60,
    fontWeight: '800',
    marginLeft: -25,
  },

  /** ✅ UNIT COLOR UPDATED */
  balanceUnit: {
    color: '#e6c68c', // soft sand tone
    fontSize: 20,
    fontWeight: '600',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  balanceBackground: {
    width: '126%',
    overflow: 'hidden',
    padding: 95,
    marginBottom: 24,
    marginLeft: -20,
    borderRadius: 16,
  },

  balanceBackgroundImage: {
    resizeMode: 'cover',
    borderRadius: 16,
  },

  claimedCard: {
    backgroundColor: '#3b250f',
    borderWidth: 1,
    borderColor: '#6e4216ff',
    borderRadius: 16,
    padding: 14,
    marginTop: -15,
    marginBottom: 15,
  },

  claimedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /** ✅ CLAIMED TEXT COLOR UPDATED */
  claimedText: {
    color: '#ffdd77',
    fontSize: 14,
  },

  claimedAmount: {
    color: '#ffe7b3',
    fontWeight: '600',
  },

  touchableWrapper: {
    marginBottom: 24,
  },

  miningBackground: {
    width: '126%',
    overflow: 'hidden',
    padding: 95,
    marginBottom: 24,
    marginLeft: -20,
    borderRadius: 16,
  },

  /** ✅ TITLE TEXT COLOR UPDATED */
  ancientLabel: {
    color: '#ffdd77',
    fontSize: 30,
    marginLeft: -25,
    fontWeight: '700',
  },

  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  statusBadgeAncient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    top: -65,
    marginRight: 30,
    borderRadius: 20,
    backgroundColor: '#32190059',
  },

  balanceLottie: {
    position: 'absolute',
    top: 25,
    left: 180,
    width: '110%',
    height: '110%',
    opacity: 1,
  },

  statusBadgeAncientActive: {
    backgroundColor: '#ffaa0059',
  },

  statusDotAncient: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff0000de',
  },

  statusDotAncientActive: {
    backgroundColor: '#37ff00e1',
  },

  /** ✅ STATUS TEXT UPDATED */
  statusAncientText: {
    color: '#ffdd77',
    fontSize: 12,
    fontWeight: '600',
  },

  statusAncientTextActive: {
    color: '#ffe7b3',
  },

  statusDescriptionAncient: {
    color: '#e6c68c',
    marginLeft: -25,
    fontSize: 14,
    fontWeight: '500',
  },

  miningButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 64,
    marginBottom: 24,
    backgroundColor: '#4c2b11ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },

  miningButtonDisabled: {
    opacity: 0.4,
  },

  miningButtonText: {
    color: '#ffdd77',
    fontSize: 18,
    fontWeight: '600',
  },

  infoGrid: {
    flexDirection: 'row',
  },

  infoCard: {
    flex: 1,
    backgroundColor: '#3b250fd8',
    borderColor: '#6e4216ff',
    padding: 16,
    marginBottom: 0,
  },

  /** ✅ INFO LABEL COLOR UPDATED */
  infoLabel: {
    color: '#ffdd77',
    fontSize: 14,
    marginBottom: 4,
  },

  /** ✅ INFO VALUE COLOR UPDATED */
  infoValue: {
    color: '#ffe7b3',
    fontSize: 18,
    fontWeight: '600',
  },

  progressCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderColor: 'rgba(251, 191, 36, 0.2)',
    borderWidth: 1,
  },

  /** ✅ PROGRESS NOTE COLOR UPDATED */
  progressNote: {
    fontSize: 12,
    color: '#e6c68c',
    marginTop: 8,
    textAlign: 'center',
  },

  watchAdsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 64,
    marginBottom: 24,
    backgroundColor: '#3b250fd8',
    borderWidth: 2,
    borderColor: '#ffaa00b5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },

  watchAdsButtonText: {
    color: '#ffdd77',
    fontSize: 18,
    fontWeight: '600',
  },

  bannerAdContainer: {
    marginTop: -25,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 120,
    width: '100%',
  },
});
