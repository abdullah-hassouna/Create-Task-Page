import React, { useRef, useState } from "react";
import UploadIcon from "../icons/uploadIcon";
import SpinnerIcon from "../icons/spinnerIcon";

/**
 * @param {React.ComponentProps<'div'> & {
 *  onFilesSelected: (files: FileList) => void,
 *  isUploading?: boolean,
 * }} props
 */
function FileUploadDropzone({ onFilesSelected, isUploading, ...rest }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDragEnter = (
    /** @type {{ preventDefault: () => void; stopPropagation: () => void; }} */ e,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (
    /** @type {{ preventDefault: () => void; stopPropagation: () => void; }} */ e,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (
    /** @type {{ preventDefault: () => void; stopPropagation: () => void; }} */ e,
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (
    /** @type {{ preventDefault: () => void; stopPropagation: () => void; dataTransfer: { files: FileList; }; }} */ e,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (isUploading) return;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleChange = (
    /** @type {{ target: { files: string | any[] | FileList; }; }} */ e,
  ) => {
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
        {isUploading ? <SpinnerIcon className="spinner" /> : <UploadIcon />}
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
