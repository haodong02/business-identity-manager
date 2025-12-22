import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Shield, Edit3, Brain } from 'lucide-react-native';
import { router } from 'expo-router';
import PermissionCard from '../components/PermissionCard';
import Button from '../components/Button';

export default function PermissionEducationScreen() {
  const [assistiveFillEnabled, setAssistiveFillEnabled] = useState(true);

  const handleEnable = () => {
    // In real app: Request autofill permission here
    console.log('Requesting autofill permission...');
    router.replace('/home');
  };

  const handleSkip = () => {
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.shieldIcon}>
          <Shield size={32} color="#6366F1" strokeWidth={2} />
        </View>
        <Text style={styles.headerTitle}>Why we need permissions</Text>
        <Text style={styles.headerSubtitle}>
          These permissions help you fill forms faster and more accurately
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Permission Cards */}
        <View style={styles.cardsContainer}>
          <PermissionCard
            icon={Edit3}
            iconColor="#F59E0B"
            iconBgColor="#FEF3C7"
            title="Autofill Service"
            description="Helps fill business details into forms when you tap a field."
          />

          <PermissionCard
            icon={Brain}
            iconColor="#3B82F6"
            iconBgColor="#DBEAFE"
            title="Assistive Fill"
            description="Shows a fill panel when autofill is not available."
            showToggle
            toggleValue={assistiveFillEnabled}
            onToggle={setAssistiveFillEnabled}
          />

          {/* Privacy Note */}
          <View style={styles.privacyNote}>
            <Text style={styles.privacyText}>🔒 Your data never leaves your device</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Enable Autofill" onPress={handleEnable} variant="primary" />
        <Button
          title="Skip for now"
          onPress={handleSkip}
          variant="secondary"
          style={styles.skipButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  shieldIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  cardsContainer: {
    paddingBottom: 24,
  },
  privacyNote: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#15803D',
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  skipButton: {
    marginTop: 0,
  },
});