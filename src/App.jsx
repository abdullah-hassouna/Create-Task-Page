import Input from "./components/input";
import "./App.css";

function App() {
  return (
    <section style={{ background: "var(--primary-forg-color)" }}>
      <Input type="text" label="Internship ID" required hint="Program ID" />
    </section>
  );
}

export default App;
