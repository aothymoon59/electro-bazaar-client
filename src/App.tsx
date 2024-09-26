import { ConfigProvider } from "antd";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
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
        },
      }}
    >
      <MainLayout />
    </ConfigProvider>
  );
}

export default App;
