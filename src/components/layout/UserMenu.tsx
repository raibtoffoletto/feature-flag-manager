import { AppRoutes } from '@constants';
import useUserContext from '@hooks/context/useUserContext';
import { AccountCircle, BusinessCenter, Settings } from '@mui/icons-material';
import {
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import testIds from '@testIds';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SX = {
  textTransform: 'capitalize',
  textAlign: 'right',
  lineHeight: 1,
  userSelect: 'none',
};

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, tenant, switchTanant } = useUserContext();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Button
        aria-label="user account"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        data-testid={testIds.UserMenu.button}
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
        endIcon={
          <AccountCircle
            sx={{
              width: 32,
              height: 32,
            }}
          />
        }
      >
        <Stack gap={0.5}>
          <Typography variant="overline" color="text.primary" sx={SX}>
            {user.name}
          </Typography>

          <Typography variant="caption" color="text.secondary" sx={SX}>
            {tenant?.name}
          </Typography>
        </Stack>
      </Button>

      {!!anchor && (
        <Menu
          open
          id="menu-appbar"
          anchorEl={anchor}
          onClose={handleClose}
          data-testid={testIds.UserMenu.menu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem
            data-testid={testIds.UserMenu.settings}
            onClick={() => {
              handleClose();
              navigate(AppRoutes.settings);
            }}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>

            <ListItemText>Settings</ListItemText>
          </MenuItem>

          <Divider />

          <ListItem disableGutters disablePadding>
            <ListItemText
              primaryTypographyProps={{
                variant: 'overline',
                textAlign: 'center',
                lineHeight: 1,
                color: 'text.secondary',
                mb: 1,
                sx: { userSelect: 'none' },
              }}
            >
              Tenants
            </ListItemText>
          </ListItem>

          {user.tenants.map((_tenant) => {
            const selected = _tenant.id === tenant?.id;

            return (
              <MenuItem
                key={_tenant.id}
                selected={selected}
                data-selected={selected}
                data-testid={_tenant.name}
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
            );
          })}
        </Menu>
      )}
    </>
  );
}
