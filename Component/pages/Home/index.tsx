import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Text} from 'react-native-paper';

const HomeScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('JAN');
  const [sectionPage, setSection] = useState<'Nota' | 'Rekap'>('Nota');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const dummyData = [
    {id: 'INV123', date: '2024-01-04', omset: 1000000, laba: 200000},
    {id: 'INV124', date: '2024-02-15', omset: 2000000, laba: 400000},
    {id: 'INV125', date: '2024-01-25', omset: 1500000, laba: 300000},
    {id: 'INV126', date: '2024-03-08', omset: 1200000, laba: 250000},
    {id: 'INV127', date: '2024-01-12', omset: 1700000, laba: 350000},
  ];

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MEI',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OKT',
    'NOV',
    'DEC',
  ];

  const filteredData = dummyData.filter(item => {
    const itemMonthIndex = new Date(item.date).getUTCMonth(); // Index bulan (0-11)
    const selectedMonthIndex = months.indexOf(selectedMonth); // Index bulan yang dipilih
    return itemMonthIndex === selectedMonthIndex;
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset =
        direction === 'right' ? scrollPosition + 100 : scrollPosition - 100;
      scrollRef.current.scrollTo({x: offset, animated: true});
      setScrollPosition(offset); // Update posisi scroll
    }
  };

  const renderTableRow = ({item}: any) => (
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
    <View style={styles.container}>
      <Text style={styles.headerTitle}>HOME KASBOOK APP</Text>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={{color: '#FFFF', fontWeight: '800'}}>KasBook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={{color: '#FFFF', fontWeight: '800'}}>PPOB</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={{color: '#FFFF', fontWeight: '800'}}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={{color: '#FFFF', fontWeight: '800'}}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container, styles.subContainer]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            maxWidth: 200,
            margin: 'auto',
          }}>
          <TouchableOpacity
            onPress={() => {
              setSection('Nota');
            }}
            style={{
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: sectionPage === 'Nota' ? '#A94D4D' : 'white',
            }}>
            <Text
              style={{
                color: sectionPage === 'Nota' ? 'white' : '#A94D4D',
                textAlign: 'center',
                fontWeight: '900',
              }}>
              Nota
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSection('Rekap');
            }}
            style={{
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: sectionPage === 'Rekap' ? '#A94D4D' : 'white',
            }}>
            <Text
              style={{
                color: sectionPage === 'Rekap' ? 'white' : '#A94D4D',
                textAlign: 'center',
                fontWeight: '900',
              }}>
              Rekap
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => handleScroll('left')}>
            <Image
              source={require('../../../assets/arrow-right.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <ScrollView
            ref={scrollRef}
            horizontal
            contentContainerStyle={styles.monthScroll}>
            {months.map((month, index) => {
              console.log(month === selectedMonth);
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMonth(month);
                  }}
                  style={[
                    styles.monthButton,
                    {
                      backgroundColor:
                        selectedMonth === month ? '#CD4F4F' : 'transparent',
                    },
                  ]}>
                  <Text
                    style={{
                      color: selectedMonth === month ? 'white' : '#681313',
                      fontWeight: '700',
                    }}>
                    {month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity onPress={() => handleScroll('right')}>
            <Image
              source={require('../../../assets/arrow-left.png')}
              style={styles.arrowIcon}
            />
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
          data={filteredData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderTableRow}
          contentContainerStyle={styles.tableBody}
        />
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
              Omset Rp{totalOmset.toLocaleString('id-ID')}
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
              Laba Rp{totalLaba.toLocaleString('id-ID')}
            </Text>
          </View>
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
    marginTop: 30,
  },
  header: {
    backgroundColor: '#F86A6A',
    padding: 16,
  },
  headerTitle: {
    margin: 30,
    marginTop: 40,
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

export default HomeScreen;
