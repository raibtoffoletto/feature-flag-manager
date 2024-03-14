import Input from '@components/common/Input';
import { SettingsViewAction } from '@constants';
import useSettingsViewContext from '@hooks/context/useSettingsViewContext';

export default function EditEndpoint() {
  const { endpoint, dispatch } = useSettingsViewContext();

  return (
    <Input
      label="Standard Endpoint"
      value={endpoint}
      onChange={(e) => {
        const payload = `${e.target.value}`.trim();

        dispatch({
          payload,
          type: SettingsViewAction.endpoint,
        });
      }}
      sx={{
        width: { xs: '100%', sm: 'calc(50% - 36px)' },
      }}
    />
  );
}
