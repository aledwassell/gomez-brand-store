import styles from "./App.module.css";
import QuickCart from "./components/QuickCart";
import Products from "./components/Products";

function App() {
  return (
    <div class={styles.App}>
      <header>
        <QuickCart class="ml-auto" text="Cart" />
      </header>
      <main class="flex-1 flex items-center justify-center">
        <Products />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
