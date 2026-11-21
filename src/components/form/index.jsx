import { Formik } from "formik";
import React from "react";
import BasicInformationForm from "./basicInfoForm";
import FeedbackBoardIcon from "../icons/feedbackBoard";

/**
 * @param {React.ComponentProps<'div'> &
 * {
 *  "initialValues": any,
 *  "evaluationCriteriaInfoFields": {string:any}
 *  "attachmentsFields": {string:any}
 * }} props
 */
function Form(props) {
  return (
    <div className="main-form">
      <Formik
        initialValues={props.initialValues}
        onSubmit={function (values, formikHelpers) {
          throw new Error("Function not implemented.");
        }}
      >
        <BasicInformationForm
          initialValues={undefined}
          title={"Basic Information"}
          order={1}
          Icon={<FeedbackBoardIcon className="Icon" />}
        />
      </Formik>
    </div>
  );
}

export default Form;
