import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { EditApprovalSchema } from '../../schemas';
import { IApprovalItem } from '../../../../types/approval';

type Props = {
  open: boolean;
  onClose: () => void;
  currentItem?: IApprovalItem;
};

export function ApprovalQuickEditForm({ currentItem, open, onClose }: Props) {
  const defaultValues = useMemo(
    () => ({
      name: currentItem?.name || '',
    }),
    [currentItem]
  );

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(EditApprovalSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (currentItem) {
      const { id } = currentItem;
      const payload = {
        name: data.name,
      };

      // await mutateRegion({ id, payload });
      console.log(id, payload);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Update Region</DialogTitle>

        <DialogContent>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <RHFTextField name="name" label="Name" required />
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
