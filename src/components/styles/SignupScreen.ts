import {StyleSheet} from 'react-native';

export const SignupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Fake gradient background container
  backgroundLayerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#2e026d',
  },

  backgroundLayerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#0f172a',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logo: {
    width: 90,
    height: 90,
    backgroundColor: '#fbbf24',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#fbbf24',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },

  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },

  subtitle: {
    color: '#c4b5fd',
    fontSize: 15,
  },

  form: {
    marginBottom: 36,
  },

  label: {
    color: '#c4b5fd',
    marginBottom: 8,
    fontSize: 14,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.3)',
    height: 56,
    paddingHorizontal: 4,
  },

  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingRight: 16,
  },

  // Fake gradient button using two layers
  buttonWrapper: {
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },

  buttonLayerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#fbbf24',
  },

  buttonLayerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#f97316',
  },

  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#f59e0b',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '600',
  },

  infoContainer: {
    alignItems: 'center',
  },

  infoText: {
    color: '#c4b5fd',
    fontSize: 14,
    textAlign: 'center',
  },
});
