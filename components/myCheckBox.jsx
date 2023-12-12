import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CheckboxList = ({ options, selectedOptions, onSelect }) => {
  const extractValues = (options) => options.map(item => item.value);

  const handleCheckboxPress = (option) => {
    const isSelected = selectedOptions.includes(option);
    const updatedOptions = isSelected
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option]; 
    onSelect(updatedOptions);
  };

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={() => handleCheckboxPress(option.value)}>
            <View style={{flex:1,flexDirection:'row', paddingLeft: 8, paddingRight: 8, textTransform: 'capitalize' }}>
                <View style={selectedOptions.includes(option.value) ? styles.checkedContainer : styles.uncheckedContainer}>
                    {selectedOptions.includes(option.value) && <Text style={styles.checkedText}>✓</Text>}
                </View>
                <Text style={{fontFamily: 'Roboto', fontWeight: "600", fontSize: 16 }}>{option.value}</Text>
            </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedContainer: {
    width: 20,
    height: 20,
    backgroundColor: 'green',
    borderRadius: 5,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedContainer: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedText: {
    color: 'white',
  },
});

export default CheckboxList;