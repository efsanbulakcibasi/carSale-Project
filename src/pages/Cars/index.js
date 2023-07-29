import { useEffect, useState } from "react";
import axios from "axios";
import { Apis } from "../../apis/Apis";
import CarsItem from "../CarsItem";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Cars = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  
  const carColor = [];
  const carName = [];
  const carYear = [];

  useEffect(() => {
    axios
      .get(Apis.cars)
      .then((response) => {
        setData(response.data);
        setFilteredList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChnage = (e) => {
    if (e === "descPrice") {
      let list = [...filteredList.sort((a, b) => a.price - b.price)];
      setValue("descPrice");
      setFilteredList(list);
    } else if (e === "ascPrice") {
      let list = [...filteredList.sort((a, b) => b.price - a.price)];
      setValue("ascPrice");
      setFilteredList(list);
    } else if (e === "descYear") {
      let list = [
        ...filteredList.sort((a, b) => a.car_model_year - b.car_model_year),
      ];
      setValue("descYear");
      setFilteredList(list);
    } else if (e === "ascYear") {
      let list = [
        ...filteredList.sort((a, b) => b.car_model_year - a.car_model_year),
      ];
      setValue("ascYear");
      setFilteredList(list);
    }
  };

  const handleColorChange = (e) => {
    var list = [...data.filter((x) => x.car_color === e)];
    setColorValue(e);
    setFilteredList(list);
  };

  const handleNameChange = (e) => {
    let list = [...data.filter((x) => x.car === e)];
    setNameValue(e);
    setFilteredList(list);
  };

  const handleModalChange = (e) => {
    let list = [...data.filter((x) => x.car_model === e)];
    setModalValue(e);
    setFilteredList(list);
  };

  const handleYearChange = (e) => {
    let list = [...data.filter((x) => x.car_model_year === e)];
    setYearValue(e);
    setFilteredList(list);
  };

  return (
    <div className="pages">
      <div className="sort-cont">
      {(value || nameValue || modalValue || colorValue || yearValue) && (
          <Button
            className="clr-btn"
            variant="outlined"
            size="small"
            onClick={() => {
              setFilteredList(data);
              setValue("");
              setColorValue("");
              setModalValue("");
              setNameValue("");
              setYearValue("")
            }}
          >
            Clear Filter
          </Button>
        )}
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={(e) => handleChnage(e.target.value)}
            label="Sırala"
          >
            <MenuItem value={"descPrice"}>Decreasing by price</MenuItem>
            <MenuItem value={"ascPrice"}>Ascending by price</MenuItem>
            <MenuItem value={"descYear"}>Decreasing by year</MenuItem>
            <MenuItem value={"ascYear"}>Ascending by year</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">Sort by Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={colorValue}
            onChange={(e) => handleColorChange(e.target.value)}
            label="Sırala"
          >
            {filteredList.map((items) => {
              if (!carColor.includes(items.car_color)) {
                carColor.push(items.car_color);
                return (
                  <MenuItem key={items.id} value={items.car_color}>
                    {items.car_color}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">Sort by Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={nameValue}
            onChange={(e) => handleNameChange(e.target.value)}
            label="Sırala"
          >
            {filteredList.map((items) => {
              if (!carName.includes(items.car)) {
                carName.push(items.car);
                return (
                  <MenuItem key={items.id} value={items.car}>
                    {items.car}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">Sort by Modal</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={modalValue}
            onChange={(e) => handleModalChange(e.target.value)}
            label="Sırala"
          >
            {filteredList.map((items) => (
              <MenuItem key={items.id} value={items.car_model}>
                {items.car_model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">Sort by Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yearValue}
            onChange={(e) => handleYearChange(e.target.value)}
            label="Sırala"
          >
            {filteredList.map((items) => {
              if (!carYear.includes(items.car_model_year)) {
                carName.push(items.car_model_year);
                return (
                  <MenuItem key={items.id} value={items.car_model_year}>
                    {items.car_model_year}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
        </FormControl>

      </div>
      <div className="cars-container">
        {filteredList.map((cars) => {
          return <CarsItem cars={cars} key={cars.id} />;
        })}
      </div>
    </div>
  );
};

export default Cars;
