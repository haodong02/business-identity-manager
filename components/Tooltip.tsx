import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TooltipProps {
  visible: boolean;
  title: string;
  message: string;
  targetPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
  onDismiss: () => void;
}

export default function Tooltip({
  visible,
  title,
  message,
  targetPosition,
  arrowDirection = 'down',
  onDismiss,
}: TooltipProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (visible) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Pulse animation for arrow
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  // Calculate tooltip position based on target and arrow direction
  const getTooltipPosition = () => {
    const tooltipWidth = SCREEN_WIDTH - 80;
    const arrowOffset = 20;

    switch (arrowDirection) {
      case 'down':
        return {
          top: targetPosition.top - 140,
          left: Math.max(
            40,
            Math.min(
              targetPosition.left + targetPosition.width / 2 - tooltipWidth / 2,
              SCREEN_WIDTH - tooltipWidth - 40
            )
          ),
        };
      case 'up':
        return {
          top: targetPosition.top + targetPosition.height + arrowOffset,
          left: Math.max(
            40,
            Math.min(
              targetPosition.left + targetPosition.width / 2 - tooltipWidth / 2,
              SCREEN_WIDTH - tooltipWidth - 40
            )
          ),
        };
      case 'left':
        return {
          top: targetPosition.top + targetPosition.height / 2 - 60,
          left: targetPosition.left + targetPosition.width + arrowOffset,
        };
      case 'right':
        return {
          top: targetPosition.top + targetPosition.height / 2 - 60,
          left: targetPosition.left - tooltipWidth - arrowOffset,
        };
      default:
        return { top: 0, left: 0 };
    }
  };

  const tooltipPosition = getTooltipPosition();

  // Get arrow position
  const getArrowStyle = () => {
    const arrowSize = 12;
    const centerX = targetPosition.left + targetPosition.width / 2;

    switch (arrowDirection) {
      case 'down':
        return {
          position: 'absolute' as const,
          bottom: -arrowSize,
          left: centerX - tooltipPosition.left - arrowSize,
          width: 0,
          height: 0,
          borderLeftWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightWidth: arrowSize,
          borderRightColor: 'transparent',
          borderTopWidth: arrowSize,
          borderTopColor: '#6366F1',
        };
      case 'up':
        return {
          position: 'absolute' as const,
          top: -arrowSize,
          left: centerX - tooltipPosition.left - arrowSize,
          width: 0,
          height: 0,
          borderLeftWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightWidth: arrowSize,
          borderRightColor: 'transparent',
          borderBottomWidth: arrowSize,
          borderBottomColor: '#6366F1',
        };
      default:
        return {};
    }
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onDismiss}
      >
        {/* Highlight the target element */}
        <View
          style={[
            styles.highlight,
            {
              top: targetPosition.top - 8,
              left: targetPosition.left - 8,
              width: targetPosition.width + 16,
              height: targetPosition.height + 16,
            },
          ]}
        />

        {/* Pulsing arrow pointing to target */}
        <Animated.View
          style={[
            styles.arrow,
            {
              top: targetPosition.top - 40,
              left: targetPosition.left + targetPosition.width / 2 - 15,
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Text style={styles.arrowText}>👇</Text>
        </Animated.View>

        {/* Tooltip */}
        <Animated.View
          style={[
            styles.tooltip,
            {
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.tooltipContent}>
            <View style={styles.tooltipHeader}>
              <Text style={styles.tooltipTitle}>{title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onDismiss}
                activeOpacity={0.7}
              >
                <X size={20} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.tooltipMessage}>{message}</Text>
            <TouchableOpacity style={styles.gotItButton} onPress={onDismiss}>
              <Text style={styles.gotItText}>Got it!</Text>
            </TouchableOpacity>
          </View>
          <View style={getArrowStyle()} />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  highlight: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  arrow: {
    position: 'absolute',
  },
  arrowText: {
    fontSize: 30,
  },
  tooltip: {
    position: 'absolute',
    maxWidth: SCREEN_WIDTH - 80,
    borderRadius: 16,
    overflow: 'visible',
  },
  tooltipContent: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tooltipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipMessage: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 16,
  },
  gotItButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  gotItText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6366F1',
  },
});