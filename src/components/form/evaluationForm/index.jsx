// @ts-nocheck
import React from "react";
import { useFormikContext, FieldArray } from "formik";
import DynamicRowInput from "../../dynamicRowInput";
import DoneIcon from "../../icons/doneIcon";

/**
 * @param {React.ComponentProps<'div'> &
 * {
 *  "title": string,
 *  "desc"?: string,
 *  "order": number,
 *  "Icon": import("react").ReactElement,
 * }} props
 */
function EvaluationCriteriaForm({ title, desc, order, Icon, ...rest }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  return (
    <div className="form-body" {...rest}>
      <div className="header">
        <div className="title">
          <div>{Icon}</div>
          <h4>{title}</h4>
        </div>
        <span className="step">{`Step ${order}/3`}</span>
      </div>

      {desc && <p className="desc">{desc}</p>}

      {errors.evaluationCriteria &&
        typeof errors.evaluationCriteria === "string" && (
          <span
            style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}
          >
            {errors.evaluationCriteria}
          </span>
        )}

      <FieldArray name="evaluationCriteria">
        {({ push, remove }) => (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {values.evaluationCriteria.length === 0 ? (
              <div style={{ margin: "0 auto", width: "fit-content" }}>
                <span
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Add some Evaluation Dimensions by the button below
                </span>
              </div>
            ) : (
              values.evaluationCriteria.map((criterion, index) => (
                <DynamicRowInput
                  key={index}
                  name={criterion.name}
                  weight={criterion.weight}
                  onChangeName={(val) =>
                    setFieldValue(`evaluationCriteria[${index}].name`, val)
                  }
                  onChangeWeight={(val) =>
                    setFieldValue(`evaluationCriteria[${index}].weight`, val)
                  }
                  onDelete={() => remove(index)}
                  error={
                    touched.evaluationCriteria?.[index]?.name &&
                    errors.evaluationCriteria?.[index]?.name
                  }
                />
              ))
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                onClick={() => push({ name: "", weight: 0 })}
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "fit-content",
                  border: "none",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 16px",
                  gap: "4px",
                  background: "#EAEDFF",
                  borderRadius: "8px",
                }}
              >
                + Add Criterion
              </button>

              <div
                style={{
                  background: "#7FFC97",
                  borderRadius: "25px",
                  padding: "6px 16px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <DoneIcon style={{ height: "15px" }} />
                <span> Total: 100 / 100% </span>
              </div>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default EvaluationCriteriaForm;
