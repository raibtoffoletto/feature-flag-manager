import useUserContext from '@hooks/context/useUserContext';
import { AccountCircle, Settings, BusinessCenter } from '@mui/icons-material';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function UserMenu() {
  const { user, tenant, switchTanant } = useUserContext();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Stack gap={0.5}>
          <Typography
            textAlign="right"
            variant="overline"
            lineHeight={1}
            textTransform="capitalize"
          >
            {user.name}
          </Typography>

          <Typography
            textAlign="right"
            variant="caption"
            lineHeight={1}
            color="text.secondary"
          >
            {tenant?.name}
          </Typography>
        </Stack>

        <IconButton
          color="primary"
          aria-label="user account"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(e) => {
            setAnchor(e.currentTarget);
          }}
        >
          <AccountCircle
            sx={{
              width: 32,
              height: 32,
            }}
          />
        </IconButton>
      </Stack>

      {!!anchor && (
        <Menu
          open
          id="menu-appbar"
          anchorEl={anchor}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {user.tenants.map((_tenant) => (
            <MenuItem
              key={_tenant.id}
              selected={_tenant.id === tenant?.id}
              onClick={() => {
                handleClose();
                switchTanant(_tenant.id);
              }}
            >
              <ListItemIcon>
                <BusinessCenter fontSize="small" />
              </ListItemIcon>

              <ListItemText>{_tenant.name}</ListItemText>
            </MenuItem>
          ))}

          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>

            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
