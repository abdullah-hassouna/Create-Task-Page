// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";

/**
 * @param {React.ComponentProps<'input'> & { label: string, desc?: string, hint?: string, error?: string | boolean | string[] | object }} props
 */
function DateInput(props) {
  const { label, value, onChange, hint, error, required, desc, ...rest } =
    props;
  const labelId = label?.toLowerCase().replaceAll(" ", "-");
  const hiddenInputRef = useRef(null);

  const [internalValue, setInternalValue] = useState(value || "");

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleOpenPicker = () => {
    if (hiddenInputRef.current) {
      try {
        if (typeof hiddenInputRef.current.showPicker === "function") {
          hiddenInputRef.current.showPicker();
        } else {
          hiddenInputRef.current.focus();
          hiddenInputRef.current.click();
        }
      } catch (err) {
        console.warn("Date picker could not open", err);
      }
    }
  };

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const dateParts = internalValue ? String(internalValue).split("-") : null;
  const year = dateParts?.[0];
  const month = dateParts?.[1];
  const day = dateParts?.[2];

  return (
    <div className="custom-input">
      <label id={labelId} htmlFor={labelId}>
        {label}
        <span style={{ color: "red", padding: "0 3px" }}>
          {required ? "*" : ""}
        </span>
      </label>

      <div className="custom-date-wrapper" onClick={handleOpenPicker}>
        <div className="visual-date-display">
          {internalValue ? (
            <>
              <span className="date-part day">{day}</span>
              <span className="date-separator">/</span>
              <span className="date-part month">{month}</span>
              <span className="date-separator">/</span>
              <span className="date-part year">{year}</span>
            </>
          ) : (
            <span className="date-placeholder">DD / MM / YYYY</span>
          )}
        </div>

        <input
          type="date"
          ref={hiddenInputRef}
          value={internalValue}
          onChange={handleDateChange}
          {...rest}
          className="hidden-native-date"
        />
      </div>

      <span className="hint">{hint}</span>
      <span>{desc}</span>
      {typeof error === "string" && (
        <span style={{ color: "red" }}>{error}</span>
      )}
    </div>
  );
}

export default DateInput;
