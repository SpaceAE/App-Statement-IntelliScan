'use client';

import {
  Home,
  Add as AddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { AppBar, styled, Toolbar, IconButton, Fab, Box } from '@mui/material';

import { PageRoute } from '@/constants';
import { usePathname, useRouter } from '@/plugins/i18n/navigation';

const FloatActionButton = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: 'none', paddingX: '32px' }}
    >
      <Toolbar>
        <IconButton
          size="large"
          sx={theme => ({
            ...theme.applyStyles('light', { color: 'gray.600' }),
            ...(pathname === PageRoute.HOME && { color: 'primary.main' }),
          })}
          onClick={() => router.push(PageRoute.HOME)}
        >
          <Home />
        </IconButton>
        <FloatActionButton
          color="primary"
          onClick={() => router.push('/upload')}
        >
          <AddIcon />
        </FloatActionButton>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          sx={theme => ({
            ...theme.applyStyles('light', { color: 'gray.600' }),
            ...(pathname === PageRoute.SETTING && { color: 'primary.main' }),
          })}
          onClick={() => router.push(PageRoute.SETTING)}
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
