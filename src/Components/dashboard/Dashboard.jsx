import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import HeaderBar from "../header/HeaderBar";
import Body from "../mainBody/Body";
import EditForm from "../updateComponent/EditForm";
import CreateForm from "../createForm/CreateForm";

export default function Dashboard() {
  const [update, setUpdate] = useState({
    productId: "",
    status: false,
  });
  const [create, setCreate] = useState(false);
  const [body, setBody] = useState(true);

  return (
    <div style={{ width: "100vw", height: "auto", display: "flex" }}>
      <Sidebar />

      <div style={{ width: "100vw", height: "100%" }}>
        <HeaderBar />
        {update.status ? (
          <EditForm productId={update.productId} update={setUpdate} />
        ) : create ? (
          <CreateForm create={setCreate} />
        ) : (
          <Body create={setCreate} update={setUpdate} />
        )}
      </div>
    </div>
  );
}
