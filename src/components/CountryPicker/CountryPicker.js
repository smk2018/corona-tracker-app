import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../api";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./Styles";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetechedCountries] = useState([]);
  const [state, setState] = useState({
    query: "",
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await fetchCountries();
      const countries = result.map((country) => ({
        label: country,
        value: country,
      }));
      setFetechedCountries(countries);
    };

    fetchAPI();
  }, []);

  const onChangeItem = (item) => {
    setState({country: item.value});
    handleCountryChange(item.value);
  };
  console.log('got called country picker');

  return (
    <View style={styles.container}>
      <DropDownPicker
        min={5}
        max={7}
        searchable={true}
        searchablePlaceholder="Search Country..."
        searchableError="Not Found"
        items={fetchedCountries}
        defaultValue={""}
        containerStyle={styles.containerStyle}
        style={styles.autoCompleteStyle}
        dropDownStyle={styles.dropDownStyle}
        onChangeItem={onChangeItem}
      />
    </View>
  );
};

export default CountryPicker;
