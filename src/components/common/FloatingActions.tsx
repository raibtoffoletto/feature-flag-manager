import Loading from '@components/common/Loading';
import { Close as CloseIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { SpeedDial, SpeedDialIcon, SpeedDialProps } from '@mui/material';

export default function FloatingActions({
  loading,
  ...props
}: Partial<SpeedDialProps> & { loading?: boolean }) {
  return (
    <SpeedDial
      ariaLabel="floating actions"
      {...props}
      icon={
        loading ? (
          <Loading CircularProgressProps={{ color: 'inherit', size: 32, thickness: 6 }} />
        ) : (
          <SpeedDialIcon icon={<SettingsIcon />} openIcon={<CloseIcon />} />
        )
      }
      FabProps={{
        size: 'small',
        sx: {
          '& > div': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        ...props?.FabProps,
      }}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 8,
        ...props?.sx,

        '& .MuiSpeedDialAction-staticTooltipLabel': {
          whiteSpace: 'nowrap',
        },
      }}
    />
  );
}
