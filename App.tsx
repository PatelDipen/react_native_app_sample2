import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { calculate, OPERATION } from './src/service/calculate';

function App() {
  const [selectedOperation, setSelectedOperation] = useState<OPERATION>('add');
  const [result, setResult] = useState<string>('?');
  const [firstNumber, setFirstNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text testID="welcome-text">Welcome, Let's calculate!</Text>
        <TextInput
          testID="first-number-input"
          style={styles.textInput}
          placeholder="Enter a number"
          keyboardType="numeric"
          value={firstNumber}
          onChangeText={text => setFirstNumber(text)}
        />
        <TextInput
          testID="second-number-input"
          style={styles.textInput}
          placeholder="Enter a number"
          keyboardType="numeric"
          value={secondNumber}
          onChangeText={text => setSecondNumber(text)}
        />

        <View style={styles.pickerContainer}>
          <Picker
            testID="operation-picker"
            selectedValue={selectedOperation}
            onValueChange={itemValue => setSelectedOperation(itemValue)}
          >
            <Picker.Item label="Add (+)" value="add" />
            <Picker.Item label="Subtract (-)" value="subtract" />
            <Picker.Item label="Multiply (*)" value="multiply" />
            <Picker.Item label="Divide (/)" value="divide" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            testID="clear-button"
            style={styles.button}
            onPress={() => {
              setFirstNumber('');
              setSecondNumber('');
              setResult('?');
            }}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="calculate-button"
            style={[
              styles.button,
              (!firstNumber || !secondNumber) && styles.buttonDisabled,
            ]}
            disabled={!firstNumber || !secondNumber}
            onPress={() => {
              setResult(
                calculate(
                  Number(firstNumber),
                  Number(secondNumber),
                  selectedOperation,
                ).toString(),
              );
            }}
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        <Text testID="result-text" style={styles.resultText}>
          {result}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#cbe6f1',
  },
  subContainer: {
    backgroundColor: '#e5eace',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  pickerContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 20,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '45%',
    padding: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 120,
    fontWeight: 'bold',
  },
});

export default App;
