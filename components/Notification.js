import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

export const Notification = (title) => {
   return toast(title, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
   });
};
