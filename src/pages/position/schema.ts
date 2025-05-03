import * as Yup from 'yup';

export const AssignPositionSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
  roles: Yup.array()
    .of(Yup.string().required('Each role must be a string.'))
    .min(1, 'At least one role must be selected.')
    .required('Roles must not be empty.'),
});
