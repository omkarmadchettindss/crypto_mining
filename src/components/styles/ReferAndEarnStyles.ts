import { StyleSheet } from 'react-native';

export const ReferAndEarnStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
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

  closeButton: {
    padding: 5,
    zIndex: 999,
    marginLeft: 80,
  },

  closeButtonImage: {
    width: 50,
    height: 50,
  },

  cardBackground: {
    width: '113%',
    marginLeft: -20,
    padding: 40,
    overflow: 'hidden',
    marginBottom: 20,
  },

  cardImage: {
    resizeMode: 'stretch',
    borderRadius: 20,
  },

  card: {
    padding: 10,
    marginRight: 20
  },

  cardTitle: {
    color: '#ffdd77',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },

  cardSubtitle: {
    color: '#e6c68c',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },

  codeContainer: {
    backgroundColor: '#3b250f',
    borderWidth: 2,
    borderColor: '#ffaa00b5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  codeText: {
    color: '#ffe7b3',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 4,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4c2b11ff',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },

  actionButtonText: {
    color: '#ffdd77',
    fontSize: 16,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#3b250f',
    borderWidth: 1,
    borderColor: '#6e4216ff',
    borderRadius: 12,
    padding: 16,
    color: '#ffe7b3',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 16,
  },

  submitButton: {
    backgroundColor: '#4c2b11ff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffaa00b5',
  },

  submitButtonDisabled: {
    opacity: 0.5,
  },

  submitButtonText: {
    color: '#ffdd77',
    fontSize: 18,
    fontWeight: '600',
  },

  earningsCard: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },

  earningsText: {
    color: '#4ade80',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  infoCard: {
    backgroundColor: '#3b250fd8',
    borderWidth: 1,
    borderColor: '#6e4216ff',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
  },

  infoTitle: {
    color: '#ffdd77',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  infoText: {
    color: '#e6c68c',
    fontSize: 14,
    lineHeight: 22,
  },
});
