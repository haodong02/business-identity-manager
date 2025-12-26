import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Briefcase, CheckCircle2, FileText, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const handleGetStarted = () => {
    router.push('/permissions');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#667EEA" />

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logo}>
          <Briefcase size={48} color="#FFFFFF" strokeWidth={2} />
        </View>
        <Text style={styles.appTitle}>Business Identity Manager</Text>
        <Text style={styles.appSubtitle}>
          Fill Malaysia e-Invoice forms faster, without mistakes
        </Text>
      </View>

      {/* Illustration */}
      <View style={styles.illustration}>
        <View style={[styles.iconContainer, styles.formIcon]}>
          <FileText size={40} color="#6366F1" strokeWidth={1.5} />
        </View>
        <View style={styles.arrowContainer}>
          <ArrowRight size={32} color="#FFFFFF" strokeWidth={2} />
        </View>
        <View style={[styles.iconContainer, styles.checkIcon]}>
          <CheckCircle2 size={40} color="#FFFFFF" strokeWidth={1.5} />
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleGetStarted}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.secondaryText}>
          No account required · Data stays on your phone
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667EEA',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 40,
  },
  logoSection: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 36,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  illustration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  formIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  arrowContainer: {},
  checkIcon: {
    backgroundColor: '#10B981',
  },
  ctaSection: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366F1',
  },
  secondaryText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});