import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import "./custom-modal.component.style.scss";
import Button from "@mui/material/Button";
import useAxios from "../../service/axios/useAxios.service";
import axios from "../../service/axios/planets.api";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CustomModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [newPlanet, setNewPlanet] = useState();
  const [planets, error, loading, axiosFetch] = useAxios();

  const onSubmit = (data) => {
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/",
      data: data,
    });
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/",
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h4>Create planet</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input
            className="input large"
            {...register("planetName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          <label>Description</label>
          <textarea
            rows="4"
            cols="50"
            {...register("description", {
              required: true,
              maxLength: 50,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          <div className="input-group">
            <div>
              <label>Radius in km</label>
              <input
                type="number"
                className="input small"
                {...register("planetRadiusKM", {
                  required: true,
                })}
              />
            </div>
            <div>
              <label>Color</label>
              <input
                className="input small"
                {...register("planetColor", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
            </div>
          </div>
          <div className="input-group">
            <div>
              <label>Distance from Earth</label>
              <input
                type="number"
                className="input small"
                {...register("distInMillionsKM.fromEarth", {
                  required: true,
                })}
              />
            </div>
            <div>
              <label>Distance from Sun</label>
              <input
                type="number"
                className="input small"
                {...register("distInMillionsKM.fromSun", {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className="btn-group">
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
