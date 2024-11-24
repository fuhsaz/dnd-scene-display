import React from "react";
import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/vapor/bootstrap.min.css";
import "./css/index.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import DisplayPage from "./routes/display";
import ManagePage from "./routes/manage";
import { Authenticator } from "@aws-amplify/ui-react";
import { getScene, listScenes } from "./service/scene";
import SceneDetails from "./routes/sceneDetails";
import NewScene from "./routes/newScene";
import { Provider } from "react-redux";
import store from "./store";

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
        loader: async () => {
          return listScenes("all");
        }
      },
      {
        path: "/manage/:type",
        element: <ManagePage />,
        loader: async ({ params }) => {
          return listScenes(params.type ?? "all");
        },
        children: [
          {
            path: ":id",
            element: <SceneDetails />,
            loader: async ({ params }) => {
              return getScene(params.id || "");
            },
          },
          {
            path: "new",
            element: <NewScene />,
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <Provider store={store}>
        <RouterProvider router={router} />

      </Provider>
    </Authenticator>
  </React.StrictMode>
);
