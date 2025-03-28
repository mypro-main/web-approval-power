import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Grid from '@mui/material/Grid';
import { EditUserSchema } from '../schemas';
import { useGetUserStatuses } from '../../../services/user/hooks/use-get-user-statuses';
import { useGetUserRoles } from '../../../services/user/hooks/use-get-user-roles';
import Label from '../../../components/label';
import { useUpdateUser } from '../../../services/user/hooks/use-update-user';
import { IUserItem } from '../../../types/user';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser: IUserItem;
};

export default function UserQuickEditForm({ currentUser, open, onClose }: Props) {
  const { mutateUser, error } = useUpdateUser();
  const { statuses } = useGetUserStatuses();
  const { roles } = useGetUserRoles();

  const defaultValues = useMemo(
    () => ({
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      status: currentUser.status,
      jobTitle: currentUser.jobTitle ?? '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (error) {
      setError('email', error);
    }
  }, [error]);

  const onSubmit = handleSubmit(async (payload) => {
    const { id } = currentUser;
    await mutateUser({ id, payload });
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Update User</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} rowSpacing={4} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <RHFTextField name="name" label="Name" required />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="email" label="Email" required />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="jobTitle" label="Job Title" />
            </Grid>
            <Grid item xs={6}>
              <RHFSelect name="role" label="Role" required>
                {roles.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item xs={6}>
              <RHFSelect name="status" label="Status" required>
                {statuses.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    <Label
                      variant="soft"
                      color={
                        (status === 'active' && 'success') ||
                        (status === 'pending' && 'warning') ||
                        (status === 'banned' && 'error') ||
                        'default'
                      }
                      sx={{ cursor: 'pointer' }}
                    >
                      {status || 'All'}
                    </Label>
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
