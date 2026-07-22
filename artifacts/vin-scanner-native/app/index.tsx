import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();

  const topPad =
    Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad =
    Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: topPad,
          paddingBottom: bottomPad + 24,
        },
      ]}
    >
      {/* Logo / icon area */}
      <View style={styles.heroArea}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: colors.muted, borderColor: colors.buttonPrimaryBorder },
          ]}
        >
          <MaterialCommunityIcons
            name="barcode-scan"
            size={56}
            color={colors.primary}
          />
        </View>
      </View>

      {/* Title & subtitle */}
      <View style={styles.textArea}>
        <Text
          style={[
            styles.title,
            { color: colors.foreground },
          ]}
        >
          قارئ رقم الشاصي
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: colors.subtitleText },
          ]}
        >
          استخراج رقم الشاصي من صور المركبات
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsArea}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonPrimary,
            {
              backgroundColor: colors.buttonPrimary,
              borderColor: colors.buttonPrimaryBorder,
              opacity: pressed ? 0.82 : 1,
              transform: [{ scale: pressed ? 0.975 : 1 }],
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="التقاط صورة"
        >
          <MaterialCommunityIcons
            name="camera-outline"
            size={22}
            color="#FFFFFF"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
            التقاط صورة
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonSecondary,
            {
              backgroundColor: colors.buttonSecondary,
              borderColor: colors.buttonSecondaryBorder,
              opacity: pressed ? 0.82 : 1,
              transform: [{ scale: pressed ? 0.975 : 1 }],
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel="اختيار صورة من المعرض"
        >
          <MaterialCommunityIcons
            name="image-outline"
            size={22}
            color={colors.accent}
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonText, { color: colors.accent }]}>
            اختيار صورة من المعرض
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  heroArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 32,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    alignItems: 'center',
    paddingBottom: 40,
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    writingDirection: 'rtl',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  buttonsArea: {
    width: '100%',
    gap: 14,
  },
  button: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 10,
  },
  buttonPrimary: {},
  buttonSecondary: {},
  buttonIcon: {},
  buttonText: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    writingDirection: 'rtl',
    textAlign: 'center',
  },
});
