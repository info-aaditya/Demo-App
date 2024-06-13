import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MyComponent from './src/components/MyComponent';
import { data } from './src/data/data';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <MyComponent data={data} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
