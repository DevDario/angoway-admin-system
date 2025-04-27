import { useAuth } from "../hooks/useAuth";
import { BrowserRouter } from "react-router";
import AppRouter from "../routes/AppRouter"
import "./App.css"

function App() {
  const { isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return (
      <div className="loading-state">
        <p>Carregando...</p>
      </div>
    );
  }

  return (<BrowserRouter>
    <AppRouter />
  </BrowserRouter>);
}

export default App;
