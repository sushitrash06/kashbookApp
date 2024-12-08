import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import ProfitLossChart from '../../section/chart';
import { Image } from 'react-native';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';

const MainScreen = ({ navigation }: { navigation: any }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const handleDateButtonPress = () => {
    setOpenDatePicker(true);
  };

  const handleNavigateToTransaction = () => {
    navigation.navigate('Transaction'); // Pastikan "Transaction" sesuai dengan nama yang Anda definisikan dalam navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>LAPORAN LABA RUGI</Text>
      <View style={styles.subContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ProfitLossChart />
          <TouchableOpacity style={styles.menu} onPress={handleNavigateToTransaction}>
            <Image
              style={{ marginTop: 5 }}
              source={require('../../../assets/icon_transaction.png')}
            />
            <Text
              style={{ marginHorizontal: 10, fontWeight: '900', color: '#681313' }}>
              History Transaksi
            </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={handleDateButtonPress}>
              <View style={styles.dateButtonContent}>
                <Image
                  source={require('../../../assets/calendar.png')}
                  style={styles.icon}
                />
                <Text style={styles.dateButtonText}>
                  {dayjs(selectedDate).format('DD MMMM YYYY')}
                </Text>
              </View>
            </TouchableOpacity>

            {openDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  if (date) {
                    setSelectedDate(date);
                  } else {
                    setSelectedDate(new Date());
                  }
                  setOpenDatePicker(false);
                }}
                style={{ marginBottom: 10, zIndex: 10 }}
              />
            )}
          </View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Penjualan Nota</Text>
              <Text style={styles.rowValue}>Rp1,503,939</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Rekap</Text>
              <Text style={styles.rowValue}>Rp1,503,939</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Margin</Text>
              <Text style={styles.rowValue}>Rp1,503,939</Text>
            </View>
            <View style={styles.rowHighlighted}>
              <Text style={styles.rowTitle}>Laba / Rugi Operasi</Text>
              <Text style={styles.rowValue}>Rp1,503,939</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Biaya</Text>
              <Text style={styles.rowValue}>Rp1,503,939</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>Pendapatan</Text>
              <Text style={styles.rowValue}>Rp1,503,939</Text>
            </View>
            <View style={styles.rowHighlighted}>
              <Text style={styles.rowTitle}>Laba / Rugi</Text>
              <Text style={styles.rowValue}>Rp1,503,939</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#F4F4F4',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F86A6A',
  },
  subContainer: {
    backgroundColor: '#FFFF',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    flex: 1,
    paddingTop: 10,
  },
  headerTitle: {
    margin: 20,
    marginTop: 20,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  dateButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFEAEA',
    maxWidth: 200,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  dateButtonContent: {
    textAlign: 'center',
    margin: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  rowHighlighted: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
  },
  rowTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
  },
  rowValue: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
    textAlign: 'right',
  },
});

export default MainScreen;
