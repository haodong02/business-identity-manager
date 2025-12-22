import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert, } from 'react-native';
import { ArrowLeft, Copy, Edit3, Star, Trash2, Check } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Business } from '../types/Business';
import CopyBusinessSheet from '../components/CopyBusinessSheet';
// import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from 'expo-clipboard'

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams();

  // In real app: Load business data by ID from storage
  const [business] = useState<Business & {
    tin: string;
    sstNumber?: string;
    addressLine1: string;
    addressLine2?: string;
    postcode: string;
    city: string;
    state: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  }>({
    id: id as string,
    name: 'Kedai Runcit Makmur',
    brn: '202301234567',
    isPrimary: true,
    tin: 'C12345678',
    sstNumber: 'A01-2345-67890123',
    addressLine1: 'Jalan Merdeka 123',
    addressLine2: 'Taman Bahagia',
    postcode: '50000',
    city: 'Kuala Lumpur',
    state: 'W.P. Kuala Lumpur',
    contactName: 'Ahmad bin Ali',
    contactEmail: 'ahmad@business.com',
    contactPhone: '012-345-6789',
  });

  const [isPrimary, setIsPrimary] = useState(business.isPrimary);
  const [showCopySheet, setShowCopySheet] = useState(false);

  const handleCopyInfo = () => {
      setShowCopySheet(true);
  };

//   const handleCopyToClipboard = (text: string) => {
//     Clipboard.setString(text);
//     console.log('Copied to clipboard:', text);
//   };

  const handleCopyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    console.log('Copied to clipboard:', text);
  };

  const handleEdit = () => {
    router.push(`/edit-business?id=${business.id}`);
  };

  const handleSetDefault = () => {
    setIsPrimary(!isPrimary);
    Alert.alert(
      isPrimary ? 'Removed as Default' : 'Set as Default',
      isPrimary
        ? 'This business is no longer your default business.'
        : 'This business is now your default business for autofill.'
    );
    // In real app: Update storage
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Business',
      'Are you sure you want to delete this business? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Deleting business:', business.id);
            // In real app: Delete from storage
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.headerTitle}>Business Profile</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Business Name */}
        <View style={styles.nameSection}>
          <Text style={styles.businessName}>{business.name}</Text>
          {isPrimary && (
            <View style={styles.primaryBadge}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
              <Text style={styles.primaryBadgeText}>Default</Text>
            </View>
          )}
        </View>

        {/* Primary Actions */}
        <View style={styles.primaryActions}>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyInfo}
            activeOpacity={0.8}
          >
            <Copy size={24} color="#FFFFFF" strokeWidth={2.5} />
            <Text style={styles.copyButtonText}>Copy Business Info</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
            activeOpacity={0.8}
          >
            <Edit3 size={20} color="#6366F1" strokeWidth={2} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Info Summary */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Business Information</Text>

          <InfoRow label="Business Registration No" value={business.brn} />
          <InfoRow label="Tax Identification Number" value={business.tin} />
          {business.sstNumber && (
            <InfoRow label="SST Number" value={business.sstNumber} />
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Address</Text>

          <InfoRow
            label="Street Address"
            value={`${business.addressLine1}${business.addressLine2 ? '\n' + business.addressLine2 : ''}`}
          />
          <InfoRow
            label="City, State"
            value={`${business.postcode} ${business.city}, ${business.state}`}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Person</Text>

          <InfoRow label="Name" value={business.contactName} />
          <InfoRow label="Email" value={business.contactEmail} />
          <InfoRow label="Phone" value={business.contactPhone} />
        </View>

        {/* Secondary Actions */}
        <View style={styles.secondaryActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSetDefault}
            activeOpacity={0.7}
          >
            <Star
              size={20}
              color={isPrimary ? '#F59E0B' : '#6B7280'}
              fill={isPrimary ? '#F59E0B' : 'transparent'}
              strokeWidth={2}
            />
            <Text style={styles.secondaryButtonText}>
              {isPrimary ? 'Remove as Default' : 'Set as Default'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, styles.deleteButton]}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Trash2 size={20} color="#EF4444" strokeWidth={2} />
            <Text style={styles.deleteButtonText}>Delete Business</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      <CopyBusinessSheet
        visible={showCopySheet}
        business={business}
        onClose={() => setShowCopySheet(false)}
        onCopy={handleCopyToClipboard}
      />
    </View>
  );
}

// Info Row Component
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
  nameSection: {
    marginBottom: 24,
  },
  businessName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 40,
  },
  primaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  primaryBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D97706',
  },
  primaryActions: {
    marginBottom: 24,
    gap: 12,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  copyButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 10,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  secondaryActions: {
    gap: 12,
    marginTop: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  deleteButton: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});