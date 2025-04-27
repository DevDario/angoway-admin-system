import { useAuth } from "../hooks/useAuth";
import { BrowserRouter } from "react-router";
import AppRouter from "../routes/AppRouter"

function App() {
  const { isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (<BrowserRouter>
    <AppRouter />
  </BrowserRouter>);
}

export default App;
