import Topbar from '@components/layout/Topbar';
import { Stack } from '@mui/material';
import testIds from '@testIds';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Topbar />

      <Stack
        component="main"
        data-testid={testIds.LayoutMain}
        sx={{
          flexGrow: 1,
          backgroundColor: 'grey.50',
          border: '1px solid',
          borderRadius: '8px',
          borderColor: 'grey.300',
          flexDirection: 'row',
        }}
      >
        <Outlet />
      </Stack>
    </>
  );
}
