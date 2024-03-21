import { FlagViewContextProvider } from '@contexts/FlagView';
import useFlagsContext from '@hooks/context/useFlagsContext';
import { Divider, Fade, Stack } from '@mui/material';
import testIds from '@testIds';
import AddFlag from './AddFlag';
import EditFlag from './EditFlag';
import FlagList from './FlagList';

function PaneDivider() {
  return (
    <>
      <Divider
        flexItem
        orientation="horizontal"
        sx={{ display: { xs: 'block', sm: 'none' } }}
      />

      <Divider
        flexItem
        orientation="vertical"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      />
    </>
  );
}

export default function Panes() {
  const { selectedFlag } = useFlagsContext();

  return (
    <Fade appear in>
      <Stack
        gap={1}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ flexGrow: 1 }}
        data-testid={testIds.Flags.panes}
      >
        <FlagList />

        <PaneDivider />

        <Stack direction="row" sx={{ flexGrow: 1 }}>
          {!!selectedFlag ? (
            <FlagViewContextProvider key={selectedFlag.key} flag={selectedFlag}>
              <EditFlag key={selectedFlag.key} />
            </FlagViewContextProvider>
          ) : (
            <AddFlag />
          )}
        </Stack>
      </Stack>
    </Fade>
  );
}
