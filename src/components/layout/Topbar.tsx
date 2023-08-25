import { AppBar } from '@mui/material';
import UserMenu from './UserMenu';
import AppTitle from './AppTitle';

export default function Topbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        py: 1,
        backgroundColor: 'common.white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <AppTitle />

      <UserMenu />
    </AppBar>
  );
}
