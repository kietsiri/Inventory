import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#09090b' },
  
  navbar: { backgroundColor: 'rgba(9, 9, 11, 0.95)', borderBottomWidth: 1, borderBottomColor: '#27272a', paddingVertical: 14, paddingHorizontal: 16 },
  navContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1440, alignSelf: 'center', width: '100%', flexWrap: 'wrap', gap: 12 },
  navBrandBlock: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  
  navTitle: { color: '#ffffff', fontSize: 20, fontWeight: '950', letterSpacing: 0.5 },
  navSub: { color: '#8b5cf6', fontSize: 11, fontWeight: '900', marginTop: 2, letterSpacing: 1, textTransform: 'uppercase' },

  userActionsBlock: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  userProfileBadge: { backgroundColor: '#18181b', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: '#27272a', flexDirection: 'column', alignItems: 'center' },
  userNameText: { color: '#f8fafc', fontSize: 12, fontWeight: '900' },
  userRoleText: { color: '#06b6d4', fontSize: 10, fontWeight: '800', marginTop: 2, textTransform: 'uppercase' },

  cartBtn: { backgroundColor: '#06b6d4', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 50, shadowColor: '#06b6d4', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  cartBtnText: { color: '#000000', fontSize: 12, fontWeight: '950', textTransform: 'uppercase' },
  addBtn: { backgroundColor: '#10b981', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 50, shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  addBtnText: { color: '#ffffff', fontSize: 12, fontWeight: '950', textTransform: 'uppercase' },
  
  logoutBtn: { backgroundColor: 'transparent', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 50, borderWidth: 1.5, borderColor: '#ef4444' },
  logoutBtnText: { color: '#ef4444', fontSize: 12, fontWeight: '950', textTransform: 'uppercase' },

  topControlWrapper: { maxWidth: 1440, width: '100%', alignSelf: 'center', paddingHorizontal: 16, marginTop: 20, marginBottom: 16 },
  searchBarWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', borderRadius: 50, borderWidth: 1, borderColor: '#3f3f46', paddingHorizontal: 20, height: 50, marginBottom: 16 },
  searchInput: { flex: 1, color: '#f8fafc', fontSize: 14, fontWeight: '600' },

  // ปรับ kpiContainer และ kpiCard ให้รองรับมือถือแบบ 2x2 กล่อง และ PC 4 กล่อง
  kpiContainer: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  kpiCard: { flex: 1, minWidth: 140, backgroundColor: '#18181b', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: '#27272a' },
  kpiActive: { borderColor: '#8b5cf6', backgroundColor: '#2e1065' },
  kpiLabel: { color: '#a1a1aa', fontSize: 11, fontWeight: '800', marginBottom: 6, textTransform: 'uppercase' },
  kpiValue: { color: '#ffffff', fontSize: 24, fontWeight: '950' },

  fullScreenListContent: { paddingHorizontal: 16, paddingBottom: 60, maxWidth: 1440, alignSelf: 'center', width: '100%' },

  card: { backgroundColor: '#18181b', borderRadius: 24, borderWidth: 1, borderColor: '#27272a', overflow: 'hidden', marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 15, elevation: 8 },
  
  imageContainer: { width: '100%', height: 220, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  productImage: { width: '85%', height: '85%' },
  
  badgeTopLeft: { position: 'absolute', top: 14, left: 14, backgroundColor: '#ec4899', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50 },
  badgeText: { color: '#ffffff', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  badgeTopRight: { position: 'absolute', top: 14, right: 14, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 50, backgroundColor: '#10b981' },
  badgeStockText: { color: '#ffffff', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },

  cardBody: { padding: 16 },
  productName: { color: '#f8fafc', fontSize: 15, fontWeight: '900', marginBottom: 6, letterSpacing: 0.3 },
  specText: { color: '#a1a1aa', fontSize: 12, marginBottom: 4, fontWeight: '500' },
  modelText: { color: '#71717a', fontSize: 11, marginBottom: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#27272a', paddingTop: 16 },
  
  priceLabel: { color: '#71717a', fontSize: 10, fontWeight: '800', marginBottom: 4, textTransform: 'uppercase' },
  priceValue: { color: '#06b6d4', fontSize: 20, fontWeight: '950' }, 

  buyBtn: { backgroundColor: '#8b5cf6', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 50, shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
  buyBtnText: { color: '#ffffff', fontSize: 12, fontWeight: '950', letterSpacing: 1, textTransform: 'uppercase' },

  editBtn: { backgroundColor: '#27272a', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50 },
  editBtnText: { color: '#f8fafc', fontSize: 11, fontWeight: '900' },
  deleteBtn: { backgroundColor: 'transparent', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 50, borderWidth: 1, borderColor: '#ef4444' },
  deleteBtnText: { color: '#ef4444', fontSize: 11, fontWeight: '900' },

  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#a1a1aa', marginTop: 16, fontSize: 14, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(9, 9, 11, 0.9)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalContent: { backgroundColor: '#18181b', width: '100%', maxWidth: 460, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#27272a', shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 15 },
  
  previewImageBox: { width: '100%', height: 180, backgroundColor: '#ffffff', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16, overflow: 'hidden' },
  pickFileBtn: { backgroundColor: '#27272a', padding: 14, borderRadius: 50, alignItems: 'center', marginBottom: 16 },
  pickFileBtnText: { color: '#06b6d4', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  input: { backgroundColor: '#09090b', color: '#f8fafc', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#27272a', marginBottom: 16, fontSize: 14 },
  stockEditorBox: { backgroundColor: '#09090b', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#27272a', marginTop: 4 },
  stockEditorLabel: { color: '#a1a1aa', fontSize: 13, fontWeight: '900', marginBottom: 12, textTransform: 'uppercase' },
  stockControlRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stockQuickBtn: { backgroundColor: '#27272a', width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  stockQuickBtnHighlight: { backgroundColor: '#8b5cf6' },
  stockQuickBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  stockInput: { flex: 1, backgroundColor: '#18181b', color: '#06b6d4', height: 44, borderRadius: 12, textAlign: 'center', fontSize: 18, fontWeight: '950', borderWidth: 1, borderColor: '#27272a' },
  detailBackBtn: { backgroundColor: '#3f3f46', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 50 },
  detailBackBtnText: { color: '#ffffff', fontSize: 13, fontWeight: '900', textTransform: 'uppercase' },
  
  cartModalContent: { backgroundColor: '#18181b', width: '100%', maxWidth: 500, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#27272a', shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 15 },
  cartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  cartTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '950' },
  closeModalBtn: { backgroundColor: '#27272a', width: 36, height: 36, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  closeModalText: { color: '#a1a1aa', fontSize: 14, fontWeight: 'bold' },
  cartItemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#09090b', padding: 14, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#27272a' },
  cartItemImage: { width: 60, height: 60, backgroundColor: '#ffffff', borderRadius: 12, padding: 4 },
  qtyBtn: { backgroundColor: '#27272a', width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { color: '#f8fafc', fontSize: 16, fontWeight: 'bold' },
  cartFooter: { marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#27272a' },
  clearCartBtn: { backgroundColor: 'transparent', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 50, alignItems: 'center', borderWidth: 1, borderColor: '#ef4444' },
  clearCartText: { color: '#ef4444', fontSize: 14, fontWeight: '900', textTransform: 'uppercase' },
  checkoutBtn: { flex: 1, backgroundColor: '#10b981', paddingVertical: 16, borderRadius: 50, alignItems: 'center', shadowColor: '#10b981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
  checkoutBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '950', textTransform: 'uppercase', letterSpacing: 1 },
});