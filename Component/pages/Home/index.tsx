import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import NotaScreen from '../Nota';
import RekapScreen from '../Rekap';

const HomeScreen: React.FC = () => {
  const [sectionPage, setSection] = useState<'Nota' | 'Rekap'>('Nota');

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>HOME KASBOOK APP</Text>
      <View style={styles.subContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setSection('Nota')}
            style={[
              styles.button,
              { backgroundColor: sectionPage === 'Nota' ? '#A94D4D' : 'white' },
            ]}>
            <Text
              style={{
                color: sectionPage === 'Nota' ? 'white' : '#A94D4D',
                fontWeight: '900',
                textAlign: 'center'
              }}>
              Nota
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSection('Rekap')}
            style={[
              styles.button,
              { backgroundColor: sectionPage === 'Rekap' ? '#A94D4D' : 'white' },
            ]}>
            <Text
              style={{
                color: sectionPage === 'Rekap' ? 'white' : '#A94D4D',
                fontWeight: '900',
                textAlign: 'center'
              }}>
              Rekap
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          {sectionPage === 'Nota' ? <NotaScreen /> : <RekapScreen />}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    maxWidth: 200,
    margin: 'auto'
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1, // Ensure buttons take equal width
    marginHorizontal: 5,
  },
  contentContainer: {
    flexGrow: 1, // Allow the content to take up available space
    paddingBottom: 80, // Ensure there's space at the bottom if needed
  },
});

export default HomeScreen;
