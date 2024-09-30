import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#2A2F4F",
              headerColor: "#ffffff",
              headerSortHoverBg: "#021224",
              headerSortActiveBg: "#0E0F27",
              rowHoverBg: "#F7F7F7",
            },
            Input: {
              activeBorderColor: "#2A2F4F",
              hoverBorderColor: "#2A2F4F",
            },
            Pagination: {
              itemActiveBg: "#2A2F4F",
            },
          },
        }}
      >
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster />
          <Analytics />
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
