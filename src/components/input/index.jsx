import React from "react";

/**
 * @param {React.ComponentProps<'input'> & React.ComponentProps<'textarea'> & React.ComponentProps<'select'> & { type?: (import("react").HTMLInputTypeAttribute) &  (import("react").HTMLInputTypeAttribute | "select" | "textbox" | undefined)} & { label: string } & { desc?: string } & { options?: any[] } & { hint?: string } & { error?: string }} props
 */
function Input(props) {
  const labelId = props.label?.toLowerCase().replaceAll(" ", "-");

  return (
    <div className={"custom-input"}>
      <label id={labelId} htmlFor={labelId}>
        {props.label}
        <span style={{ color: "red", padding: "0 3px" }}>
          {props.required ? "*" : ""}
        </span>
      </label>
      {props.type === "textbox" ? (
        <textarea rows={4} id={labelId} {...props}>
          {props.value}
        </textarea>
      ) : props.type === "select" ? (
        <select id={labelId} {...props}>
          {props.options?.map((op) => (
            <option id={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={labelId} {...props} />
      )}
      <span className="hint">{props.hint}</span>
      <span>{props.desc}</span>
      <span style={{ color: "red" }}>{props.error}</span>
    </div>
  );
}

export default Input;
