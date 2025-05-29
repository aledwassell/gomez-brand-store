import { lazy } from "solid-js";
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Router, Route } from "@solidjs/router";

import Products from "./pages/Products";
const ProductPage = lazy(() => import("./pages/ProductPage"));
import NotFound from "./pages/NotFound";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Products} />
      <Route path="/:id" component={ProductPage} />
      <Route path="*404" component={NotFound} />
    </Router>
  ),
  root
);
