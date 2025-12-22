import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { BusinessFormData, MALAYSIAN_STATES } from '../types/BusinessForm';
import CollapsibleSection from '../components/CollapsibleSection';
import Input from '../components/Input';
import Dropdown from '../components/Dropdown';
import Toggle from '../components/Toggle';
import Button from '../components/Button';

export default function AddBusinessScreen() {
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: '',
    brn: '',
    tin: '',
    hasSst: false,
    sstNumber: '',
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    city: '',
    state: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const updateField = (field: keyof BusinessFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validation would go here
    console.log('Saving business:', formData);
    // In real app: Save to storage and navigate back
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
        <Text style={styles.headerTitle}>Add Business</Text>
        <View style={styles.backButton} />
      </View>

      {/* Form */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* A. Business Identity */}
        <CollapsibleSection title="Business Identity" defaultOpen={true}>
          <Input
            label="Business Name"
            required
            value={formData.businessName}
            onChangeText={(text) => updateField('businessName', text)}
            placeholder="e.g., Kedai Runcit Makmur"
          />

          <Input
            label="Business Registration No (BRN)"
            required
            value={formData.brn}
            onChangeText={(text) => updateField('brn', text)}
            placeholder="e.g., 202301234567"
            keyboardType="numeric"
          />

          <Input
            label="Tax Identification Number (TIN)"
            required
            value={formData.tin}
            onChangeText={(text) => updateField('tin', text)}
            placeholder="e.g., C12345678"
          />

          <Toggle
            label="Has SST Number"
            value={formData.hasSst}
            onToggle={(value) => updateField('hasSst', value)}
          />

          {formData.hasSst && (
            <Input
              label="SST Number"
              value={formData.sstNumber}
              onChangeText={(text) => updateField('sstNumber', text)}
              placeholder="e.g., A01-2345-67890123"
            />
          )}
        </CollapsibleSection>

        {/* B. Address */}
        <CollapsibleSection title="Address" defaultOpen={false}>
          <Input
            label="Address Line 1"
            required
            value={formData.addressLine1}
            onChangeText={(text) => updateField('addressLine1', text)}
            placeholder="Street address"
          />

          <Input
            label="Address Line 2"
            value={formData.addressLine2}
            onChangeText={(text) => updateField('addressLine2', text)}
            placeholder="Apartment, suite, etc. (optional)"
          />

          <Input
            label="Postcode"
            required
            value={formData.postcode}
            onChangeText={(text) => updateField('postcode', text)}
            placeholder="e.g., 50000"
            keyboardType="numeric"
            maxLength={5}
          />

          <Input
            label="City"
            required
            value={formData.city}
            onChangeText={(text) => updateField('city', text)}
            placeholder="e.g., Kuala Lumpur"
          />

          <Dropdown
            label="State"
            required
            value={formData.state}
            options={MALAYSIAN_STATES}
            onSelect={(value) => updateField('state', value)}
            placeholder="Select state"
          />
        </CollapsibleSection>

        {/* C. Contact Person */}
        <CollapsibleSection title="Contact Person" defaultOpen={false}>
          <Input
            label="Name"
            required
            value={formData.contactName}
            onChangeText={(text) => updateField('contactName', text)}
            placeholder="e.g., Ahmad bin Ali"
          />

          <Input
            label="Email"
            required
            value={formData.contactEmail}
            onChangeText={(text) => updateField('contactEmail', text)}
            placeholder="e.g., ahmad@business.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Phone"
            required
            value={formData.contactPhone}
            onChangeText={(text) => updateField('contactPhone', text)}
            placeholder="e.g., 012-345-6789"
            keyboardType="phone-pad"
          />
        </CollapsibleSection>

        {/* Bottom spacing for sticky button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Save Button */}
      <View style={styles.stickyButtonContainer}>
        <Button title="Save Business" onPress={handleSave} variant="primary" />
      </View>
    </KeyboardAvoidingView>
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
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
});