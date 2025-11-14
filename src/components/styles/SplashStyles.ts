import { StyleSheet } from 'react-native';

export const SplashStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.24)', // helps text pop
  },
  logoContainer: {
    marginBottom: 40,
  },

  logo: {
    width: 110,
    height: 110,
    backgroundColor: '#fbbf24',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },

  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: '700',
  },

  subtitle: {
    color: '#c4b5fd',
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
    marginTop: -30,
  },
});
