import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet'; // Importing gorhom BottomSheet
import { useRef } from 'react';

interface Transaction {
  namaTransaksi: string;
  tanggal: string;
  namaOrang: string;
  jenisTransaksi: 'Kredit' | 'Debit';
  amount: number;
}

const dummyTransactions: Transaction[] = [
  { namaTransaksi: 'Biaya Pembuatan', tanggal: '25/06/2024', namaOrang: 'Supriyati', jenisTransaksi: 'Kredit', amount: 100000 },
  { namaTransaksi: 'Biaya Pembuatan', tanggal: '25/06/2024', namaOrang: 'Supriyati', jenisTransaksi: 'Kredit', amount: 100000 },
  { namaTransaksi: 'Biaya Pembuatan', tanggal: '25/06/2024', namaOrang: 'Supriyati', jenisTransaksi: 'Kredit', amount: 100000 },
  { namaTransaksi: 'Biaya Pembuatan', tanggal: '25/06/2024', namaOrang: 'Supriyati', jenisTransaksi: 'Debit', amount: 100000 },
  { namaTransaksi: 'Biaya Pembuatan', tanggal: '25/06/2024', namaOrang: 'Supriyati', jenisTransaksi: 'Debit', amount: 10000 },
];

const TransactionScreen: React.FC = () => {
  const [transactions, setTransactions] = useState(dummyTransactions);
  const [transactionName, setTransactionName] = useState('');
  const [personName, setPersonName] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionType, setTransactionType] = useState<'Kredit' | 'Debit'>('Debit');
  const [searchText, setSearchText] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Function to handle adding a new transaction
  const addTransaction = () => {
    const newTransaction: Transaction = {
      namaTransaksi: transactionName,
      tanggal: transactionDate,
      namaOrang: personName,
      jenisTransaksi: transactionType,
      amount: transactionType === 'Kredit' ? 100000 : -10000,
    };
    setTransactions([newTransaction, ...transactions]); // Add new transaction at the top
    bottomSheetRef.current?.close(); // Close the bottom sheet after adding
  };

  // Filter transactions based on the search text
  const filteredTransactions = transactions.filter(item =>
    item.namaTransaksi.toLowerCase().includes(searchText.toLowerCase()) ||
    item.namaOrang.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calculate total amount
  const totalAmount = transactions.reduce((total, item) => total + item.amount, 0);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari Transaksi"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.transactionName}>{item.namaTransaksi}</Text>
            <Text style={styles.details}>{item.tanggal}</Text>
            <Text style={styles.details}>{item.namaOrang}</Text>
            <Text style={[styles.amount, item.jenisTransaksi === 'Kredit' ? styles.kredit : styles.debit]}>
              {item.jenisTransaksi === 'Kredit' ? '+ Rp ' : '- Rp '}
              {item.amount.toLocaleString()}
            </Text>
          </View>
        )}
      />

      {/* Add Transaction Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => bottomSheetRef.current?.expand()}>
        <Text style={styles.addButtonText}>+ Tambah Transaksi</Text>
      </TouchableOpacity>

      {/* Total Amount */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>Rp {totalAmount.toLocaleString()}</Text>
      </View>

      {/* Bottom Sheet for Adding Transaction */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[450, 0]}
        index={1} // Initial snap position
        enablePanDownToClose={true}
        style={styles.bottomSheet}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Add Transaction</Text>

          <TextInput
            style={styles.input}
            placeholder="Nama Transaksi"
            value={transactionName}
            onChangeText={setTransactionName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nama Orang"
            value={personName}
            onChangeText={setPersonName}
          />
          <TextInput
            style={styles.input}
            placeholder="Tanggal (YYYY-MM-DD)"
            value={transactionDate}
            onChangeText={setTransactionDate}
          />

          {/* Transaction Type Selector */}
          <View style={styles.selectorContainer}>
            <TouchableOpacity onPress={() => setTransactionType('Kredit')}>
              <Text style={[styles.selector, transactionType === 'Kredit' && styles.selected]}>Kredit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTransactionType('Debit')}>
              <Text style={[styles.selector, transactionType === 'Debit' && styles.selected]}>Debit</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={addTransaction}>
            <Text style={styles.saveButtonText}>Save Transaction</Text>
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  transactionName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  kredit: {
    color: 'green',
  },
  debit: {
    color: 'red',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  bottomSheet: {
    backgroundColor: 'white',
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
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  selector: {
    fontSize: 16,
    padding: 10,
  },
  selected: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionScreen;
