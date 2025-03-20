import * as Yup from 'yup';

export const EditApprovalSchema = Yup.object({
  approvalStatus: Yup.string().required('Approval status must not be empty.'),
  reason: Yup.string().when('approvalStatus', {
    is: 'rejected',
    then: (schema) => schema.required('Jika status Rejected, alasan tidak boleh kosong.'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
