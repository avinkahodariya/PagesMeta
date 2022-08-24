import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,minWidth:'500px',
  p: 2,
};

export const BasicModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.onClose(false);
  };

  useEffect(() => {
    props.open ? handleOpen() : handleClose();
  }, [props.open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={props.className}
        
        >
          <Box
          sx={style}
          className={"border rounded-0"}
          style={{ ...props.styleParent }}>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}
