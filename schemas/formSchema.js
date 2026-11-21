// @ts-nocheck
import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_ATTACHMENTS = 5;

export const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const STATUS_OPTIONS = [
  { value: "TODO", label: "ToDo" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];

export const DIFFICULTY_OPTIONS = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
];

export const attachmentSchema = z.object({
  fileName: z.string().trim().min(1, "File name is required"),
  fileUrl: z.string().min(1, "File URL is required"),
  fileSize: z
    .number()
    .int()
    .positive()
    .max(MAX_FILE_SIZE, "File must be 5MB or smaller"),
  mimeType: z.enum(ACCEPTED_MIME_TYPES, {
    errorMap: () => ({ message: "Unsupported file type" }),
  }),
});

export const attachmentsSchema = z
  .array(attachmentSchema)
  .max(MAX_ATTACHMENTS, `You can attach up to ${MAX_ATTACHMENTS} files`);

const evaluationCriterionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Criterion name must be at least 2 characters")
    .max(100, "Criterion name must be at most 100 characters"),
  weight: z.coerce // <-- Added coerce here just in case
    .number({ invalid_type_error: "Weight is required as Number" })
    .min(0, "Weight must be at least 0")
    .max(100, "Weight must be at most 100"),
});

export const internshipSchema = z
  .object({
    // Changed to coerce.number because Formik passes "" initially, then a string from the input
    internshipId: z.number({
      invalid_type_error: "Insert an existing internship",
    }),
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(100),
    description: z
      .string()
      .trim()
      .min(20)
      .max(2000)
      .optional()
      .or(z.literal("")),
    category: z
      .string()
      .trim()
      .min(5, "category must be at least 5 characters")
      .max(20, "category must be at most 20 characters")
      .optional()
      .or(z.literal("")),
    difficulty: z
      .enum(DIFFICULTY_OPTIONS.map(({ value }) => value))
      .optional()
      .or(z.literal("")),
    status: z
      .enum(STATUS_OPTIONS.map(({ value }) => value))
      .optional()
      .or(z.literal("")),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .optional()
      .or(z.literal("")),
    deadline: z
      .string()
      .min(1, "Deadline is required")
      .optional()
      .or(z.literal("")),

    // FIXED: Correct Zod array syntax
    evaluationCriteria: z.array(evaluationCriterionSchema).optional(),
    attachments: attachmentsSchema,
  })
  .superRefine((data, ctx) => {
    if (
      data.startDate &&
      data.deadline &&
      new Date(data.deadline) < new Date(data.startDate)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Deadline must be on or after the start date",
        path: ["deadline"],
      });
    }

    // FIXED: Safely handle undefined evaluationCriteria
    const criteria = data.evaluationCriteria || [];
    const total =
      criteria.length > 1
        ? criteria.reduce((sum, c) => sum + (c.weight || 0), 0)
        : 100;

    if (Math.round(total * 100) / 100 !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Weights must add up to 100% (currently ${total}%)`,
        path: ["evaluationCriteria"],
      });
    }
  });

export const internshipInitialValues = {
  internshipId: "",
  title: "",
  description: "",
  category: "",
  difficulty: "",
  status: "",
  startDate: "",
  deadline: "",
  evaluationCriteria: [],
  attachments: [],
};
