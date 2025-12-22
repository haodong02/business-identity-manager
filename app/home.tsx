import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { Business } from '../types/Business';
import BusinessCard from '../components/BusinessCard';
import EmptyState from '../components/EmptyState';
import CopyBusinessSheet from '../components/CopyBusinessSheet';
// import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from 'expo-clipboard';

export default function HomeScreen() {
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Kedai Runcit Makmur',
      brn: '202301234567',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Tech Solutions Sdn Bhd',
      brn: '202401987654',
      isPrimary: false
    }
  ]);

  const [showCopySheet, setShowCopySheet] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

  const handleEdit = (id: string) => {
    router.push(`/edit-business?id=${id}`);
  };

  const handleCopy = (business: Business) => {
      // In real app: Load full business details by ID
      // For now, create mock full data
      const fullBusinessData = {
        name: business.name,
        brn: business.brn,
        tin: 'C12345678', // Mock data - load from storage in real app
        sstNumber: business.id === '1' ? 'A01-2345-67890123' : undefined,
        addressLine1: 'Jalan Merdeka 123',
        addressLine2: 'Taman Bahagia',
        postcode: '50000',
        city: 'Kuala Lumpur',
        state: 'W.P. Kuala Lumpur',
        contactEmail: 'contact@business.com',
        contactPhone: '012-345-6789',
      };

      setSelectedBusiness(fullBusinessData);
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

  const handleAddBusiness = () => {
    router.push('/add-business');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>My Businesses</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddBusiness}
          activeOpacity={0.7}
        >
          <Plus size={24} color="#6366F1" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {businesses.length === 0 ? (
          <EmptyState onAddBusiness={handleAddBusiness} />
        ) : (
          <View style={styles.businessList}>
            {businesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                onEdit={handleEdit}
                onCopy={handleCopy}
              />
            ))}
            <TouchableOpacity onPress={() => router.push('/demo-assisted-fill')}>
              <Text>Try Assisted Fill Demo</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {selectedBusiness && (
          <CopyBusinessSheet
          visible={showCopySheet}
          business={selectedBusiness}
          onClose={() => setShowCopySheet(false)}
          onCopy={handleCopyToClipboard}
          />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  topBar: {
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  businessList: {
    paddingBottom: 20,
  },
});