import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface CustomDropdownProps {
  data: Array<{ label: string; value: any }>;
  value: any;
  onChange: (item: any) => void;
  placeholder?: string;
  search?: boolean;
  searchPlaceholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  value,
  onChange,
  placeholder = 'Select item',
  search = false,
  searchPlaceholder = 'Search...'
}) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && styles.dropdownFocus]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
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
});

export default CustomDropdown;