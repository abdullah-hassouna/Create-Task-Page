// @ts-nocheck
import React, { useRef, useState } from "react";

/**
 * @param {React.ComponentProps<'div'> & {
 *  onFilesSelected: (files: FileList) => void,
 *  isUploading?: boolean,
 * }} props
 */
function FileUploadDropzone({ onFilesSelected, isUploading, ...rest }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  const handleClick = () => {
    if (!isUploading) inputRef.current?.click();
  };

  return (
    <div
      className={`file-dropzone ${isDragActive ? "drag-active" : ""} ${isUploading ? "uploading" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      {...rest}
    >
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleChange}
        className="hidden-file-input"
        accept=".pdf,.zip,.docx,.png"
      />

      <div className="upload-icon-wrapper">
        {isUploading ? (
          /* Loading Spinner */
          <svg
            className="spinner"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e40af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          /* Cloud Icon */
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e40af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            <path d="M12 15V9" />
            <path d="m9 12 3-3 3 3" />
          </svg>
        )}
      </div>

      <h4 className="upload-title">
        {isUploading
          ? "Uploading..."
          : "Drag files here or browse from your device"}
      </h4>
      <p className="upload-subtitle">
        Supported formats: PDF, ZIP, DOCX, PNG (Max 5 files, up to 20MB each)
      </p>
    </div>
  );
}

export default FileUploadDropzone;
