import { useAuthState } from "../hooks/useAuthState";
import { BrowserRouter } from "react-router";
import AppRouter from "../routes/AppRouter";
import "./App.css";

function App() {
  const { isCheckingAuth } = useAuthState();

  if (isCheckingAuth) {
    return (
      <div
        className="loading-state"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "#0C6BFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          Angoway
        </h1>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
