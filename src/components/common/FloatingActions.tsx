import Loading from '@components/common/Loading';
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
          <SpeedDialIcon />
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
        bottom: 32,
        right: 24,
        ...props?.sx,
      }}
    />
  );
}
