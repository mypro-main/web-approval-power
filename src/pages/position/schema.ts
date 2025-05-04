import * as Yup from 'yup';

export const AssignPositionSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
  role: Yup.string().required('Role must not be empty.'),
});
