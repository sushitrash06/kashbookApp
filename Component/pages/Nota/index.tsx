import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import { NotaData } from '../../dummy';

const NotaScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('JAN');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1); // Untuk pagination
  const itemsPerPage = 10; // Maksimal 5 data per halaman
  const scrollRef = useRef<ScrollView>(null);

  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN',
    'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC',
  ];

  const filteredData = NotaData.filter(item => {
    const itemMonthIndex = new Date(item.date).getUTCMonth();
    const selectedMonthIndex = months.indexOf(selectedMonth);
    return itemMonthIndex === selectedMonthIndex;
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

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset =
        direction === 'right' ? scrollPosition + 100 : scrollPosition - 100;
      scrollRef.current.scrollTo({ x: offset, animated: true });
      setScrollPosition(offset);
    }
  };

  const renderTableRow = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.omset.toLocaleString('id-ID')}</Text>
      <Text style={styles.cell}>{item.laba.toLocaleString('id-ID')}</Text>
    </View>
  );

  const totalOmset = filteredData.reduce(
    (total, item) => total + item.omset,
    0,
  );
  const totalLaba = filteredData.reduce((total, item) => total + item.laba, 0);

  return (
    <View>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => handleScroll('left')}>
            <Image source={require('../../../assets/arrow-right.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
          <ScrollView ref={scrollRef} horizontal contentContainerStyle={styles.monthScroll}>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                onPress={() => setSelectedMonth(month)}
                style={[
                  styles.monthButton,
                  { backgroundColor: selectedMonth === month ? '#CD4F4F' : 'transparent' },
                ]}>
                <Text style={{ color: selectedMonth === month ? 'white' : '#681313', fontWeight: '700' }}>{month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => handleScroll('right')}>
            <Image source={require('../../../assets/arrow-left.png')} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={styles.cellHeader}>ID</Text>
          <Text style={styles.cellHeader}>Tanggal</Text>
          <Text style={styles.cellHeader}>Omset</Text>
          <Text style={styles.cellHeader}>Laba</Text>
        </View>
        <FlatList
  data={paginatedData}
  keyExtractor={(_, index) => index.toString()}
  renderItem={renderTableRow}
  contentContainerStyle={[styles.tableBody]}
/>
{/* Kontrol Pagination Langsung di Bawah Tabel */}
<View style={styles.paginationContainer}>
  <TouchableOpacity
    onPress={() => handlePageChange('prev')}
    disabled={currentPage === 1}
    style={[
      styles.paginationButton,
      { backgroundColor: currentPage === 1 ? '#E5E5E5' : '#CD4F4F' },
    ]}>
    <Text style={[styles.paginationText, { color: currentPage === 1 ? '#A5A5A5' : '#FFFFFF' }]}>
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
      { backgroundColor: currentPage === totalPages ? '#E5E5E5' : '#CD4F4F' },
    ]}>
    <Text style={[styles.paginationText, { color: currentPage === totalPages ? '#A5A5A5' : '#FFFFFF' }]}>
      Next
    </Text>
  </TouchableOpacity>
</View>


        {/* Summary */}
        <View style={styles.footer}>
          <View style={[styles.summaryCard, { backgroundColor: '#FFF3D8', borderColor: '#B98960', borderWidth: 1 }]}>
            <Text style={[styles.summaryText, { color: '#B98960' }]}>
              Omset Rp{totalOmset.toLocaleString('id-ID')}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#E7FFD8', borderColor: '#58B647', borderWidth: 1 }]}>
            <Text style={[styles.summaryText, { color: '#58B647' }]}>
              Laba Rp{totalLaba.toLocaleString('id-ID')}
            </Text>
          </View>
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
    marginVertical: 10,
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
  dateButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFEAEA',
    maxWidth: 150,
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
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
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

export default NotaScreen;
