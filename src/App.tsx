import DefaultLayout from "./components/layout/DefaultLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <DefaultLayout />
    </ProtectedRoute>
  );
}

export default App;
