import { useState } from 'react';
import { Alert } from 'react-native';
import { MOCK_PRODUCTS, Product } from '../constants/products';
import { DEFAULT_IMAGE } from '../constants/theme';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveProduct = (
    values: { name: string; price: string; image: string },
    editingId: string | null
  ) => {
    if (!values.name || !values.price) {
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกชื่อสินค้าและราคา');
      return false;
    }

    const trimmedImage = values.image.trim();

    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? {
        ...p,
        name: values.name,
        price: Number(values.price),
        image: trimmedImage !== '' ? trimmedImage : p.image,
      } : p));
    } else {
      setProducts(prev => [...prev, {
        id: Date.now().toString(),
        name: values.name,
        price: Number(values.price),
        image: trimmedImage !== '' ? trimmedImage : DEFAULT_IMAGE,
      }]);
    }
    return true;
  };

  const deleteProduct = (id: string, name: string) => {
    Alert.alert('ลบสินค้า', `ต้องการลบ "${name}" ใช่หรือไม่`, [
      { text: 'ยกเลิก', style: 'cancel' },
      { text: 'ลบ', style: 'destructive', onPress: () => setProducts(prev => prev.filter(p => p.id !== id)) },
    ]);
  };

  return { products: filteredProducts, searchQuery, setSearchQuery, saveProduct, deleteProduct };
}