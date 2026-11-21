import axios from "axios";
import { useState, useCallback } from "react";

// Base API URL from your Swagger docs
const apiClient = axios.create({
  baseURL: "https://create-task-api.onrender.com/api/v1",
});

function useFormHook() {
  const [res, setRes] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadAttachments = useCallback(
    async (/** @type {Iterable<any> | ArrayLike<any>} */ fileList) => {
      setLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        // Append files to FormData (API expects the field name "files")
        Array.from(fileList).forEach((file) => {
          formData.append("files", file);
        });

        const response = await apiClient.post("/task-attachment", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setRes(response.data);

        // Return the array of uploaded files exactly as Formik/Zod needs it
        return response.data.data;
      } catch (err) {
        setError(err.response?.data.message || "Failed to upload files");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createTask = useCallback(
    async (
      /** @type {{ internshipId: any; title: any; description: any; category: any; difficulty: any; status: any; startDate: any; deadline: any; evaluationCriteria: any; attachments: any; }} */ formValues,
    ) => {
      setLoading(true);
      setError(null);

      try {
        // Map Formik values to the exact CreateTaskDto format
        const payload = {
          internshipId: Number(formValues.internshipId),
          title: formValues.title,
          description: formValues.description,
          category: formValues.category,
          difficulty: formValues.difficulty,
          status: formValues.status,
          startDate: formValues.startDate,
          deadline: formValues.deadline,
          acceptedSubmissionTypes: ["URL", "FILE", "TEXT"],
          evaluationCriteria: formValues.evaluationCriteria,
          attachments: formValues.attachments,
        };

        const response = await apiClient.post("/tasks", payload);
        setRes(response.data);
        return response.data;
      } catch (err) {
        setError(err.response?.data.message || "Failed to create task");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const resetStates = useCallback(() => {
    setRes(null);
    // setError(null);
    setLoading(false);
  }, []);

  return {
    uploadAttachments,
    createTask,
    resetStates,
    res,
    error,
    loading,
  };
}

export default useFormHook;
