import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

interface CustomDropdownProps {
  value: any;
  onChange: (item: any) => void;
  placeholder?: string;
  search?: boolean;
  searchPlaceholder?: string;
}

interface DropdownItem {
  label: string;
  value: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  placeholder = 'Select item',
  search = false,
  searchPlaceholder = 'Search...'
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownData, setDropdownData] = useState<DropdownItem[]>([]);

  useEffect(() => {
    const fetchLGAs = async () => {
      try {
        const response = await axios.get('https://nga-states-lga.onrender.com/?state=Oyo');
        // Transform the string array into dropdown format
        const formattedData = response.data.map((lga: string) => ({
          label: lga,
          value: lga.toLowerCase().replace(/\s+/g, '-'),
        }));
        setDropdownData(formattedData);
      } catch (error) {
        console.error('Error fetching LGAs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLGAs();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#00763E" />
      </View>
    );
  }

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && styles.dropdownFocus]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={dropdownData}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={value}
      search={search}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        onChange(item.value);
        setIsFocus(false);
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 47,
    borderColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
    marginVertical: 8,
  },
  dropdownFocus: {
    borderColor: '#00763E',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#0C2039',
  },
  loadingContainer: {
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 8,
  },
});

export default CustomDropdown;