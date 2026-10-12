import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DEFAULT_MONITOR_IMG } from '../constants/api';

interface ProductItem {
  id: number;
  product_name: string;
  model: string;
  price: string | number;
  image_url?: string;
  [key: string]: any;
}

interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartModalProps {
  visible: boolean;
  cart: CartItem[];
  totalCartCount: number;
  totalCartPrice: number;
  onClose: () => void;
  onIncreaseQty: (product: ProductItem) => void;
  onDecreaseQty: (productId: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const parsePrice = (val: any): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val.replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export default function CartModal({
  visible,
  cart,
  totalCartCount,
  totalCartPrice,
  onClose,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartModalProps) {
  // สถานะเก็บข้อมูลการสั่งซื้อ
  const [shipping, setShipping] = useState<'standard' | 'express'>('standard');
  const [payment, setPayment] = useState<'promptpay' | 'card' | 'cod'>('promptpay');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [codPhone, setCodPhone] = useState('');

  // คำนวณค่าจัดส่งและยอดรวมสุทธิ
  const shippingCost = shipping === 'express' ? 35.0 : 15.0;
  const finalTotal = totalCartPrice > 0 ? totalCartPrice + shippingCost : 0;

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.cartModalContent}>
          
          {/* Header */}
          <View style={styles.cartHeader}>
            <Text style={styles.cartTitle}>🛒 ตะกร้าสินค้า ({totalCartCount} ชิ้น)</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeModalBtn}>
              <Text style={styles.closeModalText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* ส่วนเนื้อหาที่สามารถเลื่อนได้ */}
          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* รายการสินค้า */}
            {cart.length === 0 ? (
              <Text style={styles.emptyText}>ไม่มีสินค้าในตะกร้า</Text>
            ) : (
              cart.map((item) => (
                <View key={item.product.id} style={styles.cartItemRow}>
                  <Image
                    source={{ uri: item.product.image_url && item.product.image_url.length > 5 ? item.product.image_url : DEFAULT_MONITOR_IMG }}
                    style={styles.cartItemImage}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.product.product_name}</Text>
                    <Text style={styles.itemPrice}>${parsePrice(item.product.price).toFixed(2)} / ชิ้น</Text>
                  </View>
                  
                  <View style={styles.qtyControls}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => onDecreaseQty(item.product.id)}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => onIncreaseQty(item.product)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => onRemoveItem(item.product.id)}>
                      <Text style={styles.deleteBtnText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}

            {/* แสดงแบบฟอร์มเฉพาะตอนที่มีของในตะกร้า */}
            {cart.length > 0 && (
              <View style={{ marginTop: 8 }}>
                
                {/* ข้อมูลที่อยู่ */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>📍 ข้อมูลที่อยู่จัดส่ง</Text>
                  <TextInput
                    style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                    placeholder="ระบุชื่อ-นามสกุล, บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด และรหัสไปรษณีย์..."
                    placeholderTextColor="#71717a"
                    multiline
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>

                {/* ตัวเลือกการจัดส่ง */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>🚚 รูปแบบการจัดส่ง</Text>
                  <View style={styles.optionRow}>
                    <TouchableOpacity 
                      style={[styles.optionBtn, shipping === 'standard' && styles.optionBtnActive]}
                      onPress={() => setShipping('standard')}
                    >
                      <Text style={[styles.optionText, shipping === 'standard' && styles.optionTextActive]}>ธรรมดา (+$15.00)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.optionBtn, shipping === 'express' && styles.optionBtnActive]}
                      onPress={() => setShipping('express')}
                    >
                      <Text style={[styles.optionText, shipping === 'express' && styles.optionTextActive]}>ด่วนพิเศษ (+$35.00)</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* ตัวเลือกช่องทางชำระเงิน */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>💳 ช่องทางการชำระเงิน</Text>
                  <View style={styles.optionRow}>
                    <TouchableOpacity 
                      style={[styles.optionBtn, payment === 'promptpay' && styles.optionBtnActive]}
                      onPress={() => setPayment('promptpay')}
                    >
                      <Text style={[styles.optionText, payment === 'promptpay' && styles.optionTextActive]}>📱 พร้อมเพย์</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.optionBtn, payment === 'card' && styles.optionBtnActive]}
                      onPress={() => setPayment('card')}
                    >
                      <Text style={[styles.optionText, payment === 'card' && styles.optionTextActive]}>💳 บัตรเครดิต</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.optionBtn, payment === 'cod' && styles.optionBtnActive]}
                      onPress={() => setPayment('cod')}
                    >
                      <Text style={[styles.optionText, payment === 'cod' && styles.optionTextActive]}>📦 ปลายทาง</Text>
                    </TouchableOpacity>
                  </View>

                  {/* กล่องใส่ข้อมูลตามประเภทการชำระเงิน */}
                  <View style={styles.paymentDetailBox}>
                    {payment === 'promptpay' && (
                      <View style={styles.centerAlign}>
                        <Image 
                          source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PROMPTPAY-DS-MONITOR' }} 
                          style={styles.qrCodeImage} 
                        />
                        <Text style={styles.qrCodeText}>สแกน QR Code ด้วยแอปธนาคาร</Text>
                      </View>
                    )}

                    {payment === 'card' && (
                      <View>
                        <Text style={styles.inputLabel}>หมายเลขบัตรเครดิต / เดบิต</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="0000 0000 0000 0000"
                          placeholderTextColor="#71717a"
                          keyboardType="numeric"
                          value={cardNumber}
                          onChangeText={setCardNumber}
                          maxLength={19}
                        />
                      </View>
                    )}

                    {payment === 'cod' && (
                      <View>
                        <Text style={styles.inputLabel}>เบอร์โทรศัพท์สำหรับติดต่อพัสดุปลายทาง</Text>
                        <TextInput
                          style={styles.input}
                          placeholder="08X-XXX-XXXX"
                          placeholderTextColor="#71717a"
                          keyboardType="phone-pad"
                          value={codPhone}
                          onChangeText={setCodPhone}
                          maxLength={10}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* สรุปยอดและปุ่มยืนยัน (ล็อคติดด้านล่างสุด) */}
          {cart.length > 0 && (
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>รวมราคาสินค้า:</Text>
                <Text style={styles.summarySubValue}>${totalCartPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>ค่าจัดส่ง ({shipping === 'express' ? 'ด่วนพิเศษ' : 'ธรรมดา'}):</Text>
                <Text style={styles.summarySubValue}>${shippingCost.toFixed(2)}</Text>
              </View>
              <View style={[styles.summaryRow, { marginTop: 8 }]}>
                <Text style={[styles.summaryLabel, { color: '#f8fafc' }]}>ยอดชำระสุทธิ:</Text>
                <Text style={styles.summaryValue}>${finalTotal.toFixed(2)}</Text>
              </View>
              
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.clearBtn} onPress={onClearCart}>
                  <Text style={styles.clearBtnText}>ล้างตะกร้า</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
                  <Text style={styles.checkoutBtnText}>💳 ยืนยันสั่งซื้อ</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(9, 9, 11, 0.92)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  cartModalContent: { backgroundColor: '#18181b', width: '100%', maxWidth: 560, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#27272a', shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.6, shadowRadius: 25, elevation: 15, maxHeight: '90%' },
  cartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  cartTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '950' },
  closeModalBtn: { backgroundColor: '#27272a', width: 36, height: 36, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  closeModalText: { color: '#a1a1aa', fontSize: 14, fontWeight: 'bold' },
  emptyText: { color: '#a1a1aa', textAlign: 'center', paddingVertical: 40, fontSize: 15 },
  
  // กำหนดให้ ScrollView เลื่อนได้โดยไม่ดัน Header กับ Footer ตกขอบ
  scrollContent: { flexShrink: 1 },
  
  cartItemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#09090b', padding: 12, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#27272a' },
  cartItemImage: { width: 50, height: 50, backgroundColor: '#ffffff', borderRadius: 10, padding: 4 },
  itemName: { color: '#f8fafc', fontSize: 14, fontWeight: '800', marginBottom: 4 },
  itemPrice: { color: '#06b6d4', fontSize: 13, fontWeight: '900' },
  
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { backgroundColor: '#27272a', width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { color: '#f8fafc', fontSize: 16, fontWeight: 'bold' },
  qtyText: { color: '#ffffff', fontSize: 15, fontWeight: '900', minWidth: 24, textAlign: 'center' },
  deleteBtn: { backgroundColor: 'rgba(239, 68, 68, 0.1)', width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ef4444', marginLeft: 4 },
  deleteBtnText: { fontSize: 14 },

  sectionContainer: { marginTop: 20 },
  sectionTitle: { color: '#a1a1aa', fontSize: 13, fontWeight: '900', marginBottom: 12, textTransform: 'uppercase' },
  optionRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  optionBtn: { flex: 1, minWidth: 120, backgroundColor: '#09090b', paddingVertical: 14, paddingHorizontal: 8, borderRadius: 16, borderWidth: 1, borderColor: '#27272a', alignItems: 'center' },
  optionBtnActive: { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06b6d4' },
  optionText: { color: '#71717a', fontSize: 12, fontWeight: '800' },
  optionTextActive: { color: '#06b6d4', fontWeight: '950' },

  paymentDetailBox: { marginTop: 14, backgroundColor: '#09090b', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#27272a' },
  inputLabel: { color: '#a1a1aa', fontSize: 12, fontWeight: '800', marginBottom: 8 },
  input: { backgroundColor: '#18181b', color: '#06b6d4', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#3f3f46', fontSize: 14, fontWeight: '800' },
  
  centerAlign: { alignItems: 'center', paddingVertical: 10 },
  qrCodeImage: { width: 160, height: 160, borderRadius: 12, backgroundColor: '#fff', padding: 10 },
  qrCodeText: { color: '#06b6d4', marginTop: 14, fontSize: 14, fontWeight: '950' },

  summaryContainer: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#27272a' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  summaryLabel: { color: '#a1a1aa', fontSize: 14, fontWeight: '800' },
  summarySubValue: { color: '#a1a1aa', fontSize: 14, fontWeight: '800' },
  summaryValue: { color: '#10b981', fontSize: 26, fontWeight: '950' },
  
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  clearBtn: { backgroundColor: 'transparent', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 50, alignItems: 'center', borderWidth: 1.5, borderColor: '#ef4444' },
  clearBtnText: { color: '#ef4444', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  checkoutBtn: { flex: 1, backgroundColor: '#10b981', paddingVertical: 16, borderRadius: 50, alignItems: 'center', shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
  checkoutBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '950', textTransform: 'uppercase', letterSpacing: 0.5 },
});