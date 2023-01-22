import { useContext, useState } from "react";
import { ViewContext } from "../../service/context/view.context";
import "./planets-header.style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import WindowIcon from "@mui/icons-material/Window";
import TableRowsIcon from "@mui/icons-material/TableRows";
import {
  Outlet,
  useNavigate,
  useSearchParams,
  useParams,
} from "react-router-dom";
import Box from "@mui/material/Box";
import { CustomModal } from "../cutom-modal/custom-modal.component";
import axios from "../../service/axios/planets.api";
import useAxios from "../../service/axios/useAxios.service";

const PlanetsHeader = () => {
  const { handleView } = useContext(ViewContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [planet, error, loading, axiosFetch] = useAxios();
  let [searchParams, setSearchParams] = useSearchParams();
  const onSearch = (event) => {
    event.preventDefault();
    setSearchParams(`search=${event.target.value}`);
  };
  const deltePlanet = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: `/${id}`,
    });
    navigate("/");
  };
  return (
    <>
      <header className="planets-header">
        <div onClick={() => navigate("/")}>
          {" "}
          <h1>Planets</h1>
        </div>
        {!id ? (
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
              <input placeholder="Search..." onChange={onSearch}></input>
              <SearchIcon
                sx={{ color: grey[600] }}
                className="search-icon"
              ></SearchIcon>
            </form>
            <Button variant="contained" onClick={handleOpen}>
              Create
            </Button>
          </div>
        ) : (
          <Box sx={{ "& button": { m: 1 } }}>
            <Button size="small" variant="contained" color="secondary">
              Edit
            </Button>
            <Button size="small" variant="contained" onClick={deltePlanet}>
              Delete
            </Button>
          </Box>
        )}
        <CustomModal open={open} onClose={handleClose}></CustomModal>
      </header>

      <Outlet />
    </>
  );
};

export default PlanetsHeader;
