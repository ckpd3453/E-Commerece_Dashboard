import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateForm = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    nameV: "",
    is_main: false,
    varient: "",
    quantity: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    vendors: [],
  });

  const [vendor, setVendor] = useState({
    nameV: "",
    is_main: false,
    varient: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalBody = {
      name: formData.name,
      description: formData.description,
      vendors: formData.vendors,
    };

    console.log(finalBody);
    axios
      .post("http://localhost:3001/api/v1/product/", finalBody)
      .then((res) => {
        alert("Product Added Successfull!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

    props.create(false);
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(175, 227, 227)",
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          marginTop: "50px",
          marginBottom: "50px",
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
        {formData.vendors?.map((vendor) => {
          return (
            <div
              style={{
                width: "83%",
                marginTop: "2em",
                height: "auto",
                border: "1px solid black",
                display: "flex",
              }}
            >
              <div style={{ width: "70%", height: "100%" }}>
                <input
                  type="text"
                  name="nameV"
                  id=""
                  placeholder="Vendor Name"
                  value={vendor.nameV}
                  style={{ height: "3em", width: "90%", marginTop: "2em" }}
                />

                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "2em",
                    marginBottom: "2em",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    {vendor.varient?.map((size) => {
                      const value = Object.values(size)[0];
                      const key = Object.keys(size)[0];
                      console.log("Indom------>", key, value);

                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
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
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      marginTop: "2em",
                      marginBottom: "2em",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <select
                      name="varient"
                      style={{ width: "25%", height: "2.5em" }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setData({ ...data, varient: e.target.value });
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
                      onChange={(e) => {
                        console.log(e.target.value);
                        setData({
                          ...data,
                          quantity: parseInt(e.target.value),
                        });
                      }}
                    />

                    <button
                      style={{
                        width: "120px",
                        borderRadius: "5px",
                        height: "2.5em",
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
                          alert("Varient Added Successfull!");
                          console.log("In dom Vendor", vendor);
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
                  style={{ width: "40px", height: "20px" }}
                />
                <span style={{ fontSize: "20px" }}>is Main</span>
              </div>
            </div>
          );
        })}
        <div
          style={{
            width: "83%",
            marginTop: "2em",
            height: "auto",
            border: "1px solid black",
            display: "flex",
          }}
        >
          <div style={{ width: "70%", height: "100%" }}>
            <input
              type="text"
              name="nameV"
              id=""
              placeholder="Vendor Name"
              onChange={(e) => setVendor({ ...vendor, nameV: e.target.value })}
              style={{ height: "3em", width: "90%", marginTop: "2em" }}
            />

            <div
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                marginTop: "2em",
                marginBottom: "2em",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                {vendor.varient?.map((size) => {
                  const value = Object.values(size)[0];
                  const key = Object.keys(size)[0];
                  console.log("Indom------>", key, value);

                  return (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
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
                      />
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  marginTop: "2em",
                  marginBottom: "2em",
                  justifyContent: "space-evenly",
                }}
              >
                <select
                  name="varient"
                  style={{ width: "25%", height: "2.5em" }}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setData({ ...data, varient: e.target.value });
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
                  onChange={(e) => {
                    console.log(e.target.value);
                    setData({
                      ...data,
                      quantity: parseInt(e.target.value),
                    });
                  }}
                />

                <button
                  style={{
                    width: "120px",
                    borderRadius: "5px",
                    height: "2.5em",
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
                      alert("Varient Added Successfull!");
                      console.log("In dom Vendor", vendor);
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
              onChange={(e) => {
                
                setVendor({
                  ...vendor,
                  is_main: e.target.checked ? true : false,
                });
              }}
              style={{ width: "40px", height: "20px" }}
            />
            <span style={{ fontSize: "20px" }}>is Main</span>
          </div>
        </div>
        <button
          style={{
            height: "3em",
            width: "150px",
            marginTop: "2em",
            marginLeft: "-45em",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (vendor.nameV) {
              if (vendor.varient.length > 0) {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  vendors: [...prevFormData.vendors, vendor],
                }));
                alert(
                  "Vendor Added successfull!, If you want to add more you can add one more!"
                );
              } else {
                alert("Please add atleast one varient!");
              }
            } else {
              alert("Please add vendor name");
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
            onClick={() => props.create(false)}
          >
            Cancel Button
          </button>
          <button style={{ height: "3em", width: "150px" }} type="submit">
            Submit Button
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
