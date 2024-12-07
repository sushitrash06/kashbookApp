import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    cost: number; // Make sure cost is a number here
  };

  const initialProducts: Product[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Produk ${index + 1}`,
    category: ['elektronik', 'pakaian', 'makanan', 'lainnya'][index % 4],
    price: Math.floor(Math.random() * 90000 + 10000),
    image: `https://via.placeholder.com/150?text=Produk+${index + 1}`,
    cost: Math.floor(Math.random() * 50000 + 5000), // Default cost value
  }));
  

export const ProductGrid = () => {
  const bottomSheetRef = useRef<BottomSheet>(null); // Ref untuk Bottom Sheet
  const snapPoints = useMemo(() => ['50%', '90%'], []); // Titik snapping Bottom Sheet

  // State untuk produk, filter, dan pencarian
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Form produk baru
  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    category: 'elektronik',
    unit: '',
    cost: '',
    price: '',
  });

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tambahkan produk baru
  const handleAddProduct = () => {
    if (
      newProduct.code &&
      newProduct.name &&
      newProduct.unit &&
      newProduct.price
    ) {
      setProducts([
        ...products,
        {
          ...newProduct,
          id: products.length + 1,
          price: parseFloat(newProduct.price),  // Ensure price is a number
          cost: parseFloat(newProduct.cost),    // Ensure cost is a number
          image: `https://via.placeholder.com/150?text=Produk+${products.length + 1}`,
        },
      ]);
      setNewProduct({
        code: '',
        name: '',
        category: 'elektronik',
        unit: '',
        cost: '',
        price: '',
      });
      bottomSheetRef.current?.close(); // Close Bottom Sheet
    } else {
      console.log('Mohon lengkapi semua field!');
    }
  };
  

  // Hapus produk
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Edit produk
  const handleEditProduct = (product: Product) => {
    setNewProduct({
      code: product.id.toString(),
      name: product.name,
      category: product.category,
      unit: '',
      cost: product.cost?.toString() || '',
      price: product.price.toString(),
    });
    bottomSheetRef.current?.expand(); // Open Bottom Sheet
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari Produk..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Kategori */}
      <View style={styles.filterContainer}>
        {['elektronik', 'pakaian', 'makanan', 'lainnya'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }>
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === category && styles.filterButtonTextActive,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid Produk */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Rp{item.price}</Text>

            {/* Edit and Delete Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditProduct(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteProduct(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.gridContainer}
      />

      {/* Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Tambah/Edit Produk</Text>

          <TextInput
            style={styles.input}
            placeholder="Kode Produk"
            value={newProduct.code}
            onChangeText={(text) =>
              setNewProduct((prev) => ({ ...prev, code: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Nama Produk"
            value={newProduct.name}
            onChangeText={(text) =>
              setNewProduct((prev) => ({ ...prev, name: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Kategori (elektronik, pakaian, makanan, lainnya)"
            value={newProduct.category}
            onChangeText={(text) =>
              setNewProduct((prev) => ({ ...prev, category: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Satuan"
            value={newProduct.unit}
            onChangeText={(text) =>
              setNewProduct((prev) => ({ ...prev, unit: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Modal"
            keyboardType="numeric"
            value={newProduct.cost}
            onChangeText={(text) =>
              setNewProduct((prev) => ({ ...prev, cost: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Harga Jual"
            keyboardType="numeric"
            value={newProduct.price}
            onChangeText={(text) =>
              setNewProduct((prev) => ({ ...prev, price: text }))
            }
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Text style={styles.addButtonText}>Tambah Produk</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Tombol Tambah */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => bottomSheetRef.current?.expand()}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD4F4F',
  },
  searchBar: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 16,
    fontSize: 16,
    color: '#333',
    elevation: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#FEE1E1',
  },
  filterButtonText: {
    color: '#CD4F4F',
    fontWeight: 'bold',
  },
  filterButtonTextActive: {
    color: '#FFF',
  },
  gridContainer: {
    padding: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    flex: 1,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    elevation: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  productName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  productPrice: {
    color: '#CD4F4F',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFB74D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CD4F4F',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
    elevation: 1,
  },
  addButton: {
    backgroundColor: '#CD4F4F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  floatingButton: {
    backgroundColor: '#CD4F4F',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
