import { useAuthState } from "../hooks/useAuthState";
import { BrowserRouter } from "react-router";
import AppRouter from "../router/AppRouter";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const { isCheckingAuth } = useAuthState();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isCheckingAuth || showLoading) {
    return (
      <div
        className="loading-state"
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
          margin:"0 auto",
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
        <p>
          Carregando
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
        <style>
          {`
            .loading-dots span {
              opacity: 0;
              animation: blink 1.4s infinite;
              font-weight: bold;
              font-size: 1.5em;
            }
            .loading-dots span:nth-child(1) { animation-delay: 0s; }
            .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
            .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

            @keyframes blink {
              0% { opacity: 0; }
              20% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}
        </style>
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
