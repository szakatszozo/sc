import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';

import { startBrowserWithLink } from '../utils/commands';

export const Browsers = ({ link }) => {
  const browsers = [
    {
      icon: '/chrome.png',
      title: 'Chrome',
      onClick: () => startBrowserWithLink('Google Chrome',link)
    }, {
      icon: '/edge.png',
      title: 'Edge',
      onClick: () => startBrowserWithLink('Edge', link)
    }, {
      icon: '/firefox.png',
      title: 'Firefox',
      onClick: () => startBrowserWithLink('Firefox', link)
    }, {
      icon: '/opera.png',
      title: 'Opera',
      onClick: () => startBrowserWithLink('Opera', link)
    }, {
      icon: '/safari.png',
      title: 'Safari',
      onClick: () => startBrowserWithLink('Safari', link)
    }
  ];

  return (
    <>
      {browsers.map(browser => (
        <Tooltip key={browser.title} title={browser.title}>
          <IconButton onClick={browser.onClick} aria-label={browser.title}>
            <Image
              src={browser.icon}
              alt={browser.title}
              width={28}
              height={28}
            />
          </IconButton>
        </Tooltip>
      ))}
    </>
  );
};
