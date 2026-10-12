import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import AdminProductModal from '../components/AdminProductModal';
import CartModal from '../components/CartModal';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { API_BASE, DEFAULT_MONITOR_IMG } from '../constants/api';
import { styles } from '../constants/clusterStyles';

const STORAGE_KEY = 'ds_monitor_inventory_cache_v3';
const ORDERS_STORAGE_KEY = 'ds_monitor_orders_cache_v3';

interface ProductItem {
  id: number;
  product_name: string;
  tshirt_type: string;
  model: string;
  price: string | number;
  image_url?: string;
  total_stock?: number;
  stock?: number;
  priceTier?: 'Low' | 'Mid' | 'High';
  [key: string]: any;
}

interface CartItem {
  product: ProductItem;
  quantity: number;
}

const DEFAULT_FALLBACK: ProductItem[] = [
  { id: 66, product_name: 'awdawd', tshirt_type: 'awdawd', model: 'awd', price: 1111, stock: 5, image_url: DEFAULT_MONITOR_IMG },
  { id: 67, product_name: 'awd', tshirt_type: 'adasd', model: '111ds', price: 1237, stock: 20, image_url: DEFAULT_MONITOR_IMG }
];

const parsePrice = (val: any): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val.replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const clusterPricesLocally = (data: ProductItem[]): ProductItem[] => {
  if (!data || data.length === 0) return [];
  const sorted = [...data].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  const total = sorted.length;
  const lowCut = Math.round(total * 0.35);
  const midCut = Math.round(total * 0.75);
  const lowIds = new Set(sorted.slice(0, lowCut).map((x) => x.id));
  const midIds = new Set(sorted.slice(lowCut, midCut).map((x) => x.id));

  return data.map((item) => ({
    ...item,
    priceTier: lowIds.has(item.id) ? 'Low' : midIds.has(item.id) ? 'Mid' : 'High',
  }));
};

export default function ClusterScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const numColumns = width < 700 ? 1 : width < 1100 ? 2 : 3;
  
  const isMobile = width < 700;

  const { fullname, role } = useLocalSearchParams<{ fullname?: string; role?: string }>();
  const currentUserName = fullname || 'นายเกียรติสิริ จิตรชัยนานุกูล';
  const currentUserRole = role || 'User';
  const isAdmin = currentUserRole.toLowerCase().includes('admin');

  const [inventory, setInventory] = useState<ProductItem[]>(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { const p = JSON.parse(saved); if (Array.isArray(p) && p.length > 0) return clusterPricesLocally(p); } catch {}
      }
    }
    return clusterPricesLocally(DEFAULT_FALLBACK);
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartModalVisible, setCartModalVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [detailProduct, setDetailProduct] = useState<ProductItem | null>(null);

  const [successModalData, setSuccessModalData] = useState<{ visible: boolean; message: string; total: number } | null>(null);
  const [ordersModalVisible, setOrdersModalVisible] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [rankingModalVisible, setRankingModalVisible] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    product_name: '',
    tshirt_type: '',
    model: '',
    price: '',
    image_url: '',
    stock: '15',
  });

  const [flyingImage, setFlyingImage] = useState<string | null>(null);
  const flyAnim = useRef(new Animated.ValueXY({ x: width / 2 - 40, y: height / 2 - 40 })).current;
  const flyScale = useRef(new Animated.Value(1)).current;
  const flyOpacity = useRef(new Animated.Value(0)).current;

  const triggerFlyAnimation = (imgUrl: string) => {
    setFlyingImage(imgUrl);
    flyAnim.setValue({ x: width / 2 - 40, y: height / 2 });
    flyScale.setValue(1);
    flyOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(flyAnim, {
        toValue: { x: width - 100, y: 30 },
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(flyScale, {
        toValue: 0.2,
        duration: 700,
        useNativeDriver: false,
      }),
      Animated.timing(flyOpacity, {
        toValue: 0.3,
        duration: 700,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setFlyingImage(null);
    });
  };

  const saveCache = (items: ProductItem[]) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  };

  const fetchProducts = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(API_BASE, { signal: controller.signal });
      clearTimeout(timeoutId);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const clustered = clusterPricesLocally(json.data);
        setInventory(clustered);
        saveCache(clustered);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE.replace(/\/products$/, '')}/orders`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setOrderList(json.data);
      }
    } catch {}
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const getTopRankingProducts = () => {
    const salesMap: { [key: string]: { name: string; model: string; totalQty: number; revenue: number } } = {};
    orderList.forEach((ord) => {
      const key = ord.product_name;
      if (!salesMap[key]) {
        salesMap[key] = { name: ord.product_name, model: ord.model || '-', totalQty: 0, revenue: 0 };
      }
      salesMap[key].totalQty += Number(ord.quantity || 1);
      salesMap[key].revenue += Number(ord.total_price || 0);
    });

    return Object.values(salesMap).sort((a, b) => b.totalQty - a.totalQty);
  };

  const handleSave = async () => {
    const cleanPriceStr = String(formData.price).replace(/,/g, '').trim();
    if (!formData.product_name.trim() || !cleanPriceStr) {
      if (Platform.OS === 'web') alert('กรุณากรอกชื่อสินค้าและราคา');
      return;
    }

    const stockQty = Math.max(0, parseInt(String(formData.stock).replace(/,/g, ''), 10) || 0);
    const payload = {
      product_name: formData.product_name.trim(),
      tshirt_type: formData.tshirt_type.trim() || '27" IPS 180Hz',
      model: formData.model.trim() || 'DS-GEN',
      price: parseFloat(cleanPriceStr) || 0,
      image_url: formData.image_url.trim() || DEFAULT_MONITOR_IMG,
      stock: stockQty,
    };

    try {
      const targetUrl = editingId !== null ? `${API_BASE}/${editingId}` : API_BASE;
      const method = editingId !== null ? 'PUT' : 'POST';

      const res = await fetch(targetUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (Platform.OS === 'web') {
          alert(`เกิดข้อผิดพลาด (รหัส ${res.status}): รูปภาพอาจมีขนาดไฟล์ใหญ่เกินไป กรุณาลองใช้รูปอื่นครับ`);
        }
        return;
      }

      const json = await res.json();
      if (!json.success) {
        if (Platform.OS === 'web') alert(`ไม่สามารถบันทึกได้: ${json.error || 'เกิดข้อผิดพลาด'}`);
        return;
      }

      setModalVisible(false);
      await fetchProducts();
    } catch (err) {
      console.error('Save error:', err);
      if (Platform.OS === 'web') alert('ระบบขัดข้อง: เซิร์ฟเวอร์ออฟไลน์ หรือข้อมูลมีขนาดใหญ่เกินไป');
    }
  };

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;
    if (Platform.OS === 'web' && confirm(`ต้องการลบสินค้า ID #${id} หรือไม่?`)) {
      const filtered = clusterPricesLocally(inventory.filter((i) => i.id !== id));
      setInventory(filtered);
      saveCache(filtered);

      try {
        await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        await fetchProducts();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const addToCartWithQuantity = (product: ProductItem, qtyToAdd: number = 1) => {
    const availableStock = Number(product.stock ?? 15);

    if (availableStock <= 0) {
      if (Platform.OS === 'web') alert('สินค้านี้หมดสต็อกแล้ว');
      return;
    }

    const existingItem = cart.find((i) => i.product.id === product.id);
    const currentQtyInCart = existingItem ? existingItem.quantity : 0;

    if (currentQtyInCart + qtyToAdd > availableStock) {
      if (Platform.OS === 'web') {
        alert(`⚠️ ไม่สามารถหยิบเกินจำนวนสต็อกได้ (คงเหลือ ${availableStock} ชิ้น)`);
      }
      return;
    }

    const imgToFly = product.image_url && product.image_url.trim().length > 5 ? product.image_url.trim() : DEFAULT_MONITOR_IMG;
    triggerFlyAnimation(imgToFly);

    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === product.id);
      return ex
        ? prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + qtyToAdd } : i))
        : [...prev, { product, quantity: qtyToAdd }];
    });
  };

  const decreaseCartQty = (productId: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const totalAmount = cart.reduce((sum, item) => sum + parsePrice(item.product.price) * item.quantity, 0);

    try {
      for (const item of cart) {
        await fetch(`${API_BASE}/${item.product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            is_purchase: true,
            customer_name: currentUserName,
            quantity: item.quantity,
            product_name: item.product.product_name,
            model: item.product.model || 'DS-GEN',
            price: parsePrice(item.product.price),
          }),
        });
      }

      setCart([]);
      setCartModalVisible(false);

      setSuccessModalData({
        visible: true,
        message: `สั่งซื้อสำเร็จเรียบร้อย!\nผู้ซื้อ: ${currentUserName}`,
        total: totalAmount,
      });

      await fetchProducts();
      await fetchOrders();
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  const processed = inventory.filter((item) => {
    if (filterTier !== 'ALL' && item.priceTier !== filterTier) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return item.product_name.toLowerCase().includes(q) || item.model.toLowerCase().includes(q);
  });

  const totalCartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const totalCartPrice = cart.reduce((s, i) => s + parsePrice(i.product.price) * i.quantity, 0);
  const detailInCartQty = detailProduct
    ? cart.find((c) => c.product.id === detailProduct.id)?.quantity || 0
    : 0;

  const topRankings = getTopRankingProducts();

  return (
    <SafeAreaView style={styles.container}>
      {flyingImage && (
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 9999,
            left: flyAnim.x,
            top: flyAnim.y,
            transform: [{ scale: flyScale }],
            opacity: flyOpacity,
            width: 80,
            height: 80,
            backgroundColor: '#0f172a',
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#38bdf8',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#38bdf8',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
          }}
        >
          <Image source={{ uri: flyingImage }} style={{ width: 65, height: 65 }} resizeMode="contain" />
        </Animated.View>
      )}

      <View style={styles.navbar}>
        <View style={[styles.navContainer, isMobile && { justifyContent: 'center' }]}>
          <View style={[styles.navBrandBlock, isMobile && { justifyContent: 'center', width: '100%', marginBottom: 12 }]}>
            
            <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12 }, isMobile && { justifyContent: 'center' }]}>
              <View style={{ 
                backgroundColor: 'rgba(6, 182, 212, 0.1)', 
                paddingVertical: 6, 
                paddingHorizontal: 8, 
                borderRadius: 10, 
                borderWidth: 1, 
                borderColor: '#06b6d4', 
                shadowColor: '#06b6d4', 
                shadowOffset: { width: 0, height: 0 }, 
                shadowOpacity: 0.6, 
                shadowRadius: 8 
              }}>
                <Text style={{ fontSize: isMobile ? 18 : 22 }}>🖥️</Text>
              </View>
              
              <Text style={[styles.navTitle, isMobile && { fontSize: 18 }]}>
                <Text style={{ color: '#06b6d4', textShadowColor: '#06b6d4', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 }}>DS</Text> MONITOR CLUSTER
              </Text>
            </View>

          </View>

          {isMobile ? (
            // 🌟 เลย์เอาต์ใหม่สำหรับหน้าจอมือถือโดยเฉพาะ (ไม่กระทบคอมพิวเตอร์)
            <View style={{ width: '100%', gap: 12, alignItems: 'center' }}>
              {/* แถวที่ 1: โปรไฟล์ + ล็อคเอาท์ */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, width: '100%' }}>
                <View style={[styles.userProfileBadge, { flex: 1, paddingHorizontal: 12, paddingVertical: 10 }]}>
                  <Text style={[styles.userNameText, { fontSize: 11 }]}>👤 {currentUserName}</Text>
                  <Text style={[styles.userRoleText, { fontSize: 9 }]}>{currentUserRole}</Text>
                </View>
                <TouchableOpacity style={[styles.logoutBtn, { paddingHorizontal: 16, paddingVertical: 12 }]} onPress={() => router.replace('/')}>
                  <Text style={[styles.logoutBtnText, { fontSize: 11 }]}>ล็อคเอาท์</Text>
                </TouchableOpacity>
              </View>

              {/* แถวที่ 2: ปุ่มเครื่องมือต่างๆ */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
                <TouchableOpacity
                  style={[styles.cartBtn, { backgroundColor: '#f59e0b', shadowColor: '#f59e0b', paddingHorizontal: 14, paddingVertical: 10 }]}
                  onPress={() => {
                    fetchOrders();
                    setRankingModalVisible(true);
                  }}
                >
                  <Text style={[styles.cartBtnText, { fontSize: 11 }]}>🏆 ยอดฮิต</Text>
                </TouchableOpacity>

                {isAdmin && (
                  <>
                    <TouchableOpacity
                      style={[styles.cartBtn, { backgroundColor: '#6366f1', shadowColor: '#6366f1', paddingHorizontal: 14, paddingVertical: 10 }]}
                      onPress={() => {
                        fetchOrders();
                        setOrdersModalVisible(true);
                      }}
                    >
                      <Text style={[styles.cartBtnText, { fontSize: 11 }]}>📜 ประวัติ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.addBtn, { paddingHorizontal: 14, paddingVertical: 10 }]}
                      onPress={() => {
                        setEditingId(null);
                        setFormData({ product_name: '', tshirt_type: '', model: '', price: '', image_url: '', stock: '15' });
                        setModalVisible(true);
                      }}
                    >
                      <Text style={[styles.addBtnText, { fontSize: 11 }]}>+ เพิ่มสินค้า</Text>
                    </TouchableOpacity>
                  </>
                )}

                {!isAdmin && (
                  <TouchableOpacity style={[styles.cartBtn, { paddingHorizontal: 14, paddingVertical: 10 }]} onPress={() => setCartModalVisible(true)}>
                    <Text style={[styles.cartBtnText, { fontSize: 11 }]}>🛒 ตะกร้า ({totalCartCount})</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            // 🌟 เลย์เอาต์เดิมสำหรับหน้าจอคอมพิวเตอร์
            <View style={styles.userActionsBlock}>
              <View style={styles.userProfileBadge}>
                <Text style={styles.userNameText}>👤 {currentUserName}</Text>
                <Text style={styles.userRoleText}>{currentUserRole}</Text>
              </View>

              <TouchableOpacity
                style={[styles.cartBtn, { backgroundColor: '#f59e0b', shadowColor: '#f59e0b' }]}
                onPress={() => {
                  fetchOrders();
                  setRankingModalVisible(true);
                }}
              >
                <Text style={styles.cartBtnText}>🏆 สินค้ายอดฮิต</Text>
              </TouchableOpacity>

              {isAdmin && (
                <>
                  <TouchableOpacity
                    style={[styles.cartBtn, { backgroundColor: '#6366f1', shadowColor: '#6366f1' }]}
                    onPress={() => {
                      fetchOrders();
                      setOrdersModalVisible(true);
                    }}
                  >
                    <Text style={styles.cartBtnText}>📜 ประวัติคนซื้อ</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => {
                      setEditingId(null);
                      setFormData({ product_name: '', tshirt_type: '', model: '', price: '', image_url: '', stock: '15' });
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.addBtnText}>+ เพิ่มสินค้า</Text>
                  </TouchableOpacity>
                </>
              )}

              {!isAdmin && (
                <TouchableOpacity style={styles.cartBtn} onPress={() => setCartModalVisible(true)}>
                  <Text style={styles.cartBtnText}>🛒 ตะกร้า ({totalCartCount})</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
                <Text style={styles.logoutBtnText}>ล็อคเอาท์</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </View>

      <FlatList
        key={numColumns}
        numColumns={numColumns}
        data={processed}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={styles.fullScreenListContent}
        columnWrapperStyle={numColumns > 1 ? { gap: 16 } : undefined}
        
        ListHeaderComponent={
          <View style={[styles.topControlWrapper, { paddingHorizontal: 0, marginTop: 24, width: '100%' }]}>
            <View style={styles.searchBarWrapper}>
              <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
              <TextInput style={styles.searchInput} placeholder="ค้นหาสินค้าในคลัง..." placeholderTextColor="#64748b" value={searchQuery} onChangeText={setSearchQuery} />
            </View>

            <View style={styles.kpiContainer}>
              <TouchableOpacity style={[styles.kpiCard, filterTier === 'ALL' && styles.kpiActive]} onPress={() => setFilterTier('ALL')}>
                <Text style={styles.kpiLabel}>สินค้าทั้งหมด</Text>
                <Text style={styles.kpiValue}>{inventory.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.kpiCard, filterTier === 'Low' && styles.kpiActive]} onPress={() => setFilterTier('Low')}>
                <Text style={[styles.kpiLabel, { color: '#a1a1aa' }]} >Budget Tier</Text>
                <Text style={[styles.kpiValue, { color: '#10b981' }]}>{inventory.filter((i) => i.priceTier === 'Low').length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.kpiCard, filterTier === 'Mid' && styles.kpiActive]} onPress={() => setFilterTier('Mid')}>
                <Text style={[styles.kpiLabel, { color: '#a1a1aa' }]}>Mid-Range</Text>
                <Text style={[styles.kpiValue, { color: '#06b6d4' }]}>{inventory.filter((i) => i.priceTier === 'Mid').length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.kpiCard, filterTier === 'High' && styles.kpiActive]} onPress={() => setFilterTier('High')}>
                <Text style={[styles.kpiLabel, { color: '#a1a1aa' }]}>Flagship</Text>
                <Text style={[styles.kpiValue, { color: '#ec4899' }]}>{inventory.filter((i) => i.priceTier === 'High').length}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        ListEmptyComponent={
          loading ? (
            <View style={[styles.centerContainer, { marginTop: 60 }]}>
              <ActivityIndicator size="large" color="#06b6d4" />
              <Text style={styles.loadingText}>กำลังซิงค์ข้อมูลจาก phpMyAdmin...</Text>
            </View>
          ) : (
            <View style={[styles.centerContainer, { marginTop: 60 }]}>
              <Text style={{ color: '#71717a', fontSize: 16 }}>ไม่พบสินค้า</Text>
            </View>
          )
        }

        renderItem={({ item }) => {
          const dbStock = Number(item.stock ?? 15);
          return (
            <View style={{ flex: 1 / numColumns }}>
              <ProductCard
                item={item}
                isAdmin={isAdmin}
                stock={dbStock}
                onPressDetail={() => setDetailProduct(item)}
                onPressAddToCart={() => addToCartWithQuantity(item, 1)}
                onPressEdit={() => {
                  setEditingId(item.id);
                  setFormData({
                    product_name: item.product_name,
                    tshirt_type: item.tshirt_type,
                    model: item.model,
                    price: item.price.toString(),
                    image_url: item.image_url || '',
                    stock: dbStock.toString(),
                  });
                  setModalVisible(true);
                }}
                onPressDelete={() => handleDelete(item.id)}
              />
            </View>
          );
        }}
      />

      {/* Modal จัดอันดับสินค้ายอดฮิต (Top Ranking) */}
      <Modal visible={rankingModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.cartModalContent}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>🏆 จัดอันดับสินค้ายอดฮิต</Text>
              <TouchableOpacity onPress={() => setRankingModalVisible(false)} style={styles.closeModalBtn}>
                <Text style={styles.closeModalText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {topRankings.length === 0 ? (
                <Text style={{ color: '#a1a1aa', textAlign: 'center', paddingVertical: 30 }}>ยังไม่มีข้อมูลการขายสินค้า</Text>
              ) : (
                topRankings.map((rank, index) => {
                  const medalColors = ['#fbbf24', '#a1a1aa', '#b45309'];
                  const rankBadgeBg = medalColors[index] || '#27272a';
                  return (
                    <View key={index} style={[styles.cartItemRow, { alignItems: 'center' }]}>
                      <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: rankBadgeBg, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: '900', fontSize: 13 }}>#{index + 1}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: 14 }}>
                          {rank.name} ({rank.model})
                        </Text>
                        <Text style={{ color: '#a1a1aa', fontSize: 11, marginTop: 2 }}>
                          ยอดขายรวม: <Text style={{ color: '#06b6d4', fontWeight: 'bold' }}>{rank.totalQty} ชิ้น</Text>
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: '#10b981', fontWeight: '950', fontSize: 15 }}>
                          ${rank.revenue.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal แจ้งเตือนสั่งซื้อสำเร็จ */}
      <Modal visible={!!successModalData?.visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxWidth: 360, alignItems: 'center', paddingVertical: 24 }]}>
            <Text style={{ fontSize: 42, marginBottom: 8 }}>🎉</Text>
            <Text style={{ color: '#f8fafc', fontSize: 18, fontWeight: '900', marginBottom: 6 }}>สั่งซื้อสำเร็จ!</Text>
            <Text style={{ color: '#06b6d4', fontSize: 13, textAlign: 'center', marginBottom: 12, fontWeight: '700' }}>
              {successModalData?.message}
            </Text>
            <View style={{ backgroundColor: '#09090b', width: '100%', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#27272a' }}>
              <Text style={{ color: '#a1a1aa', fontSize: 11, fontWeight: '700' }}>ยอดชำระสุทธิ</Text>
              <Text style={{ color: '#10b981', fontSize: 22, fontWeight: '950', marginTop: 2 }}>
                ${successModalData?.total?.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={{ backgroundColor: '#8b5cf6', width: '100%', paddingVertical: 12, borderRadius: 50, alignItems: 'center' }}
              onPress={() => setSuccessModalData(null)}
            >
              <Text style={{ color: '#fff', fontWeight: '950', fontSize: 14 }}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal ประวัติคนซื้อสินค้า */}
      <Modal visible={ordersModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.cartModalContent}>
            <View style={styles.cartHeader}>
              <Text style={styles.cartTitle}>📜 ประวัติการสั่งซื้อ (DS_Orders)</Text>
              <TouchableOpacity onPress={() => setOrdersModalVisible(false)} style={styles.closeModalBtn}>
                <Text style={styles.closeModalText}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {orderList.length === 0 ? (
                <Text style={{ color: '#a1a1aa', textAlign: 'center', paddingVertical: 30 }}>ยังไม่มีประวัติการสั่งซื้อ</Text>
              ) : (
                orderList.map((ord) => (
                  <View key={ord.id} style={styles.cartItemRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#06b6d4', fontWeight: 'bold', fontSize: 14 }}>
                        👤 ผู้ซื้อ: {ord.customer_name}
                      </Text>
                      <Text style={{ color: '#f8fafc', fontSize: 13, marginTop: 2 }}>
                        🖥️ สินค้า: {ord.product_name} ({ord.model})
                      </Text>
                      <Text style={{ color: '#a1a1aa', fontSize: 11, marginTop: 2 }}>
                        🕒 เวลา: {ord.purchased_at}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ color: '#fbbf24', fontWeight: '900', fontSize: 14 }}>
                        ซื้อไป {ord.quantity} ชิ้น
                      </Text>
                      <Text style={{ color: '#10b981', fontWeight: '900', fontSize: 15, marginTop: 2 }}>
                        ${parseFloat(ord.total_price).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <ProductDetailModal
        visible={!!detailProduct}
        product={detailProduct}
        stock={detailProduct ? Number(detailProduct.stock ?? 15) : 0}
        inCartQty={detailInCartQty}
        isAdmin={isAdmin}
        onClose={() => setDetailProduct(null)}
        onConfirmAddToCart={(product, qty) => addToCartWithQuantity(product, qty)}
      />

      <CartModal
        visible={cartModalVisible}
        cart={cart}
        totalCartCount={totalCartCount}
        totalCartPrice={totalCartPrice}
        onClose={() => setCartModalVisible(false)}
        onIncreaseQty={(product) => addToCartWithQuantity(product, 1)}
        onDecreaseQty={decreaseCartQty}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />

      <AdminProductModal
        visible={modalVisible}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}