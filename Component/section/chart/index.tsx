import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';

type Data = {
  month: string;
  profit: number;
  loss: number;
};

const monthlyData: Data[] = [
  {month: 'Jan', profit: 100, loss: 50},
  {month: 'Feb', profit: 200, loss: 70},
  {month: 'Mar', profit: 150, loss: 100},
  {month: 'Apr', profit: 120, loss: 90},
  {month: 'May', profit: 300, loss: 150},
  {month: 'Jun', profit: 250, loss: 120},
  {month: 'Jul', profit: 280, loss: 110},
  {month: 'Aug', profit: 180, loss: 80},
  {month: 'Sep', profit: 220, loss: 70},
  {month: 'Oct', profit: 160, loss: 60},
  {month: 'Nov', profit: 300, loss: 140},
  {month: 'Dec', profit: 400, loss: 200},
];

const periods = [
  {id: 1, label: 'January - June'},
  {id: 2, label: 'July - December'},
];

const ProfitLossChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const filteredData =
    selectedPeriod === 1
      ? monthlyData.slice(0, 6) // Jan - Jun
      : monthlyData.slice(6); // Jul - Dec

  const handleSelect = (id: number) => {
    setSelectedPeriod(id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>
          {periods.find(p => p.id === selectedPeriod)?.label}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={periods}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.id)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Chart */}
      <VictoryChart
        domainPadding={{y: 10, x: 30}}
        theme={VictoryTheme.material}>
        <VictoryGroup offset={15} colorScale={['#68CD8D', '#CD4F4F']}>
          <VictoryBar
            data={filteredData}
            x="month"
            y="profit"
            style={{
              data: {fill: '#68CD8D'},
            }}
          />
          <VictoryBar
            data={filteredData}
            x="month"
            y="loss"
            style={{
              data: {fill: '#CD4F4F'},
            }}
          />
        </VictoryGroup>
        <VictoryAxis
          style={{
            axis: {stroke: '#000'},
            ticks: {size: 5},
            tickLabels: {fontSize: 12},
            grid: {stroke: 'none'},
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={tick => `${tick}`}
          style={{
            axis: {stroke: '#000'},
            ticks: {size: 5},
            tickLabels: {fontSize: 12},
            grid: {stroke: 'none'},
          }}
        />
      </VictoryChart>
      <View style={styles.footer}>
        <View style={[styles.summaryCard]}>
          <View style={{width: 20, height: 20, backgroundColor: '#68CD8D'}} />
          <Text style={[styles.summaryText, {color: '#68CD8D'}]}>Laba</Text>
        </View>
        <View style={[styles.summaryCard]}>
          <View style={{width: 20, height: 20, backgroundColor: '#CD4F4F'}} />
          <Text style={[styles.summaryText, {color: '#CD4F4F'}]}>Rugi</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfitLossChart;
