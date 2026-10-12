import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Product } from '../constants/products';
import { colors } from '../constants/theme';

type Props = {
  visible: boolean;
  editingItem: Product | null;
  onClose: () => void;
  onSave: (values: { name: string; price: string; image: string }, editingId: string | null) => void;
};

export default function ProductFormModal({ visible, editingItem, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (visible) {
      setName(editingItem?.name ?? '');
      setPrice(editingItem?.price?.toString() ?? '');
      setImage(editingItem?.image ?? '');
    }
  }, [visible, editingItem]);

  const handleSave = () => {
    onSave({ name, price, image }, editingItem?.id ?? null);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{editingItem ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ชื่อสินค้า</Text>
            <TextInput style={styles.input} placeholder="เช่น Holo Charizard" value={name} onChangeText={setName} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ราคา (บาท)</Text>
            <TextInput style={styles.input} placeholder="เช่น 37000" keyboardType="numeric" value={price} onChangeText={setPrice} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL รูปภาพ</Text>
            <TextInput style={styles.input} placeholder="https://..." value={image} onChangeText={setImage} autoCapitalize="none" />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.btnSecondary, { flex: 1, marginRight: 8 }]} onPress={onClose}>
              <Text style={styles.btnSecondaryText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnPrimary, { flex: 1, marginLeft: 8 }]} onPress={handleSave}>
              <Text style={styles.btnText}>บันทึก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(20, 23, 26, 0.45)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  content: { width: '100%', maxWidth: 420, backgroundColor: colors.surface, borderRadius: 14, padding: 24 },
  title: { fontSize: 17, fontWeight: '700', color: colors.ink, marginBottom: 20, letterSpacing: -0.2 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 12.5, fontWeight: '600', color: colors.inkMuted, marginBottom: 6 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 9, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: colors.ink },
  actions: { flexDirection: 'row', marginTop: 8 },
  btnPrimary: { backgroundColor: colors.accent, borderRadius: 9, paddingVertical: 13, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  btnSecondary: { backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.line, borderRadius: 9, paddingVertical: 12, alignItems: 'center' },
  btnSecondaryText: { color: colors.ink, fontSize: 14, fontWeight: '600' },
});