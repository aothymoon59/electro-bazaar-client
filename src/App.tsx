import { ConfigProvider } from "antd";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#8850B3",
            headerColor: "white",
            headerSortHoverBg: "#8850B3",
            headerSortActiveBg: "#c17df5",
            rowHoverBg: "#e5caf9",
          },
        },
      }}
    >
      <MainLayout />
    </ConfigProvider>
  );
}

export default App;
