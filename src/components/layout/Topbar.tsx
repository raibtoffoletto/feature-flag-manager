import { AppBar } from '@mui/material';
import testIds from '@testIds';
import UserMenu from './UserMenu';
import AppTitle from './AppTitle';

export default function Topbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      data-testid={testIds.Topbar}
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
