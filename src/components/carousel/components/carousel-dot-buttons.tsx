import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { carouselClasses } from '../classes';

import type { CarouselDotButtonsProps } from '../types';
import { useSettingsContext } from '../../settings';

// ----------------------------------------------------------------------

export function CarouselDotButtons({
  sx,
  gap,
  slotProps,
  onClickDot,
  scrollSnaps,
  selectedIndex,
  variant = 'circular',
  className,
  ...other
}: BoxProps & CarouselDotButtonsProps) {
  const theme = useTheme();
  const { themeMode } = useSettingsContext();

  const GAPS = {
    number: gap ?? 6,
    rounded: gap ?? 2,
    circular: gap ?? 2,
  };

  const SIZES = {
    circular: slotProps?.dot?.size ?? 18,
    number: slotProps?.dot?.size ?? 28,
  };

  const dotStyles = {
    circular: (selected: boolean) => ({
      width: SIZES.circular,
      height: SIZES.circular,
      '&::before': {
        width: 8,
        height: 8,
        content: '""',
        opacity: 0.24,
        borderRadius: '50%',
        bgcolor: 'currentColor',
        transition: theme.transitions.create(['opacity'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.short,
        }),
        ...(selected && { opacity: 1 }),
      },
    }),
    rounded: (selected: boolean) => ({
      width: SIZES.circular,
      height: SIZES.circular,
      '&::before': {
        width: 8,
        height: 8,
        content: '""',
        opacity: 0.24,
        borderRadius: '50%',
        bgcolor: 'currentColor',
        transition: theme.transitions.create(['width', 'opacity'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.short,
        }),
        ...(selected && { width: 'calc(100% - 4px)', opacity: 1, borderRadius: 1 }),
      },
    }),
    number: (selected: boolean) => ({
      width: SIZES.number,
      height: SIZES.number,
      borderRadius: '50%',
      typography: 'caption',
      color: 'text.disabled',
      border: `solid 1px ${alpha(theme.palette.grey['500'], 0.16)}`,
      ...(selected && {
        color: 'common.white',
        bgcolor: 'text.primary',
        fontWeight: 'fontWeightSemiBold',
        [themeMode]: { color: 'grey.800' },
      }),
    }),
  };

  return (
    <Box
      component="ul"
      className={carouselClasses.dots.concat(className ? ` ${className}` : '')}
      sx={{
        zIndex: 9,
        display: 'flex',
        ...(variant === 'circular' && { gap: `${GAPS.circular}px`, height: SIZES.circular }),
        ...(variant === 'rounded' && { gap: `${GAPS.rounded}px`, height: SIZES.circular }),
        ...(variant === 'number' && { gap: `${GAPS.number}px`, height: SIZES.number }),
        ...sx,
      }}
      {...other}
    >
      {scrollSnaps.map((_, index) => {
        const selected = index === selectedIndex;

        return (
          <Box component="li" key={index} sx={{ display: 'inline-flex' }}>
            <ButtonBase
              disableRipple
              aria-label={`dot-${index}`}
              className={carouselClasses.dot.concat(
                selected ? ` ${carouselClasses.state.selected}` : ''
              )}
              onClick={() => onClickDot(index)}
              sx={{
                ...(variant === 'circular' && dotStyles.circular(selected)),
                ...(variant === 'rounded' && dotStyles.rounded(selected)),
                ...(variant === 'number' && dotStyles.number(selected)),
                [`&.${carouselClasses.state.selected}`]: {
                  ...slotProps?.dot?.selected,
                },
                ...slotProps?.dot?.sx,
              }}
            >
              {variant === 'number' && index + 1}
            </ButtonBase>
          </Box>
        );
      })}
    </Box>
  );
}
