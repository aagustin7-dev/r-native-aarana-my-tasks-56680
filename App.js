import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <View>
          <TextInput style={styles.textInput} placeholder="Por favor, ingrese su tarea" />
          <Text>{"\n"}</Text>
          <Button title="Crear" color="#76B041" />
        </View>
        <View></View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE9EB',
    padding: 40
  },
  textInput: {
    width: 300,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});
