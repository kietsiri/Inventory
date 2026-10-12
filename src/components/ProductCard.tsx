import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DEFAULT_MONITOR_IMG } from '../constants/api';
import { styles } from '../constants/clusterStyles';

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

interface ProductCardProps {
  item: ProductItem;
  isAdmin: boolean;
  stock: number;
  onPressDetail: () => void;
  onPressAddToCart: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

const parsePrice = (val: any): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const parsed = parseFloat(val.replace(/[^0-9.-]+/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export default function ProductCard({
  item,
  isAdmin,
  stock,
  onPressDetail,
  onPressAddToCart,
  onPressEdit,
  onPressDelete,
}: ProductCardProps) {
  const imgSource =
    item.image_url && item.image_url.trim().length > 5
      ? { uri: item.image_url.trim() }
      : { uri: DEFAULT_MONITOR_IMG };

  const isOutOfStock = stock <= 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPressDetail} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        <Image source={imgSource} style={styles.productImage} resizeMode="contain" />
        <View style={styles.badgeTopLeft}>
          <Text style={styles.badgeText}>🔥 GAMING</Text>
        </View>
        <View style={[styles.badgeTopRight, { backgroundColor: isOutOfStock ? '#ef4444' : '#10b981' }]}>
          <Text style={styles.badgeStockText}>
            {isOutOfStock ? 'หมด' : `เหลือ ${stock} ชิ้น`}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.product_name}
        </Text>
        <Text style={styles.specText} numberOfLines={1}>
          🖥️ {item.tshirt_type || '27" IPS 180Hz'}
        </Text>
        <Text style={styles.modelText} numberOfLines={1}>
          รหัสรุ่น: {item.model}
        </Text>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.priceLabel}>ราคาจำหน่าย</Text>
            <Text style={styles.priceValue}>${parsePrice(item.price).toFixed(2)}</Text>
          </View>

          {isAdmin ? (
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <TouchableOpacity style={styles.editBtn} onPress={onPressEdit}>
                <Text style={styles.editBtnText}>✏️ แก้ไข</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={onPressDelete}>
                <Text style={styles.deleteBtnText}>🗑️ ลบ</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.buyBtn} onPress={onPressDetail}>
              <Text style={styles.buyBtnText}>🔍 ดูสินค้า</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}