import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Stack from '@mui/material/Stack';
import { CardContent } from '@mui/material';
import { paths } from '../../../paths';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useSettingsContext } from '../../../../components/settings';
import { DetailsBoxItem } from '../molecules/detail-box-item';
import Box from '@mui/material/Box';
import { ApprovalHistory } from '../molecules/approval-history';
import { useGetAppoval } from '../../../../services/approval/hooks/use-get-approval';
import capitalize from '@mui/utils/capitalize';
import Label from '../../../../components/label';
import { fDateISOString } from '../../../../utils/format-time';

type Props = {
  id: string;
};

export function ApprovalDetailView({ id }: Props) {
  const settings = useSettingsContext();

  const { approval, isFetching } = useGetAppoval(id);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (!approval) {
    return <p>No data</p>;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Approval Detail"
        links={[
          { name: 'Main Hub' },
          { name: 'Approval List', href: paths.approval.root },
          {
            name: 'Approval Detail',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack gap={2}>
        <Card>
          <CardHeader title="User Information" />
          <CardContent>
            <Box
              columnGap={2}
              rowGap={1.5}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            >
              <DetailsBoxItem title="NIK" content={approval.identityCardNumber} />
              <DetailsBoxItem title="Nama" content={approval.name} />
              <DetailsBoxItem title="No Handphone" content={approval.phoneNumber} />
              <DetailsBoxItem title="Email" content={approval.email} />
              <DetailsBoxItem
                title="Tanggal Lahir"
                content={fDateISOString(approval.birthDate, true)}
              />
              <DetailsBoxItem title="Kode Outlet" content={approval.outletId} />
              <DetailsBoxItem title="Nama Outlet" content={approval.outlet.name} />
              <DetailsBoxItem title="Territory" content={approval.outlet.territory.name} />
              {/*<DetailsBoxItem title="Region" content="Mock Data" />*/}
              <DetailsBoxItem
                title="Status Akun"
                content={
                  <Label
                    variant="soft"
                    color={(approval.status === 'active' && 'success') || 'warning'}
                    sx={{ cursor: 'pointer' }}
                  >
                    {capitalize(approval.status || '')}
                  </Label>
                }
              />
              <DetailsBoxItem
                title="Status Approval"
                content={
                  <Label
                    variant="soft"
                    color={
                      (approval.requestOwnerStatus === 'requested' && 'warning') ||
                      (approval.requestOwnerStatus === 'approved' && 'success') ||
                      (approval.requestOwnerStatus === 'verified' && 'info') ||
                      (approval.requestOwnerStatus === 'rejected' && 'error') ||
                      'default'
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    {capitalize(approval.requestOwnerStatus || '')}
                  </Label>
                }
              />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Approval History" />
          <CardContent>
            <ApprovalHistory list={approval.history} />
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
