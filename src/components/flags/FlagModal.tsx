import { deleteFlag, putFlag } from '@api/app';
import { URLActions } from '@constants';
import useFlagsContext from '@hooks/context/useFlagsContext';
import {
  AddCircle as AddCircleIcon,
  DeleteForever as DeleteForeverIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import testIds from '@testIds';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type FlagModalProps = {
  flag?: Flag;
};

export default function FlagModal({ flag }: FlagModalProps) {
  const [isDeleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { flags, setSelected, refetchFlags } = useFlagsContext();
  const setParams = useSearchParams()[1];
  const [{ key, valueType, validation }, setFlag] = useState<Flag>(
    flag ?? { key: '', valueType: 'string' },
  );

  const isNameInUse = !flag && !!flags.find((x) => x.key === key);

  function handleClose() {
    setParams((_params) => {
      _params.delete(URLActions.action);

      return _params;
    });
  }

  async function handleSave() {
    try {
      setLoading(true);

      await putFlag({ key, valueType, validation });

      await refetchFlags();

      handleClose();
    } catch (error: any) {
      console.log('[API Error]: ' + error?.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);

      await deleteFlag(key);

      await refetchFlags();

      handleClose();
    } catch (error: any) {
      console.log('[API Error]: ' + error?.message);
    } finally {
      setLoading(false);
      setSelected(undefined);
    }
  }

  const confirm = (
    <>
      <Typography paragraph fontSize="1.1rem" align="center">
        Are you sure?
      </Typography>

      <LoadingButton
        color="error"
        variant="contained"
        loading={loading}
        data-testid={testIds.Flags.modal_button_confirm_delete}
        onClick={handleDelete}
        endIcon={<DeleteForeverIcon />}
      >
        Delete Forever
      </LoadingButton>
    </>
  );

  const form = (
    <Stack gap={3}>
      <TextField
        label="Flag's key"
        size="small"
        value={key}
        id={testIds.Flags.modal_key}
        data-testid={testIds.Flags.modal_key}
        disabled={!!flag || loading}
        onChange={(e) => {
          const value = e.target.value.trim();

          if (/[^0-9a-zA-Z]/.test(value)) {
            return;
          }

          setFlag((s) => ({ ...s, key: value }));
        }}
        error={isNameInUse}
        helperText={isNameInUse ? 'Flag already exists' : undefined}
      />

      <FormControl>
        <InputLabel id={`${testIds.Flags.modal_type}-label`}>Type</InputLabel>

        <Select
          size="small"
          label="Type"
          id={testIds.Flags.modal_type}
          data-testid={testIds.Flags.modal_type}
          labelId={`${testIds.Flags.modal_type}-label`}
          disabled={loading}
          value={valueType}
          onChange={(e) => {
            const valueType = e.target.value as Flag['valueType'];

            setFlag((s) => {
              if (valueType === 'boolean') {
                return { key: s.key, valueType };
              }

              return { ...s, valueType };
            });
          }}
        >
          <MenuItem value="string">String</MenuItem>
          <MenuItem value="boolean">Boolean</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Validation"
        size="small"
        id={testIds.Flags.modal_validation}
        data-testid={testIds.Flags.modal_validation}
        disabled={valueType === 'boolean' || loading}
        value={validation ?? ''}
        onChange={(e) => setFlag((s) => ({ ...s, validation: e.target.value }))}
      />

      <LoadingButton
        color="success"
        variant="contained"
        loading={loading}
        disabled={!key || isNameInUse}
        data-testid={testIds.Flags.modal_button_save}
        onClick={handleSave}
        endIcon={!!flag ? <SaveIcon /> : <AddCircleIcon />}
        sx={{ mt: 0, flexGrow: 1 }}
      >
        {!!flag ? 'Save' : 'Add'}
      </LoadingButton>

      {!!flag && (
        <Button
          color="error"
          variant="contained"
          disabled={loading}
          data-testid={testIds.Flags.modal_button_delete}
          onClick={() => setDeleting(true)}
          endIcon={<DeleteIcon />}
          sx={{ mt: 0, flexGrow: 1 }}
        >
          Remove
        </Button>
      )}
    </Stack>
  );

  return (
    <Modal
      open
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      slotProps={{
        backdrop: {
          slotProps: {
            root: {
              'data-testid': testIds.Flags.modal_backdrop,
            } as React.HTMLAttributes<HTMLDivElement>,
          },
        },
      }}
    >
      <Card sx={{ p: 2 }} data-testid={testIds.Flags.modal}>
        {isDeleting ? confirm : form}
      </Card>
    </Modal>
  );
}
