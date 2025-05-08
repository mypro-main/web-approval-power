import * as Yup from 'yup';

export const CreatePositionSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
  role: Yup.string().required('Role must not be empty.'),
});

export const AssignPositionSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
  role: Yup.string().required('Role must not be empty.'),
  status: Yup.string().required('Status must not be empty.'),
  organizationName: Yup.string().optional(),
});
