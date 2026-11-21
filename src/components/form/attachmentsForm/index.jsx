import React from "react";
import { useFormikContext } from "formik";
import useFormHook from "../../../../hooks/api/useFormHook";
import FileUploadDropzone from "../../FileUploadDropzone";

const formatBytes = (/** @type {number} */ bytes, decimals = 1) => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

function AttachmentsForm() {
  const { values, setFieldValue } = useFormikContext();
  const { uploadAttachments, loading } = useFormHook();

  const handleFilesSelected = async (/** @type {Iterable<any> | ArrayLike<any>} */ fileList) => {
    try {
      const uploadedFilesData = await uploadAttachments(fileList);
      const currentAttachments = values.attachments || [];
      setFieldValue("attachments", [
        ...currentAttachments,
        ...uploadedFilesData,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFile = (/** @type {any} */ indexToRemove) => {
    const updatedAttachments = values.attachments.filter(
      (/** @type {any} */ _, /** @type {any} */ index) => index !== indexToRemove,
    );
    setFieldValue("attachments", updatedAttachments);
  };

  return (
    <div className="form-body">
      <div className="header">
        <div className="title">
          <h4>Attachments</h4>
        </div>
        <span className="step">Step 3/3</span>
      </div>

      <FileUploadDropzone
        onFilesSelected={handleFilesSelected}
        isUploading={loading}
      />

      {values.attachments?.length > 0 && (
        <div className="uploaded-files-list">
          {values.attachments.map((/** @type {{ fileName: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; fileSize: any; }} */ file, /** @type {React.Key | null | undefined} */ index) => (
            <div key={index} className="uploaded-file-item">
              <div className="file-icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                    stroke="#BA1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="#BA1A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="12"
                    y="17"
                    fontSize="7"
                    fontWeight="bold"
                    fill="#BA1A1A"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    PDF
                  </text>
                </svg>
              </div>
              <div className="file-info">
                <span className="file-name">{file.fileName}</span>
                <span className="file-meta">
                  {formatBytes(file.fileSize)} • Uploaded
                </span>
              </div>
              <button
                type="button"
                className="remove-file-btn"
                onClick={() => handleRemoveFile(index)}
                aria-label="Remove file"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttachmentsForm;
