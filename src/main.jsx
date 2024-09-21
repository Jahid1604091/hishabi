import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import PaperDetails from "./pages/admin/PaperDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route index path="/admin/paper-details" element={<PaperDetails />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 
);
