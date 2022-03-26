import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
/**
 * Notification component
 * @param {alertOpen} - Status of the alert.
 * @param {handleClose} - Fucntion to handle the close of notification.
 * @param {status} - Status of the call.
 * @param {message} - Message to display.
 * @returns Notification component
 */
export default function Notification({
  alertOpen,
  handleClose,
  status,
  message,
}) {
  return (
    <Snackbar
      open={alertOpen}
      onClose={handleClose}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={status === 200 ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
