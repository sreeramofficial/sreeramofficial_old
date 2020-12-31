import React, { useState, useEffect } from 'react';
import { MdCloudDownload } from 'react-icons/md'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import styles from './InstallPrompt.styles';

const InstallPrompt = () => {
  const [ installPromptEvent, setInstallPromptEvent ] = useState(null);
  const [ isStandalone, setIsStandalone ] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      setInstallPromptEvent(event);
    });
    setIsStandalone(navigator.standalone || window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  const installPWA = () => {
    if (!installPromptEvent) return;

    installPromptEvent.prompt();
    installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') console.log('User accepted the A2HS prompt');
      else console.log('User dismissed the A2HS prompt');
      setInstallPromptEvent(null);
    });
  };

  return !isStandalone && installPromptEvent && <IconButton
    size='small'
    color='secondary'
    aria-label='install'
    onClick={installPWA}>
    <MdCloudDownload size='22' />
  </IconButton>
}

export default withStyles(styles)(InstallPrompt);
