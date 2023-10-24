import React from "react";
import "../deleteComponent/DeletePopUp.css";
import axios from "axios";
const DeletePopup = ({ product, handleDelete, handleClose }) => {
  const handleConfirm = () => {
    console.log("in Delete", product);
    axios
      .delete(`http://localhost:3001/api/v1/product/${product._id}`)
      .then((res) => {
        alert(`${product.name} is Deleted successfull!`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  return (
    <div className="delete-popup">
      <p
        style={{
          marginTop: "2em",
          color: "white",
          fontFamily: "cursive",
        }}
      >
        <h3> Are you sure you want to delete ?</h3>
      </p>
      <div className="buttons">
        <button
          style={{ width: "100px", height: "2.5em" }}
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          style={{ width: "100px", height: "2.5em" }}
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
