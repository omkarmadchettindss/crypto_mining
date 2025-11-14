import { StyleSheet } from 'react-native';

export const SelectDurationPopupStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)', // darker overlay
    justifyContent: 'flex-end',
  },

  container: {
    maxHeight: '90%',
    backgroundColor: '#1c1209', // deep dark brown
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    overflow: 'hidden',
    borderColor: '#5c3b1e', // dark stone border
    borderWidth: 2,
  },

  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullScreenAdContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2a1c0f', // darker than before
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3a2614',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#ffdd77', // gold
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },

  closeButton: {
    padding: 8,
  },

  scrollContent: {
    padding: 24,
  },

  sectionLabel: {
    color: '#ffe7b3', // soft gold
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '700',
  },

  /* Duration */
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  durationCard: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3a2614', // darker border
    backgroundColor: '#2a1c0f', // dark stone
    marginRight: 12,
    marginBottom: 12,
  },

  durationSelected: {
    backgroundColor: 'rgba(255, 187, 0, 0.22)', // warm gold tint
    borderColor: '#ffb300',
  },

  durationText: {
    color: '#d6b58c', // muted gold sand
    fontSize: 16,
    marginLeft: 8,
  },

  durationTextSelected: {
    color: '#ffdd77',
    fontWeight: '700',
  },

  /* Multiplier */
  multiplierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  multiplierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  multiplierValue: {
    color: '#ffdd77',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 4,
  },

  multiplierGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  multiplierCard: {
    width: '30%',
    backgroundColor: '#2a1c0f', // dark stone
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3a2614',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    marginRight: '3.3%',
  },

  multiplierCardSelected: {
    backgroundColor: '#ffbb0040',
    borderColor: '#ffb300',
    shadowColor: '#ffb300',
    shadowOpacity: 0.6,
    shadowRadius: 14,
  },

  multiplierText: {
    color: '#ffe7b3',
    fontSize: 18,
    fontWeight: '700',
  },

  multiplierTextActive: {
    color: '#ffdd77',
  },

  multiplierRate: {
    color: '#d6b58c',
    fontSize: 12,
    marginTop: 4,
  },

  /* Reward Card */
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  rewardCard: {
    backgroundColor: '#2a1c0f',
    borderWidth: 1,
    borderColor: '#3a2614',
  },

  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  rewardLabel: {
    marginLeft: 8,
    color: '#ffdd77',
    fontSize: 15,
  },

  rewardMain: {
    color: '#ffe7b3',
    fontSize: 36,
    fontWeight: '800',
  },

  rewardUnit: {
    fontSize: 20,
    color: '#d6b58c',
  },

  rewardSub: {
    color: '#d6b58c',
    fontSize: 14,
    marginTop: 6,
  },

  /* Info Table */
  infoCard: {
    backgroundColor: '#2a1c0f',
    borderWidth: 1,
    borderColor: '#3a2614',
  },

  infoTitle: {
    color: '#ffe7b3',
    fontSize: 15,
    marginBottom: 12,
    fontWeight: '700',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  infoText: {
    color: '#d6b58c',
    fontSize: 14,
  },

  infoActive: {
    color: '#ffdd77',
    fontWeight: '700',
  },

  /* Actions */
  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },

  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  cancelBtn: {
    backgroundColor: '#2a1c0f',
    borderWidth: 1,
    borderColor: '#3a2614',
  },

  cancelBtnText: {
    color: '#ffe7b3',
    fontSize: 16,
    fontWeight: '700',
  },

  startBtn: {
    backgroundColor: '#ffb300',
  },

  startBtnText: {
    marginLeft: 6,
    color: '#2b1705',
    fontSize: 16,
    fontWeight: '700',
  },
});
