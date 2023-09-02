import { AppBar } from '@mui/material';
import testIds from '@testIds';
import AppTitle from './AppTitle';
import UserMenu from './UserMenu';

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
        flexShrink: 0,
      }}
    >
      <AppTitle />

      <UserMenu />
    </AppBar>
  );
}
