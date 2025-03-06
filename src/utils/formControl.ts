import { ZodSchema } from 'zod';

export const formControl = (
  element: HTMLFormElement,
  validationSchema: ZodSchema
) => {
  const formData = new FormData(element);
  const formValues = Object.fromEntries(formData.entries());

  const result = validationSchema.safeParse(formValues);

  let formErrors: Record<string, string | null> = {};
  if (!result.success) {
    result.error.errors.forEach((err) => {
      formErrors[err.path[0]] = err.message;
    });
  } else {
    formErrors = {};
  }

  return { formValues, formErrors };
};
