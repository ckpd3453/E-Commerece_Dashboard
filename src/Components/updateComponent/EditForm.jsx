import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditForm = (props) => {
  const productId = props.productId;

  console.log("Update id", props);
  const [data, setData] = useState({
    name: "",
    description: "",
    nameV: "",
    is_main: false,
    varient: "",
    quantity: 0,
  });

  const [formOneData, setFormOneData] = useState(null);

  const [vendor, setVendor] = useState(null);
  const [singleVendor, setSingleVendor] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalBody = {
      name: formOneData.name,
      description: formOneData.description,
      vendors: formOneData.vendors,
    };

    axios
      .put(`http://localhost:3001/api/v1/product/${formOneData._id}`, finalBody)
      .then((res) => {
        alert("Updated successfull!");
        props.update(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/product/")
      .then((product) => {
        var productToEdit = product.data.data.filter(
          (item) => item._id === productId
        );
        setFormOneData(
          productToEdit[0],
          setSingleVendor(productToEdit[0].vendors)
        );
        console.log(formOneData);
      })
      .catch((err) => {
        console.log("In Error");
        console.log(err);
      });
  }, [productId]);
  console.log("vchgfc", formOneData);

  return (
    <div
      style={{
        backgroundColor: "rgb(175, 227, 227)",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        height: "auto",
        alignItems: "center",
        marginTop: "3em",
      }}
    >
      {formOneData ? (
        <form
          action="#"
          id="form"
          onSubmit={handleSubmit}
          style={{
            width: "60%",
            height: "auto",
            backgroundColor: "whitesmoke",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              marginTop: "2em",
              justifyContent: "space-around",
            }}
          >
            <input
              type="text"
              className="name"
              placeholder="Name"
              name="name"
              value={formOneData.name}
              onChange={(e) =>
                setFormOneData({ ...formOneData, name: e.target.value })
              }
              style={{ height: "3em", width: "300px" }}
            />
            <textarea
              name="description"
              id=""
              style={{
                height: "3em",
                width: "300px",
                resize: "none",
                alignContent: "center",
              }}
              placeholder="Description"
              value={formOneData.description}
              onChange={(e) =>
                setFormOneData({ ...formOneData, description: e.target.value })
              }
            ></textarea>
          </div>
          {formOneData.vendors?.map((vendor) => (
            <div
              style={{
                width: "83%",
                marginTop: "2em",
                height: "auto",
                display: "flex",
              }}
              key={vendor._id}
            >
              <div style={{ width: "70%", height: "100%" }}>
                <input
                  type="text"
                  name="nameV"
                  id={vendor._id}
                  placeholder="Vendor Name"
                  value={vendor.nameV}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormOneData({
                      ...formOneData,
                      vendors: [
                        {
                          ...vendor,
                          nameV: newValue,
                        },
                        ...formOneData.vendors.slice(1),
                      ],
                    });
                  }}
                  style={{ height: "3em", width: "90%", marginTop: "2em" }}
                />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "80%",
                    }}
                  >
                    {vendor.varient?.map((size) => {
                      const value = Object.values(size)[1];
                      const key = Object.keys(size)[1];
                      return (
                        <div
                          key={size._id}
                          style={{
                            display: "flex",
                            marginTop: "2em",
                            marginBottom: "2em",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <select
                            name="varient"
                            style={{ width: "25%", height: "2.5em" }}
                            value={key}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setFormOneData({
                                ...formOneData.varient,
                                varient: e.target.value,
                              });
                            }}
                          >
                            <option value="sm">sm</option>
                            <option value="xs">xs</option>
                            <option value="l">l</option>
                            <option value="xl">xl</option>
                          </select>
                          <input
                            type="number"
                            name="number"
                            style={{ width: "120px" }}
                            placeholder="Number"
                            value={value}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setData({
                                ...data,
                                quantity: parseInt(e.target.value),
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    style={{
                      width: "120px",
                      borderRadius: "5px",
                      height: "2.5em",
                      marginBottom: "2.5em",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (data.varient && data.quantity > 0) {
                        setVendor((prevVendor) => ({
                          ...prevVendor,
                          varient: [
                            ...prevVendor.varient,
                            { [data.varient]: data.quantity },
                          ],
                        }));

                        alert("Varient Added Successfull!", vendor);
                        // setVarient({ variant: "", quantity: 0 });
                      } else {
                        console.log("min needed");
                      }
                    }}
                  >
                    Add Varient
                  </button>
                </div>
              </div>
              <div
                style={{
                  width: "28%",
                  height: "50px",
                  marginTop: "30px",
                }}
              >
                <input
                  type="radio"
                  name="is_main"
                  id=""
                  checked={vendor.is_main}
                  onChange={(e) =>
                    setVendor({ ...vendor, is_main: e.target.checked })
                  }
                  style={{ width: "40px", height: "20px" }}
                />
                <span style={{ fontSize: "20px" }}>is Main</span>
              </div>
            </div>
          ))}
          <button
            style={{
              height: "3em",
              width: "150px",
              marginTop: "2em",
              marginLeft: "-45em",
            }}
            onClick={(e) => {
              e.preventDefault();
              // Make sure there's a vendor name before adding
              if (vendor.nameV) {
                if (vendor.varient.length > 0) {
                  setFormOneData((prevformOneData) => ({
                    ...prevformOneData,
                    vendors: [...prevformOneData.vendors, vendor],
                  }));
                  alert(
                    "Vendor Added successfull!, If you want to add more you can add one more!"
                  );
                } else {
                  alert("Please add atleast one varient!");
                }

                // Clear the newVendor state
                // setVendor({
                //   nameV: "",
                //   is_main: true, // Reset is_main as true for a new vendor
                //   varient: [],
                // });
              }
            }}
          >
            Add Vendor
          </button>
          <div
            style={{
              marginTop: "2em",
              width: "70%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2em",
            }}
          >
            <button
              style={{ height: "3em", width: "150px" }}
              onClick={() => props.update(false)}
            >
              Cancel Button
            </button>
            <button
              style={{ height: "3em", width: "150px" }}
              type="submit"
              onClick={handleSubmit}
            >
              Update Button
            </button>
          </div>
        </form>
      ) : (
        <>
          <h4>Loading...</h4>
        </>
      )}
    </div>
  );
};

export default EditForm;
