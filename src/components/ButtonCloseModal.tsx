import { IconButton } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import React from "react";
interface Props {
  onCloseModal: () => void;
}
export const ButtonCloseModal = ({ onCloseModal }: Props) => {
  return (
    <>
      <IconButton
        aria-label="close"
        onClick={onCloseModal}
        sx={{
          position: "absolute",
          right: 20,
          top: 20,
        }}
      >
        <GridCloseIcon color="error" />
      </IconButton>
    </>
  );
};