import { useState, useContext } from "react";
import { ViewContext } from "../../service/context/view.context";
import "./planets-header.style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import WindowIcon from "@mui/icons-material/Window";
import TableRowsIcon from "@mui/icons-material/TableRows";
import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";

const PlanetsHeader = () => {
  const { handleView } = useContext(ViewContext);
  const navigate = useNavigate();

  return (
    <>
      <header className="planets-header">
        <div onClick={() => navigate("/")}>
          {" "}
          <h1>Planets</h1>
        </div>
        <div className="header-menu">
          <Box sx={{ "& button": { m: -1 } }}>
            <Button size="small" onClick={() => handleView("grid")}>
              <WindowIcon fontSize="small" />
            </Button>
            <Button size="small" onClick={() => handleView("table")}>
              <TableRowsIcon fontSize="small" />
            </Button>
          </Box>
          <form>
            <input placeholder="Search..."></input>
            <SearchIcon
              sx={{ color: grey[600] }}
              className="search-icon"
            ></SearchIcon>
          </form>
          <Button variant="contained">Create</Button>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default PlanetsHeader;
