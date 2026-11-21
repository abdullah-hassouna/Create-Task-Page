// @ts-nocheck
import { Formik } from "formik";
import React from "react";
import BasicInformationForm from "./basicInfoForm";
import FeedbackBoardIcon from "../icons/feedbackBoard";
import EvaluationCriteriaForm from "./evaluationForm";
import CorrectIcon from "../icons/correctIcon";
import { internshipSchema } from "../../../schemas/formSchema";

function Form({
  initialValues,
  evaluationCriteriaInfoFields,
  attachmentsFields,
  ...rest
}) {
  const validate = (values) => {
    const result = internshipSchema.safeParse(values);
    if (result.success) return {};
    const errors = {};
    result.error.errors.forEach((err) => {
      const path = err.path.join(".");
      if (!errors[path]) errors[path] = err.message;
    });
    return errors;
  };

  return (
    <div className="main-form" {...rest}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          console.log("Form Submitted", values);
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

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Form;
