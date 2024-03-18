import useFlagsContext from '@hooks/context/useFlagsContext';
import {
  Clear as ClearIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  TextField,
} from '@mui/material';
import testIds from '@testIds';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function LoadingPlaceholder() {
  return (
    <>
      {new Array(5).fill(null).map((_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={40}
          sx={{ mb: 1 }}
          data-testid={testIds.Flags.content_list_placeholder}
        />
      ))}
    </>
  );
}

type FlagItemProps = {
  label: string;
  isSelected: boolean;
  onClick: (value?: string) => void;
};

function FlagItem({ label, isSelected, onClick }: FlagItemProps) {
  const buttonInput = useRef<any>(null);

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (
        (e.key === 'Escape' || e.key === 'Esc') &&
        document.activeElement === buttonInput.current
      ) {
        onClick(undefined);
      }
    }

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [onClick]);

  return (
    <ListItemButton
      ref={buttonInput}
      selected={isSelected}
      onClick={() => onClick(isSelected ? undefined : label)}
    >
      <ListItemText primary={label} />

      <ListItemIcon sx={{ minWidth: 24 }}>
        {isSelected && <EditIcon sx={{ color: 'grey.600', width: 20, height: 20 }} />}
      </ListItemIcon>
    </ListItemButton>
  );
}

type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function Search({ search, setSearch, setSelected }: SearchProps) {
  const searchInput = useRef<any>(null);

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (
        (e.key === 'Escape' || e.key === 'Esc') &&
        document.activeElement === searchInput.current
      ) {
        setSearch('');
      }
    }

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [setSearch]);

  return (
    <TextField
      label="Search"
      size="small"
      sx={{ mt: 1, display: { xs: 'none', sm: 'block' } }}
      value={search}
      id={testIds.Flags.content_list_search}
      data-testid={testIds.Flags.content_list_search}
      onChange={(e) => {
        const value = e.target.value;

        if (/[^0-9a-zA-Z]/.test(value)) {
          return;
        }

        setSelected(undefined);
        setSearch(value);
      }}
      inputRef={searchInput}
      InputProps={{
        startAdornment: (
          <SearchIcon sx={{ color: 'grey.700', width: 20, height: 20, mr: 1 }} />
        ),
        endAdornment: !!search ? (
          <IconButton
            onClick={() => setSearch('')}
            size="small"
            data-testid={testIds.Flags.content_list_clear_search}
          >
            <ClearIcon sx={{ color: 'grey.700', width: 20, height: 20 }} />
          </IconButton>
        ) : undefined,
      }}
    />
  );
}

export default function FlagList() {
  const [search, setSearch] = useState('');
  const { flags, selected, setSelected, isLoading } = useFlagsContext();

  const filteredFlags = useMemo(
    () => (!!search ? flags.filter((x) => new RegExp(search, 'gi').test(x.key)) : flags),
    [flags, search],
  );

  const handleClick = useCallback(
    (value?: string) => {
      setSelected(value);
      setSearch('');
    },
    [setSelected],
  );

  return (
    <Box
      sx={{
        flexShrink: 0,
        overflow: 'hidden',
        width: { xs: '100%', sm: '220px' },
      }}
    >
      <Autocomplete
        clearOnBlur
        clearOnEscape
        disabled={isLoading}
        id={testIds.Flags.content_select}
        data-testid={testIds.Flags.content_select}
        sx={{ mt: 1, display: { xs: 'block', sm: 'none' } }}
        options={flags.map((f) => ({ label: f.key }))}
        onChange={(_, v) => setSelected(v?.label)}
        renderInput={(params) => (
          <TextField {...params} label="Select a flag" size="small" />
        )}
      />

      <Search search={search} setSearch={setSearch} setSelected={setSelected} />

      <List
        component="nav"
        aria-label="flag list"
        id={testIds.Flags.content_list}
        data-testid={testIds.Flags.content_list}
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          filteredFlags.map(({ key }) => (
            <FlagItem
              key={key}
              label={key}
              isSelected={key === selected}
              onClick={handleClick}
            />
          ))
        )}
      </List>
    </Box>
  );
}
