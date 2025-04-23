import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from './ThemeContext';

export default function ModeSwitch() {
  const { mode, toggleMode } = useThemeMode();
  return (
    <Tooltip title={mode === 'dark' ? 'الوضع الليلي' : 'الوضع النهاري'}>
      <IconButton color="inherit" onClick={toggleMode} size="large" sx={{ ml: 1 }}>
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}
