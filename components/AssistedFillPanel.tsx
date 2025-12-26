import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {
  X,
  Building2,
  FileText,
  Hash,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  Sparkles,
} from 'lucide-react-native';
import { Business } from '../types/Business';

interface AssistedFillPanelProps {
  visible: boolean;
  businesses: Business[];
  detectedFieldType?: 'name' | 'brn' | 'tin' | 'sst' | 'address' | 'email' | 'phone' | null;
  onClose: () => void;
  onSelectField: (field: string, value: string) => void;
}

export default function AssistedFillPanel({
  visible,
  businesses,
  detectedFieldType = null,
  onClose,
  onSelectField,
}: AssistedFillPanelProps) {
  const [selectedBusinessId, setSelectedBusinessId] = useState(
    businesses[0]?.id || ''
  );
  const [showBusinessDropdown, setShowBusinessDropdown] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 10,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // Update selectedBusinessId if businesses change or initial load
  React.useEffect(() => {
      if (businesses.length > 0 && !selectedBusinessId) {
          setSelectedBusinessId(businesses[0].id);
      }
  }, [businesses]);

  const selectedBusiness = businesses.find((b) => b.id === selectedBusinessId) || businesses[0];

  const handleFieldSelect = (field: string, value: string) => {
    onSelectField(field, value);
    // In real app: This would insert into the focused field
    // For now, just close the panel
    setTimeout(() => onClose(), 300);
  };

  const getFieldHint = () => {
    const hints: Record<string, string> = {
      name: '💡 This looks like a Business Name field',
      brn: '💡 This looks like a BRN field',
      tin: '💡 This looks like a TIN field',
      sst: '💡 This looks like an SST Number field',
      address: '💡 This looks like an Address field',
      email: '💡 This looks like an Email field',
      phone: '💡 This looks like a Phone field',
    };
    return detectedFieldType ? hints[detectedFieldType] : null;
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  if (!visible || !selectedBusiness) return null;

  const fullAddress = [
    selectedBusiness.addressLine1,
    selectedBusiness.addressLine2,
    `${selectedBusiness.postcode} ${selectedBusiness.city}`,
    selectedBusiness.state,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[styles.panelContainer, { transform: [{ translateY }] }]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.sparkleIcon}>
                <Sparkles size={24} color="#6366F1" strokeWidth={2} />
              </View>
              <Text style={styles.headerTitle}>Fill Business Info</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <X size={24} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Field Detection Hint */}
          {getFieldHint() && (
            <View style={styles.hintBanner}>
              <Text style={styles.hintText}>{getFieldHint()}</Text>
            </View>
          )}

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Business Selector */}
            <View style={styles.selectorSection}>
              <Text style={styles.selectorLabel}>Select Business</Text>
              <TouchableOpacity
                style={styles.businessSelector}
                onPress={() => setShowBusinessDropdown(!showBusinessDropdown)}
                activeOpacity={0.7}
              >
                <View style={styles.businessSelectorLeft}>
                  <Building2 size={20} color="#6366F1" strokeWidth={2} />
                  <View style={styles.businessSelectorText}>
                    <Text style={styles.businessSelectorName}>
                      {selectedBusiness.businessName}
                    </Text>
                    <Text style={styles.businessSelectorBrn}>
                      {selectedBusiness.brn}
                    </Text>
                  </View>
                </View>
                <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>

              {/* Dropdown List */}
              {showBusinessDropdown && businesses.length > 1 && (
                <View style={styles.dropdownList}>
                  {businesses.map((business) => (
                    <TouchableOpacity
                      key={business.id}
                      style={[
                        styles.dropdownItem,
                        selectedBusinessId === business.id &&
                          styles.dropdownItemSelected,
                      ]}
                      onPress={() => {
                        setSelectedBusinessId(business.id);
                        setShowBusinessDropdown(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedBusinessId === business.id &&
                            styles.dropdownItemTextSelected,
                        ]}
                      >
                        {business.businessName}
                      </Text>
                      <Text style={styles.dropdownItemSubtext}>
                        {business.brn}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Fill Options */}
            <View style={styles.optionsSection}>
              <Text style={styles.optionsTitle}>Tap to fill:</Text>

              <FillOption
                icon={Building2}
                label="Business Name"
                value={selectedBusiness.businessName}
                onPress={() =>
                  handleFieldSelect('name', selectedBusiness.businessName)
                }
                highlighted={detectedFieldType === 'name'}
              />

              <FillOption
                icon={FileText}
                label="BRN"
                value={selectedBusiness.brn}
                onPress={() => handleFieldSelect('brn', selectedBusiness.brn)}
                highlighted={detectedFieldType === 'brn'}
              />

              <FillOption
                icon={Hash}
                label="TIN"
                value={selectedBusiness.tin}
                onPress={() => handleFieldSelect('tin', selectedBusiness.tin)}
                highlighted={detectedFieldType === 'tin'}
              />

              {selectedBusiness.sstNumber && (
                <FillOption
                  icon={Hash}
                  label="SST Number"
                  value={selectedBusiness.sstNumber}
                  onPress={() =>
                    handleFieldSelect('sst', selectedBusiness.sstNumber!)
                  }
                  highlighted={detectedFieldType === 'sst'}
                />
              )}

              <FillOption
                icon={MapPin}
                label="Address"
                value={fullAddress}
                onPress={() => handleFieldSelect('address', fullAddress)}
                highlighted={detectedFieldType === 'address'}
                multiline
              />

              <FillOption
                icon={Mail}
                label="Contact Email"
                value={selectedBusiness.contactEmail}
                onPress={() =>
                  handleFieldSelect('email', selectedBusiness.contactEmail)
                }
                highlighted={detectedFieldType === 'email'}
              />

              <FillOption
                icon={Phone}
                label="Contact Phone"
                value={selectedBusiness.contactPhone}
                onPress={() =>
                  handleFieldSelect('phone', selectedBusiness.contactPhone)
                }
                highlighted={detectedFieldType === 'phone'}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Fill Option Component
interface FillOptionProps {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  onPress: () => void;
  highlighted?: boolean;
  multiline?: boolean;
}

function FillOption({
  icon: Icon,
  label,
  value,
  onPress,
  highlighted = false,
  multiline = false,
}: FillOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.fillOption, highlighted && styles.fillOptionHighlighted]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.fillOptionLeft}>
        <View
          style={[
            styles.fillOptionIcon,
            highlighted && styles.fillOptionIconHighlighted,
          ]}
        >
          <Icon
            size={20}
            color={highlighted ? '#6366F1' : '#6B7280'}
            strokeWidth={2}
          />
        </View>
        <View style={styles.fillOptionText}>
          <Text style={styles.fillOptionLabel}>{label}</Text>
          <Text
            style={[
              styles.fillOptionValue,
              multiline && styles.fillOptionValueMultiline,
            ]}
            numberOfLines={multiline ? 2 : 1}
          >
            {value}
          </Text>
        </View>
      </View>
      {highlighted && <View style={styles.highlightBadge} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  panelContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  sparkleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintBanner: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
  },
  hintText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#78350F',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  selectorSection: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  businessSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
  },
  businessSelectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  businessSelectorText: {
    flex: 1,
  },
  businessSelectorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  businessSelectorBrn: {
    fontSize: 14,
    color: '#6B7280',
  },
  dropdownList: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemSelected: {
    backgroundColor: '#EEF2FF',
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  dropdownItemTextSelected: {
    color: '#6366F1',
  },
  dropdownItemSubtext: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  optionsSection: {
    gap: 12,
  },
  optionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fillOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    minHeight: 72,
  },
  fillOptionHighlighted: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  fillOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  fillOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillOptionIconHighlighted: {
    backgroundColor: '#C7D2FE',
  },
  fillOptionText: {
    flex: 1,
  },
  fillOptionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  fillOptionValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  fillOptionValueMultiline: {
    lineHeight: 20,
  },
  highlightBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366F1',
  },
});