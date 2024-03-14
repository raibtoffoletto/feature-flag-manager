import ActionButton from '@components/common/ActionButton';
import Input from '@components/common/Input';
import { SettingsViewAction } from '@constants';
import useSettingsViewContext from '@hooks/context/useSettingsViewContext';
import validateName from '@lib/validateName';
import validateURL from '@lib/validateURL';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';
import { Stack } from '@mui/material';
import testIds from '@testIds';

export default function EditEnvironment({ ...env }: Environment) {
  const { dispatch } = useSettingsViewContext();

  const handleChange = (_env: Partial<Environment>) => {
    dispatch({
      payload: { ...env, ..._env },
      type: SettingsViewAction.update,
    });
  };

  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      <Input
        label="Name"
        value={env.name}
        error={!validateName(env.name)}
        sx={{ flexGrow: 1 }}
        data-testid={testIds.Settings.edit_name}
        onChange={(e) => {
          handleChange({ name: `${e.target.value}` });
        }}
      />

      <Input
        label="URL"
        value={env.url}
        error={!validateURL(env.url)}
        sx={{ flexGrow: 1 }}
        data-testid={testIds.Settings.edit_url}
        onChange={(e) => {
          handleChange({ url: `${e.target.value}`.trim() });
        }}
      />

      <ActionButton
        label="Remove environment"
        color="error"
        icon={<DeleteIcon />}
        onClick={() => {
          dispatch({
            type: SettingsViewAction.remove,
            payload: env.id,
          });
        }}
      />
    </Stack>
  );
}
