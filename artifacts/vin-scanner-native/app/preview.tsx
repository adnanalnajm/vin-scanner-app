import { recognizeText } from '@infinitered/react-native-mlkit-text-recognition';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PreviewScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const imageUri = Array.isArray(uri) ? uri[0] : uri;
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleUseImage() {
    if (!imageUri || isProcessing) return;

    try {
      setIsProcessing(true);
      const result = await recognizeText(imageUri);
      Alert.alert('النص المستخرج', result.text || 'لم يتم العثور على نص');
    } catch {
      Alert.alert('', 'تعذر استخراج النص من الصورة');
    } finally {
      setIsProcessing(false);
    }
  }

  function handlePickAnother() {
    router.back();
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>رجوع</Text>
        </TouchableOpacity>
      </View>

      {/* Image or missing-URI message */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>لا توجد صورة للمعاينة</Text>
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={handleUseImage}
          disabled={!imageUri || isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>استخدام هذه الصورة</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={handlePickAnother}
        >
          <Text style={styles.secondaryButtonText}>اختيار صورة أخرى</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'flex-end',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  noImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#aaa',
    fontSize: 16,
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  buttons: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
});
