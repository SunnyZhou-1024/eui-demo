import ReactDOM from "react-dom";
// import '@elastic/eui/dist/eui_theme_dark.css';
import "@elastic/eui/dist/eui_theme_light.css";
import React, { useState } from "react";

import { EuiComboBox, EuiHighlight, EuiHealth } from "@elastic/eui";
import {
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText
} from "@elastic/eui/lib/services";

const visColors = euiPaletteColorBlind();
const visColorsBehindText = euiPaletteColorBlindBehindText();

var filters = [
  {
    searchText: "111111",
    filterName: "f1",
    isRegexp: false,
    fontColor: "#ff0000",
    backgroundColor: "#dedada"
  },
  {
    searchText: "222222",
    filterName: "f2",
    isRegexp: false,
    fontColor: "#ff0000",
    backgroundColor: "#decaca"
  },
    {
    searchText: "33333",
    filterName: "f3333",
    isRegexp: true,
    fontColor: "#ff0000",
    backgroundColor: "#debaba"
  }
];

function FilterList(props) {
  let filterOptions = props.filters.map((filter) => {
    return {
      label:
        filter.filterName +
        ": " +
        filter.searchText +
        " - isRegexp: " +
        (filter.isRegexp
          ? "yes"
          : "no"),
      color: filter.backgroundColor,
      value: filter.searchText
    };
  });
  const [options, setOptions] = useState(filterOptions);
  const [selectedOptions, setSelected] = useState([options[0], options[1]]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      value: searchValue,
      label: searchValue
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      options.push(newOption);
      setOptions([...options, newOption]);
    }

    // Select the option.
    setSelected((prevSelected) => [...prevSelected, newOption]);
  };

  const renderOption = (option, searchValue, contentClassName) => {
    const { color, label, value } = option;
    return (
      <EuiHealth color={color}>
        <span className={contentClassName}>
          <EuiHighlight search={searchValue}>{label}</EuiHighlight>
          &nbsp;
          <span>({value})</span>
        </span>
      </EuiHealth>
    );
  };

  return (
    <EuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
      renderOption={renderOption}
      fullWidth={true}
    />
  );
};

ReactDOM.render(<FilterList filters={filters} />, document.getElementById("content"));
