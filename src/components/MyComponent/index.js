import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';

const MyComponent = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataSource, setDataSource] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');

  // Update dataSource whenever data prop changes
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const handleSelect = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // TextInput Clear Functionality
  const handleClear = () => {
    setSearchTerm('');
    setDataSource(data); // Reset dataSource to original data
  };

  const handleSearch = text => {
    setSearchTerm(text);
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setDataSource(filteredData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <TouchableOpacity style={styles.buttonView} onPress={handleClear}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={item => item.id.toString()} // KeyExtractor Issue
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={styles.itemContainer}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text>{selectedItems.includes(item) ? 'Selected' : 'Not selected'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  buttonView: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  itemText: {
    fontSize: 16,
  },
});

export default MyComponent;
