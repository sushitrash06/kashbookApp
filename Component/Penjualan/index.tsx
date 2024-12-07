import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

interface Item {
  namaBarang: string;
  hargaSatuan: number;
  jumlah: number;
  totalHarga: number;
}

const PenjualanScreen: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [namaBarang, setNamaBarang] = useState('');
  const [hargaSatuan, setHargaSatuan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('24 Januari 2024');
  const [noTransaksi, setNoTransaksi] = useState('S123');
  const [namaPelanggan, setNamaPelanggan] = useState('MUHAMMAD D LUFFY');
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Handle adding new item to the list
  const addItem = () => {
    const item: Item = {
      namaBarang,
      hargaSatuan: parseInt(hargaSatuan, 10),
      jumlah: parseInt(jumlah, 10),
      totalHarga: parseInt(hargaSatuan, 10) * parseInt(jumlah, 10),
    };
    setItems([...items, item]);
    bottomSheetRef.current?.close(); // Close bottom sheet after adding item
  };

  // Calculate the total price of all items
  const totalAmount = items.reduce((total, item) => total + item.totalHarga, 0);

  // Handle deleting an item from the list
  const deleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tanggal</Text>
        <Text style={styles.headerText}>{tanggal}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>No</Text>
        <Text style={styles.headerText}>{noTransaksi}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nama Pelanggan</Text>
        <Text style={styles.headerText}>{namaPelanggan}</Text>
      </View>

      {/* Items List */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.namaBarang}</Text>
            <Text style={styles.itemDetails}>
              Rp {item.hargaSatuan.toLocaleString()} × {item.jumlah}
            </Text>
            <Text style={styles.itemTotal}>Rp {item.totalHarga.toLocaleString()}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(index)}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>Rp {totalAmount.toLocaleString()}</Text>
      </View>

      {/* Add Item Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => bottomSheetRef.current?.expand()}>
        <Text style={styles.addButtonText}>+ Tambah Barang</Text>
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>

      {/* Bottom Sheet for Adding Item */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[300, 0]}
        index={1}
        enablePanDownToClose={true}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Tambah Barang</Text>

          <TextInput
            style={styles.input}
            placeholder="Nama Barang"
            value={namaBarang}
            onChangeText={setNamaBarang}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga Satuan"
            keyboardType="numeric"
            value={hargaSatuan}
            onChangeText={setHargaSatuan}
          />
          <TextInput
            style={styles.input}
            placeholder="Jumlah"
            keyboardType="numeric"
            value={jumlah}
            onChangeText={setJumlah}
          />

          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Tambah</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    color: 'gray',
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemDetails: {
    color: 'gray',
  },
  itemTotal: {
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#8E44AD',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetContent: {
    padding: 20,
    height: '100%',
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default PenjualanScreen;
