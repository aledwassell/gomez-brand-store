import logo from "./logo.svg";
import styles from "./App.module.css";
import Card from "./components/Card";
import Counter from "./components/Counter";

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Card />
        <Counter />
      </header>
    </div>
  );
}

export default App;
