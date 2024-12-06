import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen: React.FC = () => {
  const [filterDate, setFilterDate] = useState<Date | null>(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const dummyData = Array(5).fill({
    id: 'INV123',
    date: '2024/06/04',
    omset: 1000000,
    laba: 200000,
  });

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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setDatePickerVisible(false);
    if (selectedDate) setFilterDate(selectedDate);
  };

  const renderTableRow = ({item}: any) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.omset.toLocaleString('id-ID')}</Text>
      <Text style={styles.cell}>{item.laba.toLocaleString('id-ID')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>HOME KASBOOK APP</Text>
      <View style={styles.navbar}>
        <Button mode="contained" style={styles.navButton}>
          KasBook
        </Button>
        <Button mode="contained" style={styles.navButton}>
          PPOB
        </Button>
        <Button mode="contained" style={styles.navButton}>
          Market
        </Button>
        <Button mode="contained" style={styles.navButton}>
          Settings
        </Button>
      </View>
      <View style={[styles.container, styles.subContainer]}>
        {/* Month Selector */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            maxWidth: 200,
            margin: 'auto',
          }}>
          <Button mode="contained" style={styles.navButton}>
            Nota
          </Button>
          <Button mode="contained" style={styles.navButton}>
            Rekap
          </Button>
        </View>
        <View style={styles.monthSelector}>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/arrow-right.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
          <ScrollView horizontal contentContainerStyle={styles.monthScroll}>
            {months.map((month, index) => (
              <Button textColor='#681313'  mode="contained" key={index} style={styles.monthButton}>
                {month}
              </Button>
            ))}
          </ScrollView>
          <TouchableOpacity>
            <Image
              source={require('../../../assets/arrow-left.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Date Picker */}
        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={styles.dateButton}>
          <View style={styles.dateButtonContent}>
            <Image
              source={require('../../../assets/calendar.png')}
              style={styles.icon}
            />
            <Text>
              {filterDate
                ? filterDate.toISOString().split('T')[0]
                : 'Pilih Tanggal'}
            </Text>
          </View>
        </TouchableOpacity>

        {isDatePickerVisible && (
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={styles.cellHeader}>ID</Text>
          <Text style={styles.cellHeader}>Tanggal</Text>
          <Text style={styles.cellHeader}>Omset</Text>
          <Text style={styles.cellHeader}>Laba</Text>
        </View>
        <FlatList
          data={dummyData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderTableRow}
          contentContainerStyle={styles.tableBody}
        />

        {/* Floating Button */}
        <TouchableOpacity style={styles.fab}>
          <Image
            source={require('../../../assets/plus-icon.png')}
            style={styles.fabIcon}
          />
        </TouchableOpacity>
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
              Omset Rp12,309,203
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
              Omset Rp12,309,203
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
  },
  navButton: {
    marginHorizontal: 4,
    backgroundColor: '#A94D4D',
    color: '#FFFF',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#F8BBD0',
    paddingHorizontal: 16,
  },
  monthScroll: {
    flexDirection: 'row',
    backgroundColor: '#F8BBD0',
  },
  monthButton: {
    marginHorizontal: 4,
    backgroundColor: 'transparent',

  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  dateButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor:'#FFEAEA',
    maxWidth: 150,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
  dateButtonContent: {
    textAlign: 'center',
    margin:'auto',
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
  },
});

export default HomeScreen;
