import ActionButton from '@components/common/ActionButton';
import Input from '@components/common/Input';
import { SettingsViewAction } from '@constants';
import useSettingsViewContext from '@hooks/context/useSettingsViewContext';
import validateName from '@lib/validateName';
import validateURL from '@lib/validateURL';
import { AddCircle as AddIcon } from '@mui/icons-material';
import { Stack } from '@mui/material';
import testIds from '@testIds';
import { useState } from 'react';

export default function AddEnvironment() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const { dispatch } = useSettingsViewContext();

  return (
    <Stack gap={2} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
      <Input
        label="Environment Name"
        value={name}
        error={!!name && !validateName(name)}
        sx={{ flexGrow: 1 }}
        data-testid={testIds.Settings.edit_name}
        onChange={(e) => {
          setName(`${e.target.value}`);
        }}
      />

      <Input
        label="Environment URL"
        value={url}
        error={!!url && !validateURL(url)}
        sx={{ flexGrow: 1 }}
        data-testid={testIds.Settings.edit_url}
        onChange={(e) => {
          setUrl(`${e.target.value}`.trim());
        }}
      />

      <ActionButton
        label="Add new environment"
        icon={<AddIcon />}
        color="success"
        disabled={!(validateName(name) && validateURL(url))}
        data-testid={testIds.Settings.edit_submit}
        onClick={() => {
          dispatch({
            type: SettingsViewAction.create,
            payload: { name, url },
          });

          setName('');
          setUrl('');
        }}
      />
    </Stack>
  );
}
