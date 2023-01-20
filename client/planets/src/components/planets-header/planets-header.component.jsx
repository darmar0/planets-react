import { useState } from "react";
import "./planets-header.style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import WindowIcon from "@mui/icons-material/Window";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Box from "@mui/material/Box";

const PlanetsHeader = () => {
  const [search, onSearch] = useState();
  const handleChange = (event) => {
    onSearch(event.target.value);
    console.log(search);
  };
  return (
    <header className="planets-header">
      <div>
        {" "}
        <h1>Planets</h1>
      </div>
      <div className="header-menu">
        <Box sx={{ "& button": { m: -1 } }}>
          <Button size="small">
            <WindowIcon fontSize="small" />
          </Button>
          <Button size="small">
            <TableRowsIcon fontSize="small" />
          </Button>
        </Box>
        <form>
          <input placeholder="Search..." onChange={handleChange}></input>
          <SearchIcon
            sx={{ color: grey[600] }}
            className="search-icon"
          ></SearchIcon>
        </form>
        <Button variant="contained">Create</Button>
      </div>
    </header>
  );
};

export default PlanetsHeader;
