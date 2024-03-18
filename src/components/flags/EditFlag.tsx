import { Fade } from '@mui/material';
import testIds from '@testIds';
import FlagAction from './FlagAction';

export default function EditFlag({ flag }: { flag: Flag }) {
  return (
    <Fade appear in>
      <div data-testid={testIds.Flags.pane_edit}>
        <FlagAction key={flag.key} edit flag={flag} />

        <pre>{JSON.stringify(flag, undefined, 2)}</pre>
      </div>
    </Fade>
  );
}
