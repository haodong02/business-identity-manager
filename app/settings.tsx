import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Share,
} from 'react-native';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  Sparkles,
  Download,
  Shield,
  Edit3,
  Brain,
} from 'lucide-react-native';
import { router } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Business {
  id: string;
  name: string;
  brn: string;
}

export default function SettingsScreen() {
  // Mock data - in real app, load from storage
  const [businesses] = useState<Business[]>([
    { id: '1', name: 'Kedai Runcit Makmur', brn: '202301234567' },
    { id: '2', name: 'Tech Solutions Sdn Bhd', brn: '202401987654' },
  ]);

  const [defaultBusinessId, setDefaultBusinessId] = useState('1');
  const [autofillEnabled, setAutofillEnabled] = useState(true);
  const [assistiveFillEnabled, setAssistiveFillEnabled] = useState(true);

  const defaultBusiness = businesses.find((b) => b.id === defaultBusinessId);

  const handleChangeDefaultBusiness = () => {
    Alert.alert(
      'Change Default Business',
      'Select which business to use as default for autofill',
      [
        { text: 'Cancel', style: 'cancel' },
        ...businesses.map((business) => ({
          text: business.name,
          onPress: () => {
            setDefaultBusinessId(business.id);
            Alert.alert('Success', `${business.name} is now your default business`);
          },
        })),
      ]
    );
  };

  const handleToggleAutofill = () => {
    const newValue = !autofillEnabled;
    setAutofillEnabled(newValue);

    if (!newValue) {
      Alert.alert(
        'Autofill Disabled',
        'You can re-enable autofill anytime from Settings.'
      );
    }
  };

  const handleToggleAssistiveFill = () => {
    const newValue = !assistiveFillEnabled;
    setAssistiveFillEnabled(newValue);
  };

  const handleExportData = async () => {
    Alert.alert(
      'Export Business Data',
      'Choose how to export your business information',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Copy as Text',
          onPress: async () => {
            // Generate export text
            const exportText = businesses
              .map(
                (b) =>
                  `Business: ${b.name}\nBRN: ${b.brn}\n-------------------`
              )
              .join('\n');

            await Clipboard.setStringAsync(exportText);
            Alert.alert('Copied!', 'Business data copied to clipboard');
          },
        },
        {
          text: 'Share as File',
          onPress: async () => {
            // In real app: Create JSON file and share
            const exportData = JSON.stringify(businesses, null, 2);

            try {
              await Share.share({
                message: exportData,
                title: 'Business Data Export',
              });
            } catch (error) {
              console.error('Share error:', error);
            }
          },
        },
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your data never leaves your device. We do not collect, store, or share any of your business information.\n\n• All data is stored locally on your device\n• No accounts or cloud sync\n• No third-party tracking\n• Open source code (verify yourself)',
      [{ text: 'Got it' }]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#111827" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Default Business Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Default Business</Text>
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handleChangeDefaultBusiness}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#FEF3C7' }]}>
                <Star size={20} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Default Business</Text>
                <Text style={styles.settingValue}>
                  {defaultBusiness?.name || 'None'}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.sectionDescription}>
            This business will be used by default when autofilling forms
          </Text>
        </View>

        {/* Autofill Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autofill Settings</Text>

          {/* Autofill Suggestions Toggle */}
          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#DBEAFE' }]}>
                <Edit3 size={20} color="#3B82F6" strokeWidth={2} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Autofill Suggestions</Text>
                <Text style={styles.settingDescription}>
                  Show suggestions when tapping form fields
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toggle, autofillEnabled && styles.toggleActive]}
              onPress={handleToggleAutofill}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggleSlider,
                  autofillEnabled && styles.toggleSliderActive,
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Assistive Fill Toggle */}
          <View style={styles.settingCard}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#E0E7FF' }]}>
                <Brain size={20} color="#6366F1" strokeWidth={2} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Assistive Fill</Text>
                <Text style={styles.settingDescription}>
                  Show floating fill button for quick access
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toggle, assistiveFillEnabled && styles.toggleActive]}
              onPress={handleToggleAssistiveFill}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggleSlider,
                  assistiveFillEnabled && styles.toggleSliderActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>

          {/* Export Data */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handleExportData}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#D1FAE5' }]}>
                <Download size={20} color="#10B981" strokeWidth={2} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Export Business Data</Text>
                <Text style={styles.settingDescription}>
                  Backup your business information
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Privacy & Legal Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Legal</Text>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={handlePrivacyPolicy}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#EEF2FF' }]}>
                <Shield size={20} color="#6366F1" strokeWidth={2} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Privacy Policy</Text>
                <Text style={styles.settingDescription}>
                  Your data never leaves your device
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Business Identity Manager</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoTagline}>
            Made with ❤️ for Malaysian businesses
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
    lineHeight: 18,
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  toggle: {
    width: 48,
    height: 28,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#6366F1',
  },
  toggleSlider: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleSliderActive: {
    transform: [{ translateX: 20 }],
  },
  appInfo: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  appInfoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  appInfoVersion: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  appInfoTagline: {
    fontSize: 13,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});