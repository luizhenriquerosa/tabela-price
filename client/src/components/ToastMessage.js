import React from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";

const Toast = styled(ToastContainer)`
  .Toastify__toast-container {
    border-radius: 8px;
  }
  .Toastify__toast {
    background-color: $color-primary;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }
  .Toastify__toast--info {
    background: "rgb(51, 102, 255)";
  }
  .Toastify__toast--success {
    background: "rgb(51, 187, 102)";
  }
  .Toastify__toast--warning {
    background: "rgb(254, 255, 20)";
  }
  .Toastify__toast--error {
    background: "rgb(255, 102, 102)";
  }
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    outline: 0;
  }
`;

const showToastMessage = ({ type, message }) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
  }
};

function ToastMessageContainer(props) {
  return <Toast {...props} />;
}

export { showToastMessage, ToastMessageContainer };
