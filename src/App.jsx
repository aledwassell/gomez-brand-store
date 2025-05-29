import styles from "./App.module.css";
import QuickCart from "./components/QuickCart";

function App(props) {
  return (
    <div class={styles.App}>
      <header>
        <QuickCart class="ml-auto" text="Cart" />
      </header>
      <main class="flex-1 flex items-center justify-center">
        {props.children}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
