import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import AssistedFillPanel from '../components/AssistedFillPanel';
import FloatingFillButton from '../components/FloatingFillButton';
import Tooltip from '../components/Tooltip';
import { useFirstTimeTooltip } from '../hooks/useFirstTimeTooltip';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Business } from '../types/Business';
import { StorageService } from '../services/StorageService';

export default function DemoAssistedFillScreen() {
  const [showPanel, setShowPanel] = useState(false);
  const [detectedField, setDetectedField] = useState<any>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    brn: '',
    tin: '',
    sstNumber: '',
    address: '',
    email: '',
    phone: '',
  });

  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    const data = await StorageService.getBusinesses();
    setBusinesses(data);
  };

  const [buttonLayout, setButtonLayout] = useState({
      top: 0,
      left: 0,
      width: 0,
      height: 0
  });

  const buttonRef = useRef<View>(null);

  const { shouldShow, dismissTooltip } = useFirstTimeTooltip('FLOATING_BUTTON');

  // Measure button position when it's rendered
  const handleButtonLayout = () => {
      if (buttonRef.current) {
        buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
          setButtonLayout({
            top: pageY,
            left: pageX,
            width,
            height
          });
        });
      }
  };

//   useEffect(() => {
//     if (shouldShow) {
//       handleButtonLayout();
//     }
//   };

  const handleFieldFocus = (fieldType: string) => {
    setDetectedField(fieldType);
    setShowPanel(true);
  };

  const handleSelectField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        <Text style={styles.headerTitle}>Demo: Assisted Fill</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.demoCard}>
          <Text style={styles.demoTitle}>
            📝 Try the Assisted Fill Feature
          </Text>
          <Text style={styles.demoDescription}>
            Tap any field below, then use the floating button or panel to auto-fill
            business information.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput
              style={styles.input}
              value={formData.businessName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, businessName: text }))
              }
              onFocus={() => handleFieldFocus('name')}
              placeholder="Enter business name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>BRN</Text>
            <TextInput
              style={styles.input}
              value={formData.brn}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, brn: text }))
              }
              onFocus={() => handleFieldFocus('brn')}
              placeholder="Enter BRN"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>TIN</Text>
            <TextInput
              style={styles.input}
              value={formData.tin}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, tin: text }))
              }
              onFocus={() => handleFieldFocus('tin')}
              placeholder="Enter TIN"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>SST Number</Text>
            <TextInput
              style={styles.input}
              value={formData.sstNumber}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, sstNumber: text }))
              }
              onFocus={() => handleFieldFocus('sst')}
              placeholder="Enter SST number"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              value={formData.address}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, address: text }))
              }
              onFocus={() => handleFieldFocus('address')}
              placeholder="Enter address"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              onFocus={() => handleFieldFocus('email')}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, phone: text }))
              }
              onFocus={() => handleFieldFocus('phone')}
              placeholder="Enter phone"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

        {/* First-time tooltip */}
        {buttonLayout.width > 0 && (
          <Tooltip
            visible={shouldShow}
            title="Quick Fill Button"
            message="Tap here if autofill doesn't appear. This button gives you quick access to fill any form field with your business information."
            targetPosition={buttonLayout}
            arrowDirection="down"
            onDismiss={dismissTooltip}
          />
        )}

        <View
          ref={buttonRef}
          onLayout={handleButtonLayout}
        >
          {/* Floating Button */}
          <FloatingFillButton
            visible={true}
            onPress={() => {
              setDetectedField(null);
              setShowPanel(true);
            }}
          />
        </View>

      {/* Assisted Fill Panel */}
      <AssistedFillPanel
        visible={showPanel}
        businesses={businesses}
        detectedFieldType={detectedField}
        onClose={() => setShowPanel(false)}
        onSelectField={handleSelectField}
      />
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
  buttonContainer: {
      position: 'absolute',
      bottom: 30,
      right: 20,
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
    paddingBottom: 100,
  },
  demoCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  demoDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
  formGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});