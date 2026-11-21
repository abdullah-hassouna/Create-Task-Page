import React from "react";

/**
 * @param {React.ComponentProps<'input'> & React.ComponentProps<'textarea'> & React.ComponentProps<'select'> & { type?: (import("react").HTMLInputTypeAttribute) &  (import("react").HTMLInputTypeAttribute | "select" | "textbox" | undefined)} & { label: string } & { desc?: string } & { options?: any[] } & { hint?: string } & { error?: string | boolean | string[] | object }} props
 */
function Input(props) {
  const {
    label,
    type,
    desc,
    options,
    hint,
    error,
    required,
    className,
    ...rest
  } = props;

  const labelId = label?.toLowerCase().replaceAll(" ", "-");

  return (
    <div className={`custom-input ${className || ""}`}>
      <label id={labelId} htmlFor={labelId}>
        {label}
        <span style={{ color: "red", padding: "0 3px" }}>
          {required ? "*" : ""}
        </span>
      </label>

      {type === "textbox" ? (
        <textarea rows={4} id={labelId} {...rest} />
      ) : type === "select" ? (
        <select id={labelId} {...rest}>
          {options?.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={labelId} type={type} {...rest} />
      )}

      <span className="hint">{hint}</span>
      <span>{desc}</span>
      {typeof error === "string" && (
        <span style={{ color: "red" }}>{error}</span>
      )}
    </div>
  );
}

export default Input;
