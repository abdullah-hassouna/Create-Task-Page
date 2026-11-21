import Input from "./components/input";
import "./App.css";
import Form from "./components/form";
import { internshipInitialValues } from "../schemas/formSchema";

function App() {
  return (
    <section>
      <Form
        initialValues={internshipInitialValues}
        evaluationCriteriaInfoFields={{
          string: undefined,
        }}
        attachmentsFields={{
          string: undefined,
        }}
      />
    </section>
  );
}

export default App;
