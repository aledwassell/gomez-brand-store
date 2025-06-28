import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import QuickCart from "./components/QuickCart";
import ComingSoon from "./components/ComingSoon";
import { appTitle } from "./constants/app-title";

export default function App() {
  const showComingSoon = import.meta.env.MODE === "production";

  const handleCheck = () => {
    console.log("All env vars:", import.meta.env);
    console.log("Specific var:", import.meta.env.VITE_SHOW_COMING_SOON);
  };

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{appTitle}</Title>
          <div class="flex flex-col items-center bg-slate-800 min-h-screen text-white">
            {!showComingSoon && (
              <header>
                <ErrorBoundary fallback={(err) => err}>
                  <QuickCart />
                </ErrorBoundary>
                <button class="bg-amber-500 p-5" onClick={() => handleCheck()}>
                  check
                </button>
              </header>
            )}
            <Suspense>
              <main class="flex-1 flex items-center justify-center">
                {showComingSoon ? <ComingSoon /> : props.children}
              </main>
            </Suspense>
            {!showComingSoon && <footer></footer>}
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
