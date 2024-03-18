import { URLActions } from '@constants';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { Fab } from '@mui/material';
import testIds from '@testIds';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlagModal from './FlagModal';

type FlagActionProps =
  | {
      edit?: false;
      flag?: undefined;
    }
  | {
      edit: true;
      flag: Flag;
    };

export default function FlagAction({ edit, flag }: FlagActionProps) {
  const [params, setParams] = useSearchParams();

  const isOpen = useMemo(
    () =>
      edit
        ? params.get(URLActions.action) === URLActions.edit
        : params.get(URLActions.action) === URLActions.add,
    [edit, params],
  );

  return (
    <>
      <Fab
        color="primary"
        aria-label="add new flag"
        size="small"
        data-testid={testIds.Flags.modal_fab}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() =>
          setParams((_params) => {
            _params.set(URLActions.action, edit ? URLActions.edit : URLActions.add);

            return _params;
          })
        }
      >
        {edit ? <EditIcon /> : <AddIcon />}
      </Fab>

      {isOpen && <FlagModal flag={flag} />}
    </>
  );
}
