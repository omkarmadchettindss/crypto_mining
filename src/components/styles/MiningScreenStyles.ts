import { StyleSheet } from 'react-native';

export const MiningScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  content: {
    padding: 24,
  },

  /** HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 30,
    paddingHorizontal: 20, 
    marginLeft: 145,
    position: 'relative',
  },

  cancelButton: {
    position: 'absolute',
    right: -10,
    top: 30,
    padding: 5,
    zIndex: 999,
  },

  cancelButtonImage: {
    width: 50,
    height: 50,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginLeft: -20,
    backgroundColor: 'rgba(255, 187, 0, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffb300',
  },

  statusDot: {
    width: 8,
    height: 8,
    marginRight: 6,
    borderRadius: 4,
    backgroundColor: '#ffb300',
  },

  statusText: {
    color: '#ffdd77',
    fontSize: 15,
    fontWeight: '600',
  },

  spacer: {
    width: 32,
  },

  /** ICON CIRCLE */
  animationContainer: {
    alignItems: 'center',
    marginTop: -90,
    margin: -10,
  },

  miningIcon: {
    width: '108%',
    height: '108%',
    marginLeft: -30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '-100%',
  },

  miningIconImage: {
    resizeMode: 'contain',
    borderRadius: 999,
  },

  /** CARD COMMON */
  card: {
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },

  cardBackground: {
    width: '110%',
    overflow: 'hidden',
    padding: 25,
    marginBottom: 16,
    marginLeft: -25,
    borderRadius: 20,
  },

  cardImageStyle: {
    resizeMode: 'stretch',
    borderRadius: 20,
  },

  cardInner: {
    padding: 10,
  },

  /** TEXT COLORS RE-THEMED */

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  cardLabel: {
    color: '#ffdd77',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '700',
  },

  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  valueAmount: {
    color: '#ffe7b3',
    fontSize: 48,
    fontWeight: '800',
  },

  valueUnit: {
    color: '#ffdd77',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 4,
  },

  valueSubtext: {
    color: '#e6c68c',
    fontSize: 15,
    marginTop: 10,
  },

  /** PROGRESS SECTION */

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  progressPercent: {
    color: '#ffe7b3',
    fontSize: 18,
    fontWeight: '700',
  },

  progressBarContainer: {
    height: 12,
    backgroundColor: '#5c4631',
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#ffb300',
    borderRadius: 6,
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timeLabelText: {
    color: '#d6b58c',
    fontSize: 16,
    marginRight: 190
  },

  timeValue: {
    color: '#ffe7b3',
    fontSize: 16,
    fontWeight: '700',
  },

  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  detailCard: {
    flex: 1,
    padding: 25,
    backgroundColor: 'transparent',
  },

  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },

  detailLabel: {
    color: '#d6b58c',
    fontSize: 15,
    fontWeight: '600',
  },

  detailValue: {
    color: '#ffe7b3',
    fontSize: 30,
    fontWeight: '800',
  },

  rateRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  rateUnit: {
    color: '#d6b58c',
    fontSize: 16,
    marginLeft: 4,
  },

  /** OVERLAY */

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#ffe7b3',
    fontSize: 20,
    fontWeight: '700',
  },

  infoText: {
    color: '#ffdd77',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  subCardBackground: {
    width: '78%',
    overflow: 'hidden',
    padding: 15,
    marginBottom: 10,
    marginLeft: -25,
    borderRadius: 16,
  },
  subCardImageStyle: {
    resizeMode: 'stretch',
    borderRadius: 20,
  },
  subText: {
    fontSize: 14,
    color: '#ffffffcc',
    textAlign: 'center',
    marginTop: 6,
  },
});
