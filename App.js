
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const sendData = async () => {
    try {
      const response = await fetch('Firebase_URL/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputValue }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Send Data to Firebase</Text>

      <TextInput
        placeholder="Enter data"
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 5,
        }}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />

      <Button title="Send Data" onPress={sendData} />
    </View>
  );
};

export default App;
