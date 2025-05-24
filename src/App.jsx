import styles from "./App.module.css";
import QuickCart from "./components/QuickCart";

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <QuickCart class="ml-auto" text="Cart" />
      </header>
      <main class="flex-1">main</main>
      <footer class={styles.footer}>footer</footer>
    </div>
  );
}

export default App;
