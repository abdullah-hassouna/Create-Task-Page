// @ts-ignore
import "./App.css";
import Form from "./components/form";
import { internshipInitialValues } from "../schemas/formSchema";

function App() {
  return (
    <section>
      <Form initialValues={internshipInitialValues} />
    </section>
  );
}

export default App;
