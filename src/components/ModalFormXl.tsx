import { styled } from "@mui/material/styles";

import {
  Grid,
  Modal,
  Paper,
  Typography,
  DialogTitle,
  Fab,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { ButtonCloseModal } from "./ButtonCloseModal";
import { stylesheet } from "./modal.style";


interface Props {
  openModal: boolean;
  onCloseModal: () => void;
  labelAction: string;
  children: React.ReactNode;
}

export const ModalFormXl = ({
  children,
  openModal,
  onCloseModal,
  labelAction,
}: Props) => {
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    margin: "0 auto",
  });
  return (
    <Modal
      open={openModal}
      onClose={(e, reason) => {
        if (reason === "backdropClick") {
          console.log("backdrop");
        } else {
          onCloseModal();
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Box sx={{ display: "flex" }}>
          <Paper sx={stylesheet.paperContainer2} elevation={24}>
            <DialogTitle style={{ cursor: "move" }} id="draggable-modal-title">
              <Grid item id="modal-modal-title"></Grid>
            </DialogTitle>

            <Typography component={"div"} variant={"h6"}>
              {labelAction}
            </Typography>

            <ButtonCloseModal onCloseModal={onCloseModal} />

            {/* <Divider /> */}
            <Typography
              component={"div"}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {children}
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </Modal>
  );
};