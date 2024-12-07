import React, { useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TextInput } from 'react-native';

interface Bag {
  kode: string;
  nama: string;
  kategori: string;
  harga: string;
  imageUrl: string;
}

const dummyData: Bag[] = Array.from({ length: 40 }, (_, index) => ({
  kode: `BAG00${index + 1}`,
  nama: `Bag Exclusive ${index + 1}`,
  kategori: 'Fashion',
  harga: 'Rp 500,000',
  imageUrl: 'https://picsum.photos/200', // Placeholder image URL
}));

const MarketScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = dummyData.filter(item => 
      item.nama.toLowerCase().includes(text.toLowerCase()) ||
      item.kategori.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <View style={styles.container}>
       <Text style={styles.headerTitle}>Market</Text>
       <View style={styles.subContainer}>
       <TextInput
        style={styles.searchInput}
        placeholder="Cari Produk"
        value={searchText}
        onChangeText={handleSearch}
      />
       <FlatList
      data={filteredData}
      style={{marginTop: 20}}
      numColumns={2} // Sets the number of columns for the grid
      keyExtractor={(item) => item.kode}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.nama}</Text>
            <Text style={styles.kategori}>{item.kategori}</Text>
            <Text style={styles.harga}>{item.harga}</Text>
          </View>
        </View>
      )}
    />
       </View>

    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F86A6A',
  },
  subContainer: {
    backgroundColor: '#FFFF',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flex: 1, // Make sure the sub-container takes all the available space
    paddingTop: 10,
  },
  headerTitle: {
    margin: 20,
    marginTop: 20,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5, // Add horizontal margin for spacing between columns
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16,
    marginTop: 50,
    marginHorizontal: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  kategori: {
    fontSize: 12,
    color: 'gray',
  },
  harga: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4caf50',
  },
});

export default MarketScreen;
