import {
  DIFFICULTY_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../schemas/formSchema";
import DateInput from "../../dateInput";
import Input from "../../input";

/**
 * @param {React.ComponentProps<'div'> &
 * {
 *  "initialValues": any,
 *  "title": string,
 *  "desc"?: string,
 *  "order": number,
 *  "Icon": import("react").ReactElement,
 * }} props
 */
function BasicInformationForm(props) {
  const FormIcon = props.Icon;

  return (
    <div className="form-body">
      <div className="header">
        <div className="title">
          <div>{FormIcon}</div> <h4>{props.title}</h4>
        </div>
        <span className="step">{`Step ${props.order}/3`}</span>
      </div>
      <Input
        required
        label="Internship ID"
        hint="Program ID"
        desc="This ID links the task to the academic internship registry records."
      />
      <Input required label="Title" />
      <Input label="Description & Technical Requirements" type="textbox" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: "20px 24px",
          width: "100%",
        }}
      >
        <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
          <Input label="Category" name="category" />
        </div>
        <div style={{ gridArea: "1 / 3 / 2 / 5" }}>
          <Input
            label="Difficulty"
            type="select"
            options={DIFFICULTY_OPTIONS}
          />
        </div>
        <div style={{ gridArea: "1 / 5 / 2 / 7" }}>
          <Input
            label="Initial Status"
            name="status"
            type="select"
            options={STATUS_OPTIONS}
          />
        </div>
        <div style={{ gridArea: "2 / 1 / 3 / 4" }}>
          <DateInput label="Start Date" type="date" />
        </div>
        <div style={{ gridArea: "2 / 4 / 3 / 7" }}>
          <DateInput label="Deadline" type="date" />
        </div>
      </div>
    </div>
  );
}

export default BasicInformationForm;
