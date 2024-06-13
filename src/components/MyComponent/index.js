import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';

const MyComponent = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      setDataSource(data.filter(item => item.name.includes(searchTerm)));
    }, 1000);
  }, [searchTerm]);

  const handleSelect = item => {
    setSelectedItems((currentSelectedItems) => [...currentSelectedItems, item]);
  };

  const handleClear = () => {
    inputRef.current.clear();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        ref={inputRef}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <TouchableOpacity style={styles.buttonView} onPress={handleClear}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={item => item.id}
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
