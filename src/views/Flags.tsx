import Panes from '@components/flags/Panes';
import Content from '@components/layout/Content';
import { FlagsContextProvider } from '@contexts/Flags';
import testIds from '@testIds';

export default function Flags() {
  return (
    <FlagsContextProvider>
      <Content title="Flags" data-testid={testIds.Flags.content}>
        <Panes />
      </Content>
    </FlagsContextProvider>
  );
}
