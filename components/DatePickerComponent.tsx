import React, { useState } from 'react';
import { View, Text, Pressable, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons'; // Or 'react-native-vector-icons/MaterialIcons'

interface DatePickerComponentProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  placeholderTextColor?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  value,
  onChange,
  placeholder = 'Select Date',
  placeholderTextColor = '#666',
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = value
    ? `${('0' + value.getDate()).slice(-2)} - ${('0' + (value.getMonth() + 1)).slice(-2)} - ${value.getFullYear()}`
    : '';

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <Pressable onPress={() => setShowPicker(true)}>
        <View style={styles.input}>
          <Text
            style={[
              styles.inputText,
              { color: formattedDate ? '#000' : placeholderTextColor },
            ]}
          >
            {formattedDate || placeholder}
          </Text>
          <AntDesign
            name="calendar"
            size={24}
            color="#666"
            style={styles.icon}
          />
        </View>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 47,
    borderWidth: 1,
    borderColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
});

export default DatePickerComponent;