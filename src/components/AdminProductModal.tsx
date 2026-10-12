import { Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/clusterStyles';

interface AdminProductModalProps {
  visible: boolean;
  editingId: number | null;
  formData: {
    product_name: string;
    tshirt_type: string;
    model: string;
    price: string;
    image_url: string;
    stock: string;
  };
  setFormData: (data: any) => void;
  onClose: () => void;
  onSave: () => void;
}

export default function AdminProductModal({
  visible,
  editingId,
  formData,
  setFormData,
  onClose,
  onSave,
}: AdminProductModalProps) {
  const handleSelectFileFromPC = () => {
    if (Platform.OS === 'web') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (uploadEvent: any) => {
            setFormData({ ...formData, image_url: uploadEvent.target.result });
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  };

  const adjustFormStock = (delta: number) => {
    const current = parseInt(formData.stock, 10) || 0;
    const updated = Math.max(0, current + delta);
    setFormData({ ...formData, stock: updated.toString() });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18, fontWeight: '900', color: '#fff', marginBottom: 14 }}>
            {editingId ? '✏️ แก้ไขข้อมูลสินค้าและสต็อก' : '✨ เพิ่มจอมอนิเตอร์ใหม่'}
          </Text>

          <ScrollView style={{ maxHeight: 460 }} showsVerticalScrollIndicator={false}>
            <View style={styles.previewImageBox}>
              {formData.image_url.trim().length > 0 ? (
                <Image source={{ uri: formData.image_url.trim() }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
              ) : (
                <Text style={{ color: '#64748b', fontSize: 12 }}>ยังไม่ได้เลือกรูปภาพ</Text>
              )}
            </View>

            <TouchableOpacity style={styles.pickFileBtn} onPress={handleSelectFileFromPC}>
              <Text style={styles.pickFileBtnText}>📁 เลือกรูปภาพจากเครื่องคอมพิวเตอร์</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="ชื่อสินค้า *"
              placeholderTextColor="#64748b"
              value={formData.product_name}
              onChangeText={(t) => setFormData({ ...formData, product_name: t })}
            />
            <TextInput
              style={styles.input}
              placeholder="สเปกพาเนล (เช่น 27 IPS 180Hz)"
              placeholderTextColor="#64748b"
              value={formData.tshirt_type}
              onChangeText={(t) => setFormData({ ...formData, tshirt_type: t })}
            />
            <TextInput
              style={styles.input}
              placeholder="รหัสรุ่น (Model)"
              placeholderTextColor="#64748b"
              value={formData.model}
              onChangeText={(t) => setFormData({ ...formData, model: t })}
            />
            <TextInput
              style={styles.input}
              placeholder="ราคา (฿ บาท) *"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(t) => setFormData({ ...formData, price: t })}
            />

            <View style={styles.stockEditorBox}>
              <Text style={styles.stockEditorLabel}>📦 จำนวนสต็อกสินค้าคงเหลือ (ชิ้น)</Text>
              <View style={styles.stockControlRow}>
                <TouchableOpacity style={styles.stockQuickBtn} onPress={() => adjustFormStock(-1)}>
                  <Text style={styles.stockQuickBtnText}>-1</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.stockInput}
                  placeholder="0"
                  placeholderTextColor="#64748b"
                  keyboardType="numeric"
                  value={formData.stock}
                  onChangeText={(t) => setFormData({ ...formData, stock: t.replace(/[^0-9]/g, '') })}
                />

                <TouchableOpacity style={styles.stockQuickBtn} onPress={() => adjustFormStock(1)}>
                  <Text style={styles.stockQuickBtnText}>+1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.stockQuickBtn, styles.stockQuickBtnHighlight]} onPress={() => adjustFormStock(5)}>
                  <Text style={styles.stockQuickBtnText}>+5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.stockQuickBtn, styles.stockQuickBtnHighlight]} onPress={() => adjustFormStock(10)}>
                  <Text style={styles.stockQuickBtnText}>+10</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
            <TouchableOpacity style={styles.detailBackBtn} onPress={onClose}>
              <Text style={styles.detailBackBtnText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.detailBackBtn, { backgroundColor: '#0284c7' }]} onPress={onSave}>
              <Text style={{ color: '#fff', fontWeight: '800' }}>💾 บันทึกข้อมูล</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}