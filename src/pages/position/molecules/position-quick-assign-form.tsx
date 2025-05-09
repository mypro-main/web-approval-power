import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Grid from '@mui/material/Grid';
import { AssignPositionSchema } from '../schema';
import { IPositionItem } from '../../../types/position';
import { useAssignPosition } from '../../../services/position/hooks/use-assign-position';
import { RHFAutocompleteAsyncOnOpen } from '../../../components/hook-form/rhf-autocomplete';
import { RoleService } from '../../../services/role/role-service';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentPosition: IPositionItem;
};

export default function PositionQuickAssignForm({ currentPosition, open, onClose }: Props) {
  const { mutatePosition, error } = useAssignPosition();

  const roleService = new RoleService();

  const getRoles = async () => roleService.getAll();

  const defaultValues = useMemo(
    () => ({
      id: currentPosition.id || '',
      name: currentPosition.name || '',
      role: currentPosition.role || '',
      status: 'active',
      organizationName: '',
    }),
    [currentPosition]
  );

  const methods = useForm({
    resolver: yupResolver(AssignPositionSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (error) {
      setError('role', error);
    }
  }, [error]);

  const onSubmit = handleSubmit(async (payload) => {
    const { id } = currentPosition;

    await mutatePosition({ id, payload });
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
        <DialogTitle>Assign Position</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} rowSpacing={4} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <RHFTextField name="id" label="Position ID" disabled required />
            </Grid>
            <Grid item xs={6}>
              <RHFTextField name="name" label="Position" disabled required />
            </Grid>
            <Grid item xs={6}>
              <RHFAutocompleteAsyncOnOpen required name="role" label="Role" asyncFn={getRoles} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Assign
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
