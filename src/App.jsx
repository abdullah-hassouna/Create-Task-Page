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
      >
        <Input type="text" label="Internship ID" required hint="Program ID" />
      </Form>
    </section>
  );
}

export default App;
