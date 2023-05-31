import React, { useState } from 'react';
import { TextInput, Text } from 'react-native';

const MyTextInput = ({ value, name, error, placeholder, onChangeText, marginTop }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <TextInput
        style={{ backgroundColor: isFocused ? '#8ce4ff' : 'transparent', fontSize: 20, textAlign: 'center', marginTop: marginTop, padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
        name={name}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={onChangeText}
        value={value}
      />
      {error && <Text style={{ marginTop: 5, color: 'red', textAlign: 'center' }}>{error}</Text>}
    </>
  )
}

export default MyTextInput