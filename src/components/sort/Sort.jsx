// src/components/products/Sort.js
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Sort = ({ sortOption, onSortChange }) => {
  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    onSortChange(selectedValue);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "30px 0 20px 0",
      }}
    >
      <FormControl variant="outlined" sx={{ minWidth: 300, marginBottom: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          label="Sort By"
          displayEmpty
        >
          {/* <MenuItem value="" disabled>
            Select...
          </MenuItem> */}
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
