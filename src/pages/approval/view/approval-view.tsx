import { Button, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { RouterLink } from '../../../components/router-link';
import { paths } from '../../paths';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
import { useCallback, useMemo, useState } from 'react';
import {
  getComparator,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeleton,
  useTable,
} from '../../../components/table';
import { useDebounceQuery } from '../../../hooks/use-debounce';
import isEqual from 'lodash/isEqual';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Label from '../../../components/label';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from '../../../components/scrollbar/scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useGetAllApproval } from '../../../services/approval/hooks/use-get-all-approval';
import ApprovalTableToolbar from '../molecules/approval-table-toolbar';
import ApprovalTableFiltersResult from '../molecules/approval-table-filters-result';
import ApprovalTableRow from '../molecules/approval-table-row';
import { IApprovalItem, IApprovalTableFilters } from '../../../types/approval';
import { GetAllApprovalParams } from '../../../services/approval/approval.request';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 300 },
  { id: 'name', label: 'Name', width: 300 },
  { id: 'status', label: 'Status', width: 300 },
  { id: '', width: 100 },
];

const defaultFilters: IApprovalTableFilters = {
  name: '',
  status: '',
};

export function ApprovalView() {
  const [filters, setFilters] = useState(defaultFilters);

  const table = useTable({
    defaultRowsPerPage: 5,
  });

  const query = useMemo(
    () => ({
      page: table.page + 1,
      perPage: table.rowsPerPage,
      name: filters.name,
    }),
    [table.page, table.rowsPerPage, filters]
  );

  const debouncedQuery = useDebounceQuery<GetAllApprovalParams>(query, 'name');

  const { approvals, meta, isFetching, error } = useGetAllApproval(debouncedQuery);

  const settings = useSettingsContext();

  const filteredApprovals = applyFilter({
    inputData: approvals,
    comparator: getComparator(table.order, table.orderBy),
  });

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !!error;

  const handleFilters = useCallback(
    (key: string, value: string) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [table]
  );

  const handleFilterStatus = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Approval"
        links={[{ name: 'Main Hub' }, { name: 'Approval' }]}
        action={
          <Stack direction="row" gap={1}>
            <Button
              component={RouterLink}
              href={paths.approval.root}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Button
            </Button>
          </Stack>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Tabs
          value={filters.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab, i) => (
            <Tab
              key={i}
              iconPosition="end"
              value={tab.value}
              icon={
                <Label
                  variant={
                    ((tab.value === '' || tab.value === filters.status) && 'filled') || 'soft'
                  }
                  color={
                    (tab.value === 'active' && 'success') ||
                    (tab.value === 'inactive' && 'error') ||
                    'default'
                  }
                  sx={{ cursor: 'pointer' }}
                >
                  {tab.label}
                </Label>
              }
            />
          ))}
        </Tabs>

        <ApprovalTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <ApprovalTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={filteredApprovals.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={approvals.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                approvals.map((row) => row.id)
              )
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={approvals.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {isFetching ? (
                  [...Array(table.rowsPerPage)].map((_i, index) => (
                    <TableSkeleton
                      key={index}
                      sx={{ height: denseHeight }}
                      colSpan={TABLE_HEAD.length}
                    />
                  ))
                ) : (
                  <>
                    {filteredApprovals.map((row) => (
                      <ApprovalTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                      />
                    ))}
                  </>
                )}

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={meta?.record.total || 0}
          page={table.page && meta?.record.total ? table.page : 0}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: IApprovalItem[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
