import React from "react";

/**
 * @param {React.ComponentProps<'input'> & { label?: string } & { desc?: string } & { hint?: string } & { error?: string }} props
 */
function Input(props) {
  const labelId = props.label?.toLowerCase().replaceAll(" ", "-");

  return (
    <div className={"custom-input"}>
      <label id={labelId} htmlFor={labelId}>
        {props.label}
        <span style={{ color: "red" }}>{props.required ?? "*"}</span>
      </label>
      <input id={labelId} {...props} />
      <span className="hint">{props.hint}</span>
      <span>{props.desc}</span>
      <span style={{ color: "red" }}>{props.error}</span>
    </div>
  );
}

export default Input;
