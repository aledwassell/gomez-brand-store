import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import QuickCart from "./components/QuickCart";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <div class="flex flex-col items-center text-center bg-slate-800 min-h-screen text-white">
            <header>
              <ErrorBoundary fallback={(err) => err}>
                <QuickCart />
              </ErrorBoundary>
            </header>
            <Suspense>
              Well this is finally working
              <main class="flex-1 flex items-center justify-center">
                {props.children}
              </main>
            </Suspense>
            <footer></footer>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
