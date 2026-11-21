import { useFormikContext } from "formik";
import {
  DIFFICULTY_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../schemas/formSchema";
import DateInput from "../../dateInput";
import Input from "../../input";

/**
 * @param {React.ComponentProps<'div'> &
 * {
 *  "title": string,
 *  "desc"?: string,
 *  "order": number,
 *  "Icon": import("react").ReactElement,
 * }} props
 */
function BasicInformationForm({ title, order, Icon, ...rest }) {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    useFormikContext();

  return (
    <div className="form-body" {...rest}>
      <div className="header">
        <div className="title">
          <div>{Icon}</div>
          <h4>{title}</h4>
        </div>
        <span className="step">{`Step ${order}/3`}</span>
      </div>

      <Input
        required
        label="Internship ID"
        hint="Program ID"
        desc="This ID links the task to the academic internship registry records."
        name="internshipId"
        value={values.internshipId}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.internshipId && errors.internshipId}
      />

      <Input
        required
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.title && errors.title}
      />

      <Input
        label="Description & Technical Requirements"
        type="textbox"
        name="description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.description && errors.description}
      />

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
          <Input
            label="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.category && errors.category}
          />
        </div>
        <div style={{ gridArea: "1 / 3 / 2 / 5" }}>
          <Input
            label="Difficulty"
            type="select"
            name="difficulty"
            options={DIFFICULTY_OPTIONS}
            value={values.difficulty}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.difficulty && errors.difficulty}
          />
        </div>
        <div style={{ gridArea: "1 / 5 / 2 / 7" }}>
          <Input
            label="Initial Status"
            name="status"
            type="select"
            options={STATUS_OPTIONS}
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.status && errors.status}
          />
        </div>
        <div style={{ gridArea: "2 / 1 / 3 / 4" }}>
          <DateInput
            label="Start Date"
            name="startDate"
            value={values.startDate}
            onChange={(val) => setFieldValue("startDate", val)}
            error={touched.startDate && errors.startDate}
          />
        </div>
        <div style={{ gridArea: "2 / 4 / 3 / 7" }}>
          <DateInput
            label="Deadline"
            name="deadline"
            value={values.deadline}
            onChange={(val) => setFieldValue("deadline", val)}
            error={touched.deadline && errors.deadline}
          />
        </div>
      </div>
    </div>
  );
}

export default BasicInformationForm;
