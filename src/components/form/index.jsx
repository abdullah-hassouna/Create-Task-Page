import { Formik } from "formik";
import BasicInformationForm from "./basicInfoForm";
import FeedbackBoardIcon from "../icons/feedbackBoard";
import EvaluationCriteriaForm from "./evaluationForm";
import CorrectIcon from "../icons/correctIcon";
import useFormHook from "../../../hooks/api/useFormHook";
import AttachmentsForm from "./AttachmentsForm";
import InfoBanner from "../infoBanner";
import { internshipSchema } from "../../../schemas/formSchema";
import FormButtonBars from "../formButtonBars";

/**
 *
 * @param {{ "initialValues" : any }} param0
 * @returns
 */

function Form({ initialValues, ...rest }) {
  const { createTask, loading } = useFormHook();

  const validate = (/** @type {unknown} */ values) => {
    const result = internshipSchema.safeParse(values);
    if (result.success) return {};
    const errors = {};
    JSON.parse(result.error.message).forEach(
      (/** @type {{ path: any[]; message: any; }} */ err) => {
        const path = err.path.join(".");
        if (!errors[path]) errors[path] = err.message;
      },
    );
    return errors;
  };

  return (
    <div className="main-form" {...rest}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, { resetForm }) => {
          try {
            // console.log(values);
            const response = await createTask(values);
            alert(response.message || "Task created successfully!");
            resetForm();
          } catch (err) {
            // Error is already set in the hook, you can show a toast here
          }
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <BasicInformationForm
              title={"Basic Information"}
              order={1}
              Icon={<FeedbackBoardIcon className="Icon" />}
            />

            <EvaluationCriteriaForm
              title={"Evaluation Criteria"}
              desc={
                "Define evaluation dimensions and percentage weights. Total must equal 100% to ensure academic grading equity."
              }
              order={2}
              Icon={<CorrectIcon className="Icon" />}
            />

            <AttachmentsForm />

            <InfoBanner
              title="Direct Academic Supervision"
              desc="Field mentors will automatically review intern submissions based on your criteria."
            />

            <FormButtonBars loading={loading || formik.isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Form;
