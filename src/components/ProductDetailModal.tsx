import { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DEFAULT_MONITOR_IMG } from '../constants/api';

interface ProductItem {
  id: number;
  product_name: string;
  tshirt_type: string;
  model: string;
  price: string | number;
  image_url?: string;
  [key: string]: any;
}

interface ProductDetailModalProps {
  visible: boolean;
  product: ProductItem | null;
  stock: number;
  inCartQty: number;
  isAdmin: boolean;
  onClose: () => void;
  onConfirmAddToCart: (product: ProductItem, qty: number) => void;
}

const parsePrice = (val: any): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val.replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export default function ProductDetailModal({
  visible,
  product,
  stock,
  inCartQty,
  isAdmin,
  onClose,
  onConfirmAddToCart,
}: ProductDetailModalProps) {
  const [qty, setQty] = useState(1);

  // คำนวณจำนวนที่สามารถหยิบได้
  const maxAllowed = Math.max(0, stock - inCartQty);
  
  // แยกเงื่อนไข "สินค้าหมด" กับ "หยิบครบแล้ว"
  const isOutOfStock = stock <= 0;
  const isMaxReached = !isOutOfStock && maxAllowed <= 0;

  useEffect(() => {
    if (visible) {
      setQty(maxAllowed > 0 ? 1 : 0);
    }
  }, [visible, maxAllowed]);

  if (!visible || !product) return null;

  const handleIncrease = () => {
    if (qty < maxAllowed) setQty(qty + 1);
  };

  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleConfirm = () => {
    if (qty > 0 && qty <= maxAllowed) {
      onConfirmAddToCart(product, qty);
      onClose();
    }
  };

  const priceNum = parsePrice(product.price);
  const totalPrice = priceNum * qty;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🔍 รายละเอียดสินค้าและสั่งซื้อ</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: product.image_url && product.image_url.length > 5 ? product.image_url : DEFAULT_MONITOR_IMG }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.hintText}>💡 ตรวจสอบรายละเอียดสินค้าก่อนทำการสั่งซื้อ</Text>

            {/* Info */}
            <Text style={styles.productName}>{product.product_name}</Text>
            
            <View style={styles.specBox}>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>🖥️ สเปกหน้าจอ:</Text>
                <Text style={styles.specValue}>{product.tshirt_type || '27" IPS 180Hz'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>🏷️ รหัสรุ่น (Model):</Text>
                <Text style={styles.specValue}>{product.model}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>📦 สต๊อกคงเหลือในคลัง:</Text>
                <Text style={[styles.specValue, isOutOfStock ? { color: '#ef4444' } : { color: '#10b981' }]}>
                  {stock} ชิ้น
                </Text>
              </View>
            </View>

            {/* Control Box (ซ่อนถ้าเป็น Admin) */}
            {!isAdmin && (
              <View style={styles.controlBox}>
                <View style={styles.controlHeader}>
                  <Text style={styles.controlTitle}>🛍️ ระบุจำนวนที่ต้องการใส่ตะกร้า:</Text>
                  <Text style={styles.controlLimit}>หยิบเพิ่มได้สูงสุด {maxAllowed} ชิ้น</Text>
                </View>

                <View style={styles.controlRow}>
                  <View style={styles.qtySpinner}>
                    <TouchableOpacity style={styles.spinnerBtn} onPress={handleDecrease} disabled={qty <= 1 || isOutOfStock || isMaxReached}>
                      <Text style={[styles.spinnerBtnText, (qty <= 1 || isOutOfStock || isMaxReached) && { color: '#3f3f46' }]}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyInput}>{qty}</Text>
                    <TouchableOpacity style={styles.spinnerBtn} onPress={handleIncrease} disabled={qty >= maxAllowed || isOutOfStock || isMaxReached}>
                      <Text style={[styles.spinnerBtnText, (qty >= maxAllowed || isOutOfStock || isMaxReached) && { color: '#3f3f46' }]}>+</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.priceSummary}>
                    <Text style={styles.priceSummaryLabel}>ราคารวมที่จะเพิ่ม</Text>
                    <Text style={styles.priceSummaryValue}>${totalPrice.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>ปิดหน้าต่าง</Text>
            </TouchableOpacity>

            {!isAdmin && (
              <>
                {/* ระบบเช็คเงื่อนไขปุ่มสั่งซื้อ */}
                {isOutOfStock ? (
                  <View style={[styles.confirmBtn, { backgroundColor: '#27272a', shadowOpacity: 0 }]}>
                    <Text style={[styles.confirmBtnText, { color: '#71717a' }]}>❌ สินค้าหมด</Text>
                  </View>
                ) : isMaxReached ? (
                  <View style={[styles.confirmBtn, { backgroundColor: '#27272a', shadowOpacity: 0 }]}>
                    <Text style={[styles.confirmBtnText, { color: '#71717a' }]}>❌ หยิบครบจำนวนสต็อกแล้ว</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                    <Text style={styles.confirmBtnText}>🛒 ยืนยันใส่ตะกร้า</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(9, 9, 11, 0.92)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalContent: { backgroundColor: '#18181b', width: '100%', maxWidth: 500, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#27272a', shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 15, maxHeight: '90%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  title: { color: '#f8fafc', fontSize: 18, fontWeight: '950' },
  closeBtn: { backgroundColor: '#27272a', width: 36, height: 36, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  closeBtnText: { color: '#a1a1aa', fontSize: 14, fontWeight: 'bold' },
  
  scrollArea: { flexShrink: 1 },
  
  imageContainer: { width: '100%', height: 240, backgroundColor: '#ffffff', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12, overflow: 'hidden' },
  image: { width: '85%', height: '85%' },
  hintText: { color: '#06b6d4', fontSize: 12, fontWeight: '800', textAlign: 'center', marginBottom: 20 },

  productName: { color: '#ffffff', fontSize: 20, fontWeight: '950', marginBottom: 16 },
  
  specBox: { gap: 10, marginBottom: 24 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  specLabel: { color: '#a1a1aa', fontSize: 13, fontWeight: '800' },
  specValue: { color: '#f8fafc', fontSize: 14, fontWeight: '900' },

  controlBox: { backgroundColor: '#09090b', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#27272a', marginBottom: 8 },
  controlHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  controlTitle: { color: '#f8fafc', fontSize: 13, fontWeight: '900' },
  controlLimit: { color: '#a1a1aa', fontSize: 11, fontWeight: '800' },
  
  controlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtySpinner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', borderRadius: 12, borderWidth: 1, borderColor: '#27272a', padding: 4 },
  spinnerBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#27272a', borderRadius: 8 },
  spinnerBtnText: { color: '#f8fafc', fontSize: 18, fontWeight: 'bold' },
  qtyInput: { color: '#06b6d4', fontSize: 16, fontWeight: '950', width: 48, textAlign: 'center' },
  
  priceSummary: { alignItems: 'flex-end' },
  priceSummaryLabel: { color: '#a1a1aa', fontSize: 11, fontWeight: '800', marginBottom: 4 },
  priceSummaryValue: { color: '#10b981', fontSize: 22, fontWeight: '950' },

  footer: { flexDirection: 'row', gap: 12, marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#27272a' },
  cancelBtn: { backgroundColor: 'transparent', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 50, alignItems: 'center', borderWidth: 1.5, borderColor: '#71717a' },
  cancelBtnText: { color: '#a1a1aa', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  confirmBtn: { flex: 1, backgroundColor: '#06b6d4', paddingVertical: 14, borderRadius: 50, alignItems: 'center', shadowColor: '#06b6d4', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6, justifyContent: 'center' },
  confirmBtnText: { color: '#000000', fontSize: 14, fontWeight: '950', textTransform: 'uppercase', letterSpacing: 0.5 },
});