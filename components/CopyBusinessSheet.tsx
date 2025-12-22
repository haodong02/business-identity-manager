import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { X, Copy, CheckCircle2 } from 'lucide-react-native';

interface BusinessData {
  name: string;
  brn: string;
  tin: string;
  sstNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
  city: string;
  state: string;
  contactEmail: string;
  contactPhone: string;
}

interface CopyBusinessSheetProps {
  visible: boolean;
  business: BusinessData;
  onClose: () => void;
  onCopy: (formattedText: string) => void;
}

export default function CopyBusinessSheet({
  visible,
  business,
  onClose,
  onCopy,
}: CopyBusinessSheetProps) {
  const [copied, setCopied] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      setCopied(false);
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

  const formatBusinessInfo = () => {
    const lines = [
      `Business Name: ${business.name}`,
      `BRN: ${business.brn}`,
      `TIN: ${business.tin}`,
    ];

    if (business.sstNumber) {
      lines.push(`SST: ${business.sstNumber}`);
    }

    const address = [
      business.addressLine1,
      business.addressLine2,
      `${business.postcode} ${business.city}`,
      business.state,
    ]
      .filter(Boolean)
      .join(', ');

    lines.push(`Address: ${address}`);
    lines.push(`Email: ${business.contactEmail}`);
    lines.push(`Phone: ${business.contactPhone}`);

    return lines.join('\n');
  };

  const handleCopy = () => {
    const formattedText = formatBusinessInfo();
    onCopy(formattedText);
    setCopied(true);

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[
            styles.sheetContainer,
            { transform: [{ translateY }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.successIconContainer}>
                <CheckCircle2 size={24} color="#10B981" strokeWidth={2.5} />
              </View>
              <Text style={styles.headerTitle}>Business Info Copied</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <X size={24} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Preview Box */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.previewBox}>
              <Text style={styles.previewText}>{formatBusinessInfo()}</Text>
            </View>

            {/* Copy Again Button */}
            <TouchableOpacity
              style={[styles.copyButton, copied && styles.copyButtonSuccess]}
              onPress={handleCopy}
              activeOpacity={0.8}
            >
              {copied ? (
                <>
                  <CheckCircle2 size={20} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.copyButtonText}>Copied!</Text>
                </>
              ) : (
                <>
                  <Copy size={20} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.copyButtonText}>Copy Again</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Tip Text */}
            <View style={styles.tipContainer}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>
                Paste into any form field. You can paste this information anywhere you need to fill business details.
              </Text>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
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
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
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
  successIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  previewBox: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  previewText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 10,
    marginBottom: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  copyButtonSuccess: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
  },
  copyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
  },
});