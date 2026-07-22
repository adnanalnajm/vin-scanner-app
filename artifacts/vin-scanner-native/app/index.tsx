import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

async function openGallery() {
  let permission;
  try {
    permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  } catch {
    Alert.alert('', 'تعذر اختيار الصورة');
    return;
  }

  if (permission.status !== 'granted') {
    Alert.alert('', 'يجب السماح بالوصول إلى الصور لاختيار صورة');
    return;
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;
    router.push({ pathname: '/preview', params: { uri } });
  } catch {
    Alert.alert('', 'تعذر اختيار الصورة');
  }
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>قارئ رقم الشاصي</Text>
          <Text style={styles.subtitle}>
            استخراج رقم الشاصي من صور المركبات
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>التقاط صورة</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={openGallery}
          >
            <Text style={styles.secondaryButtonText}>
              اختيار صورة من المعرض
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    color: '#666',
    writingDirection: 'rtl',
    lineHeight: 22,
  },
  buttons: {
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
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: 17,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
});
