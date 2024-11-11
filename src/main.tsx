import React from "react";
import ReactDOM from "react-dom/client";
import "bootswatch/dist/pulse/bootstrap.min.css";
import "./css/index.css";
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import DisplayPage from "./routes/display";
import ManagePage from "./routes/manage";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DisplayPage />,
      },
      {
        path: "/manage",
        element: <ManagePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <RouterProvider router={router} />
    </Authenticator>
  </React.StrictMode>
);
