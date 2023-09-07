import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Outlet />
    </>
  );
}
