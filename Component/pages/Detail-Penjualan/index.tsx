import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const SalesScreen = () => {
  const items: Item[] = [
    {id: '1', name: 'Kaos Kaki', price: 10000, quantity: 10},
    {id: '2', name: 'Kaos', price: 10000, quantity: 10},
  ];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Share Dokumen',
        message: 'Berikut dokumen penjualan.',
        url: 'path/to/document.pdf',
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const handlePrint = async () => {
  //   try {
  //     await RNPrint.print({ filePath: 'path/to/document.pdf' });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const renderItem = ({item}: {item: Item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          Rp {item.price.toLocaleString()} × {item.quantity}
        </Text>
      </View>
      <Text style={styles.itemTotal}>
        Rp {(item.price * item.quantity).toLocaleString()}
      </Text>
      <TouchableOpacity>
        <Icon name="trash-bin" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Penjualan</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleShare}>
            <Icon name="share-social" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 16}}>
            <Icon name="print" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Detail Penjualan */}
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>Tanggal</Text>
        <Text style={styles.detailValue}>24 Januari 2024</Text>
        <Text style={styles.detailText}>No</Text>
        <Text style={styles.detailValue}>S123</Text>
        <Text style={styles.detailText}>Nama Pelanggan</Text>
        <Text style={styles.detailValue}>MUHAMMAD D LUFFY</Text>
      </View>

      {/* Daftar Barang */}
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.itemList}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalValue}>Rp {total.toLocaleString()}</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f8f8'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f44336',
    padding: 16,
  },
  headerTitle: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  headerIcons: {flexDirection: 'row'},
  detailContainer: {padding: 16, backgroundColor: '#fff', marginVertical: 8},
  detailText: {fontSize: 14, color: '#555'},
  detailValue: {fontSize: 16, fontWeight: 'bold', marginBottom: 8},
  itemList: {padding: 16},
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  itemDetails: {flex: 1},
  itemName: {fontSize: 16, fontWeight: 'bold'},
  itemPrice: {fontSize: 14, color: '#555'},
  itemTotal: {fontSize: 16, fontWeight: 'bold', marginHorizontal: 12},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  totalText: {fontSize: 16, fontWeight: 'bold'},
  totalValue: {fontSize: 16, fontWeight: 'bold', color: '#f44336'},
  saveButton: {backgroundColor: '#f44336', padding: 12, borderRadius: 8},
  saveButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default SalesScreen;
