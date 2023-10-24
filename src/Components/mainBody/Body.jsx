import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Body.css";
import DeletePopup from "../deleteComponent/DeletePopup";

function Body(props) {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);

  const { create, update } = props;
  // Implement functions for CRUD operations (handleCreate, handleEdit, handleDelete)
  // const handleCreate = (data) => {};
  // const handleEdit = (data) => {};
  // const handleDelete = (productId) => {};

  const handleDelete = (id) => {
    axios
      .get("http://localhost:3001/api/v1/product/")
      .then((product) => {
        var productToDelete = product.data.data.filter(
          (item) => item._id === id
        );
        setSelectedProduct(productToDelete[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    setDeletePopupOpen(true);
  };

  const handleUpdate = (id) => {
    console.log(id);
    update({ productId: id, status: true });
    // navigate("/update", { state: { productId: id } });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/product/")
      .then((product) => {
        console.log(product);
        setProducts(product);
      })
      .catch((err) => {
        console.log("In Error");
        console.log(err);
      });
  }, [handleDelete]);

  return (
    <div className="body-container">
      <div className="list">
        <div className="list-head">
          <div className="products-text">
            <h1 style={{ fontFamily: "cursive" }}> Products</h1>
          </div>
          <button className="add-products" onClick={() => props.create(true)}>
            <b> Add Product </b>
          </button>
        </div>
        <table className="product-table">
          <thead className="product-head">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Vendors Detail</th>
              <th style={{ width: "200px" }}>Action</th>
            </tr>
          </thead>
          {products != null ? (
            <tbody className="product-detail">
              {products.data.data.map((product) => {
                return (
                  <tr>
                    <td>
                      <b> {product.name}</b>
                    </td>
                    <td>
                      <b> {product.description}</b>
                    </td>
                    <td>
                      <table className="vendor-table">
                        <thead className="vendor-head">
                          <tr>
                            <th>NameV</th>
                            <th>is_Main</th>
                            <th>Varient Detail</th>
                          </tr>
                        </thead>
                        <tbody className="vendor-detail">
                          {product.vendors.map((vendor) => {
                            console.log(vendor.is_main);
                            return (
                              <tr>
                                <td>
                                  <b> {vendor.nameV}</b>
                                </td>
                                <td>
                                  <b> {vendor.is_main.toString()} </b>
                                </td>
                                <td>
                                  <table className="varient-table">
                                    <thead className="varient-head">
                                      <tr>
                                        <th>varient</th>
                                      </tr>
                                    </thead>
                                    <tbody className="varient-detail">
                                      {vendor.varient.map((varObj) => {
                                        // console.log(varObj);
                                        var key = Object.keys(varObj)[1];
                                        var varientType;
                                        var varientValue;
                                        if (key === "xl") {
                                          varientType = "XL";
                                          varientValue = varObj.xl;
                                        }

                                        if (key === "xs") {
                                          varientType = "XS";
                                          varientValue = varObj.xs;
                                        }

                                        if (key === "l") {
                                          varientType = "L";
                                          varientValue = varObj.l;
                                        }

                                        if (key === "sm") {
                                          varientType = "SM";
                                          varientValue = varObj.sm;
                                        }
                                        // console.log(key == "xl");

                                        return (
                                          <tr>
                                            <td>
                                              <b> {varientType} </b>
                                            </td>
                                            <td>
                                              <b> {varientValue} </b>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table className="action-table">
                        <td>
                          <button
                            className="action"
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                            }}
                            onClick={() => handleUpdate(product._id)}
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className="action"
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </table>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <p>Loading...</p>
          )}
        </table>
      </div>
      {isDeletePopupOpen && (
        <DeletePopup
          product={selectedProduct}
          handleDelete={handleDelete}
          handleClose={() => {
            setSelectedProduct(null);
            setDeletePopupOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Body;
