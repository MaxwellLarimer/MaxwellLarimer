import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';
import { useHistory, useParams } from "react-router-dom";
const IMAGES = [
  { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
  { id: 1, title: "Lime Green", color: "LimeGreen" },
  { id: 2, title: "Tomato", color: "Tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "Crimson" }
];

function Image({ color }) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: color
      }}
    />
  );
}

function Modal() {
  let history = useHistory();
//   let { id } = useParams();
  let image = IMAGES[parseInt(0, 10)];

  if (!image) return null;

  let handleClose = e => {
    e.stopPropagation();
    history.goBack();
  };


  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Log In to your Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>

  );
}


export default Modal;