import * as Yup from 'yup';

export const EditApprovalSchema = Yup.object({
  name: Yup.string().required('Name must not be empty.'),
});
