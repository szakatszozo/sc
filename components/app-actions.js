import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';

import { startVSCode } from '../utils/commands';

export const AppActions = ({ app }) => {
  const actions = [
    {
      icon: '/datadog.png',
      title: 'Datadog',
      onClick: () => window.open(app.datadogBL),
    }, {
      icon: '/jenkins.png',
      title: 'Jenkins',
      onClick: () => window.open(app.jenkins),
    }, {
      icon: '/vscode.png',
      title: 'Visual Studio Code',
      onClick: () => startVSCode(app.repo),
    }, {
      icon: '/github-vscode.png',
      title: 'Github + Visual Studio Code',
      onClick: () => window.open(`https://github.dev/ScaCap/${app.repo}`),
    }, {
      icon: '/github.png',
      title: 'Github',
      onClick: () => window.open(`https://github.com/ScaCap/${app.repo}`),
    }
  ]

  return (
    <>
      {actions.map(action => (
        <Tooltip key={action.title} title={action.title}>
          <IconButton className='filter' onClick={action.onClick} aria-label={action.title}>
            <Image
              src={action.icon}
              alt={action.title}
              width={28}
              height={28}
            />
            <style jsx global>{`
              .filter {
                filter: grayscale(100%);
                -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
                opacity: 65%
              }
              .filter:hover {
                filter: none;
                -webkit-filter: grayscale(0);
                opacity: 100%
              }
            `}
          </style>
          </IconButton>
        </Tooltip>
      ))}
    </>
)};
