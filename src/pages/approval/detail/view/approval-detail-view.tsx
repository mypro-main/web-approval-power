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

const MOCK_HISTORY = [
  {
    id: '123',
    type: 'Approval',
    title: 'Super Admin has verified and confirmed approval for the @mockuser1 registration',
    time: new Date(),
  },
  {
    id: '123',
    type: 'Approval',
    title: 'Super Admin has verified and confirmed approval for the @mockuser1 registration',
    subtitle: 'OK this is approved',
    time: new Date(),
  },
  {
    id: '123',
    type: 'Approval',
    title: 'Super Admin has verified and confirmed approval for the @mockuser1 registration',
    time: new Date(),
  },
];

type Props = {
  id: string;
};

export function ApprovalDetailView({ id }: Props) {
  const settings = useSettingsContext();

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
              <DetailsBoxItem title="NIK" content="Mock Data" />
              <DetailsBoxItem title="Nama" content="Mock Data" />
              <DetailsBoxItem title="No Handphone" content="Mock Data" />
              <DetailsBoxItem title="Email" content="Mock Data" />
              <DetailsBoxItem title="Tanggal Lahir" content="Mock Data" />
              <DetailsBoxItem title="Kode Outlet" content="Mock Data" />
              <DetailsBoxItem title="Nama Outlet" content="Mock Data" />
              <DetailsBoxItem title="Territory" content="Mock Data" />
              <DetailsBoxItem title="Region" content="Mock Data" />
              <DetailsBoxItem title="Status" content="Mock Data" />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Approval History" />
          <CardContent>
            <ApprovalHistory title="Title" subheader="Subtitle" list={MOCK_HISTORY} />
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
