import { Theme, alpha } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { tableRowClasses } from '@mui/material/TableRow';
import { styled } from '@mui/material';

// ----------------------------------------------------------------------

export const StickyTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    padding: 0,
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1,
    borderBottom: `none`,
    backgroundColor: theme.palette.background.paper,
  },
  '&.MuiTableCell-body': {
    padding: 0,
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 1,
    borderBottom: `none`,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: alpha(theme.palette.primary.dark, 0.04),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.dark, 0.08),
            },
          },
          '&:last-of-type': {
            [`& .${tableCellClasses.root}`]: {
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomStyle: 'dashed',
        },
        head: {
          fontSize: 14,
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.fontWeightSemiBold,
          backgroundColor: theme.palette.background.paper,
        },
        stickyHeader: {
          // backgroundColor: theme.palette.background.paper,
          // backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          width: '100%',
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: 8,
        },
        select: {
          paddingLeft: 8,
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          right: 4,
          width: 16,
          height: 16,
          top: 'calc(50% - 8px)',
        },
      },
    },
  };
}
