import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import {RekapData} from '../../dummy';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const RekapScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const filteredData = RekapData.filter(item => {
    const itemDate = new Date(item.tanggal); // Assuming `tanggal` is a string date
    const isDateMatch = selectedDate
      ? itemDate.toLocaleDateString() === selectedDate.toLocaleDateString() // Compare the date parts
      : true; // If no date is selected, include all data
    return isDateMatch;
  });


  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  
  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderTableRow = ({item}: any) => (
    <View style={styles.row}>
      <Text style={[styles.cell,{maxWidth: 20}]}>{item.no}</Text>
      <Text style={styles.cell}>{item.tanggal}</Text>
      <Text style={styles.cell}>{item.produk}</Text>
      <Text style={styles.cell}>{item.hargaJual.toLocaleString('id-ID')}</Text>
      <Text style={styles.cell}>{item.hargaModal.toLocaleString('id-ID')}</Text>
      <Text style={styles.cell}>{item.laba.toLocaleString('id-ID')}</Text>
    </View>
  );

  const totalHargaJual = filteredData.reduce(
    (total, item) => total + item.hargaJual,
    0,
  );
  const totalHargaModal = filteredData.reduce(
    (total, item) => total + item.hargaModal,
    0,
  );
  const totalLaba = filteredData.reduce((total, item) => total + item.laba, 0);
  const handleDateButtonPress = () => {
    console.log('Button pressed, opening date picker');
    setOpenDatePicker(true);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={handleDateButtonPress}>
        <View style={styles.dateButtonContent}>
          <Image
            source={require('../../../assets/calendar.png')}
            style={styles.icon}
          />
          <Text style={styles.dateButtonText}>{dayjs(selectedDate).format('DD MMMM YYYY')}</Text>
        </View>
      </TouchableOpacity>
      {openDatePicker && (
        <DateTimePicker
        value={selectedDate || new Date()} // Ensure value is always a valid Date
        mode="date"
        display="default"
        onChange={(event, date) => {
          if (date) {
            setSelectedDate(date); // Set selected date
          } else {
            setSelectedDate(new Date()); // If no date, reset to today
          }
          setOpenDatePicker(false); // Close picker after selecting a date
        }}
        style={{ marginBottom: 10, zIndex: 10 }}
      />
      
      )}

      {/* Table */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cellHeader,{maxWidth: 20}]}>ID</Text>
        <Text style={styles.cellHeader}>Tanggal</Text>
        <Text style={styles.cellHeader}>Produk</Text>
        <Text style={styles.cellHeader}>Harga Jual</Text>
        <Text style={styles.cellHeader}>Harga Modal</Text>
        <Text style={styles.cellHeader}>Laba</Text>
      </View>
      <FlatList
        data={paginatedData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderTableRow}
        contentContainerStyle={[styles.tableBody]}
      />

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          style={[
            styles.paginationButton,
            {backgroundColor: currentPage === 1 ? '#E5E5E5' : '#CD4F4F'},
          ]}>
          <Text
            style={[
              styles.paginationText,
              {color: currentPage === 1 ? '#A5A5A5' : '#FFFFFF'},
            ]}>
            Prev
          </Text>
        </TouchableOpacity>
        <Text style={styles.paginationInfo}>
          {currentPage} / {totalPages}
        </Text>
        <TouchableOpacity
          onPress={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          style={[
            styles.paginationButton,
            {
              backgroundColor:
                currentPage === totalPages ? '#E5E5E5' : '#CD4F4F',
            },
          ]}>
          <Text
            style={[
              styles.paginationText,
              {color: currentPage === totalPages ? '#A5A5A5' : '#FFFFFF'},
            ]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.footer}>
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: '#FFF3D8',
              borderColor: '#B98960',
              borderWidth: 1,
            },
          ]}>
          <Text style={[styles.summaryText, {color: '#B98960'}]}>
            Omset Rp{totalHargaJual.toLocaleString('id-ID')}
          </Text>
        </View>
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: '#E7FFD8',
              borderColor: '#58B647',
              borderWidth: 1,
            },
          ]}>
          <Text style={[styles.summaryText, {color: '#58B647'}]}>
            Harga Modal Rp{totalHargaModal.toLocaleString('id-ID')}
          </Text>
        </View>
        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: '#FFF3D8',
              borderColor: '#B98960',
              borderWidth: 1,
            },
          ]}>
          <Text style={[styles.summaryText, {color: '#B98960'}]}>
            Laba Rp{totalLaba.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#F86A6A',
  },
  subContainer: {
    backgroundColor: '#FFFF',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#F86A6A',
    padding: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationButton: {
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  paginationText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  paginationInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    margin: 20,
    marginTop: 20,
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
  },
  navButton: {
    marginHorizontal: 10,
    backgroundColor: '#A94D4D',
    color: '#FFFFF',
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#F8BBD0',
    paddingHorizontal: 16,
  },
  monthScroll: {
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#F8BBD0',
  },
  monthButton: {
    marginHorizontal: 4,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    padding: 8,
    borderRadius: 8,
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  cell: {
    flex: 1,
    padding: 1,
    textAlign: 'center',
  },
  tableBody: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 16,
    backgroundColor: '#F8BBD0',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  summaryCard: {
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 4,
    padding: 8,
  },
  summaryText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RekapScreen;
