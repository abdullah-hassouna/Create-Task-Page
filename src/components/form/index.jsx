import { Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import BasicInformationForm from "./basicInfoForm";
import FeedbackBoardIcon from "../icons/feedbackBoard";
import EvaluationCriteriaForm from "./evaluationForm";
import CorrectIcon from "../icons/correctIcon";
import useFormHook from "../../../hooks/api/useFormHook";
import AttachmentsForm from "./AttachmentsForm";
import InfoBanner from "../infoBanner";
import { internshipSchema } from "../../../schemas/formSchema";
import FormButtonBars from "../formButtonBars";
import AttachementIcon from "../icons/attachementIcon";
import CreateTaskHeader from "../createTaskHeader";

const DRAFT_KEY = "internship_task_draft";

const getSavedDraft = (/** @type {any} */ defaultValues) => {
  try {
    const saved = localStorage.getItem(DRAFT_KEY);
    return saved ? { ...defaultValues, ...JSON.parse(saved) } : defaultValues;
  } catch (err) {
    return defaultValues;
  }
};

const savefunc = (/** @type {any} */ values) => {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
};

function DraftSaver() {
  const { values } = useFormikContext();

  useEffect(() => {
    savefunc(values);
  }, [values]);

  return null;
}

/**
 *
 * @param {{ "initialValues" : any }} param0
 * @returns
 */
function Form({ initialValues, ...rest }) {
  const { createTask, error, loading, resetStates } = useFormHook();
  const [previewState, setPreviewState] = useState("default");

  const validate = (/** @type {unknown} */ values) => {
    const result = internshipSchema.safeParse(values);
    console.log(result);
    if (result.success) return {};
    const errors = {};
    JSON.parse(result.error.message).forEach(
      (/** @type {{ path: any[]; message: any; }} */ err) => {
        const path = err.path.join(".");
        // @ts-ignore
        if (!errors[path]) errors[path] = err.message;
      },
    );
    return errors;
  };

  return (
    <div className="main-form" {...rest}>
      <CreateTaskHeader
        // @ts-ignore
        activeState={previewState}
        onStateChange={setPreviewState}
      />
      <Formik
        initialValues={getSavedDraft(initialValues)}
        validate={validate}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const response = await createTask(values);
            alert(response.message || "Task created successfully!");
            resetForm();
            localStorage.removeItem(DRAFT_KEY);
          } catch (err) {
            alert(error);
          } finally {
            setSubmitting(false);
            resetStates();
          }
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Silently tracks and saves values to localStorage */}
            <DraftSaver />

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

            <AttachmentsForm
              title={"Attachments & Supporting Documents"}
              order={3}
              Icon={<AttachementIcon className="Icon" />}
            />

            <InfoBanner
              title="Direct Academic Supervision"
              desc="Field mentors will automatically review intern submissions based on your criteria."
            />

            <FormButtonBars
              saveDraftFunc={savefunc}
              loading={loading || formik.isSubmitting}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Form;
