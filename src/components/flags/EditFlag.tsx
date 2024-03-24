import ActionButton from '@components/common/ActionButton';
import useFlagViewContext from '@hooks/context/useFlagViewContext';
import useSettingsContext from '@hooks/context/useSettingsContext';
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import {
  Box,
  Fade,
  FormControlLabel,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import testIds from '@testIds';
import { useMemo, useState } from 'react';
import FlagAction from './FlagAction';

function parseBool(value: string) {
  return value.toLowerCase().trim() === 'true';
}

function EnvironmentCard({ children }: IParent) {
  return (
    <Stack
      p={2}
      gap={2}
      data-testid={testIds.Flags.pane_edit_environment}
      sx={{
        borderRadius: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        width: { xs: '100%', sm: 'calc(33% - 16px)' },
        minWidth: 'max-content',
        boxShadow: ({ shadows }) => shadows[1],
      }}
    >
      {children}
    </Stack>
  );
}

function EnvironmentFlag({ exists, name, url, value }: EnvironmentFlag) {
  const { saveFlag, removeFlag, valueType, validation, isLoading } = useFlagViewContext();
  const [currentValue, setValue] = useState(value);

  const isValid = useMemo(() => {
    if (!validation) {
      return true;
    }

    try {
      return new RegExp(validation).test(currentValue);
    } catch {
      return false;
    }
  }, [currentValue, validation]);

  return (
    <EnvironmentCard>
      <Typography variant="h5" sx={{ flexGrow: exists ? undefined : 1 }}>
        {name}
        {`: `}
      </Typography>

      {exists && (
        <Box flexGrow={1}>
          {valueType === 'boolean' ? (
            <FormControlLabel
              label={parseBool(currentValue) ? 'Active' : 'Inactive'}
              labelPlacement="end"
              disabled={isLoading}
              control={
                <Switch
                  checked={parseBool(currentValue)}
                  onChange={(_, _value) => setValue(_value ? 'true' : 'false')}
                />
              }
            />
          ) : (
            <TextField
              size="small"
              label="Value"
              value={currentValue}
              disabled={isLoading}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              sx={{ width: 220 }}
              error={!!currentValue && !isValid}
              helperText={
                !!currentValue && !isValid
                  ? `Failed the validation /${validation}/`
                  : undefined
              }
            />
          )}
        </Box>
      )}

      <Stack
        gap={2}
        sx={{
          width: '100%',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: 'flex-end',
        }}
      >
        {exists ? (
          <>
            <ActionButton
              expand
              label="Remove"
              color="error"
              variant="outlined"
              disabled={isLoading}
              icon={<DeleteIcon />}
              onClick={() => removeFlag(url)}
              data-testid={testIds.Flags.pane_edit_remove}
            />

            <ActionButton
              expand
              label="Save"
              color="success"
              variant="outlined"
              disabled={isLoading || currentValue === value}
              icon={<SaveIcon />}
              onClick={() => saveFlag(url, currentValue)}
              data-testid={testIds.Flags.pane_edit_save}
            />
          </>
        ) : (
          <ActionButton
            expand
            label="Add"
            color="success"
            variant="outlined"
            disabled={isLoading}
            icon={<AddCircleIcon />}
            onClick={() => saveFlag(url)}
            data-testid={testIds.Flags.pane_edit_add}
          />
        )}
      </Stack>
    </EnvironmentCard>
  );
}

export default function EditFlag() {
  const { settings } = useSettingsContext();
  const { environments, key, valueType, validation, isLoading } = useFlagViewContext();

  return (
    <Fade appear in>
      <Stack
        px={2}
        pb={8}
        gap={4}
        width="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
        data-testid={testIds.Flags.pane_edit}
      >
        <Stack direction="row" alignItems="flex-end" gap={4}>
          <Typography variant="h4" component="h2">
            {key}
          </Typography>
        </Stack>

        <Stack
          gap={4}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {isLoading
            ? settings.environments.map(({ id, name }) => (
                <EnvironmentCard key={`${id}//${name}`}>
                  <Typography variant="h5">
                    {name}
                    {`: `}
                  </Typography>

                  <Skeleton
                    variant="rounded"
                    width={valueType === 'boolean' ? 200 : 220}
                    height={valueType === 'boolean' ? 90 : 100}
                    data-testid={testIds.Flags.content_list_placeholder}
                  />
                </EnvironmentCard>
              ))
            : environments.map((env) => <EnvironmentFlag key={env.id} {...env} />)}
        </Stack>

        <FlagAction key={key} edit flag={{ key, valueType, validation }} />
      </Stack>
    </Fade>
  );
}
