import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../constants/products';
import { colors, DEFAULT_IMAGE } from '../constants/theme';

type Props = {
  item: Product;
  onEdit: (item: Product) => void;
  onDelete: (id: string, name: string) => void;
};

export default function ProductRow({ item, onEdit, onDelete }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const displayUri = (imageFailed || !item.image) ? DEFAULT_IMAGE : item.image;

  return (
    <View style={styles.row}>
      <Image
        source={{ uri: displayUri }}
        style={styles.image}
        onError={() => setImageFailed(true)}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{Number(item.price).toLocaleString()} บาท</Text>
      </View>
      <View style={styles.actionBtns}>
        <TouchableOpacity style={styles.btnEdit} onPress={() => onEdit(item)}>
          <Text style={styles.btnEditText}>แก้ไข</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDelete} onPress={() => onDelete(item.id, item.name)}>
          <Text style={styles.btnDeleteText}>ลบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  image: { width: 56, height: 56, borderRadius: 9, marginRight: 14, backgroundColor: colors.accentSoft },
  info: { flex: 1 },
  name: { fontSize: 14.5, fontWeight: '600', color: colors.ink, marginBottom: 3 },
  price: { fontSize: 13.5, color: colors.accent, fontWeight: '600', letterSpacing: 0.2 },
  actionBtns: { flexDirection: 'row', gap: 8 },
  btnEdit: { backgroundColor: colors.editSoft, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 7 },
  btnEditText: { fontSize: 12, fontWeight: '600', color: colors.editInk },
  btnDelete: { backgroundColor: colors.dangerSoft, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 7 },
  btnDeleteText: { fontSize: 12, fontWeight: '600', color: colors.danger },
});