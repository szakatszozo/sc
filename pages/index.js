import { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import { CardContent } from '@mui/material';

import { strToKey } from '../utils/str-to-key';
import { appConfigs } from '../config/index';
import { AppActions } from '../components/app-actions';
import { Links } from '../components/links';
import { EnvTabs } from '../components/env-tabs';
import { getTcpConnectionCmd, getAppPid, isHealthy, getCurrentBranchCmd } from '../utils/commands';
import { executeCommand } from '../utils/execute-command';

const viewedApps = process.env.NEXT_PUBLIC_APPS.split(' ');

const apps = appConfigs.filter(app => viewedApps.some(viewedApp => viewedApp === app.repo));

// localhost state
//  unknown
//  starting
//  running
//  healthy
//  stopped

// dev, test, prod state
//  unknown
//  healthy
//  down

const initEnvsState = envs => {
  let envState = {};
  envs.forEach(env => {
    envState = {
      ...envState,
      [env.name]: {
        state: 'unknown'
      }
    }
  });
  return envState;
};

const initAppState = apps => {
  let appState = {};
  apps.forEach(app => {
    appState = {
      ...appState,
      [strToKey(app.name)]: {
        tabValue: false,
        currentBranch: '-',
        env: initEnvsState(app.envs)
      }
    }
  })
  return appState;
};

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tabpanel-${index}`}
    {...other}
  >
    {value === index && (
      <>
        {children}
      </>
    )}
  </div>
);

export default function Home() {
  const [appState, setAppState] = useState(initAppState(apps));

  const updateAppState = (appKey, fieldKey, fieldValue) => {
    setAppState(prevAppState => ({
      ...prevAppState,
      [appKey]: {
        ...prevAppState[appKey],
        [fieldKey]: fieldValue
      }
    }))
  };

  const updateEnvState = (appKey, envKey, fieldKey, fieldValue) => {
    setAppState(prevAppState => ({
      ...prevAppState,
      [appKey]: {
        ...prevAppState[appKey],
        env: {
          ...prevAppState[appKey].env,
          [envKey]: {
            [fieldKey]: fieldValue
          }
        }
      }
    }));
  };

  const getTcpConnection = async (appName, appPort) => {
    const appKey = strToKey(appName);
    const envState = appState[appKey].env.Localhost;
    
    const response = await executeCommand(getTcpConnectionCmd(appPort));
    if (response.output.includes('Connection refused')) {
      if(envState === 'starting') {
        setTimeout(() => getTcpConnection(appPort), 1000);
      } else {
        updateEnvState(appKey, 'Localhost', 'state', 'stopped');
      }
    };

    if (response.output.includes('succeeded')){
      updateEnvState(appKey, 'Localhost', 'state', 'running');
    };
  };

  const getHealthy = async (appKey, env) => {
    if (env.healthyHref) {
      if (await isHealthy(env.healthyHref)) {
        updateEnvState(appKey, env.name, 'state', 'healthy');
        return;
      }
      if (env.name !== 'Localhost') {
        updateEnvState(appKey, env.name, 'state', 'down');
      }
    }
  };

  const getCurrentBranch = async (appName, appRepo) => {
    const appKey = strToKey(appName);
    const currentBranch = (await executeCommand(getCurrentBranchCmd(appRepo))).output;
    updateAppState(appKey, 'currentBranch', currentBranch);
  };

  useEffect(() => {
    for (const app of apps) {
      getTcpConnection(app.name, app.envs[0].port);
      getCurrentBranch(app.name, app.repo);
      for (const env of app.envs) {
        getHealthy(strToKey(app.name), env);
      }
    }
  }, []);

  const makeHandleTabChange = appName => {
    const appKey = strToKey(appName);

    return (_, newTabValue) => {
      updateAppState(appKey, 'tabValue', newTabValue);
    };
  };

  const makeHandleTabClick = appName => {
    const appKey = strToKey(appName);

    return clickedValue => {
      if (appState[appKey].tabValue === clickedValue) {
        updateAppState(appKey, 'tabValue', false);
      }
    }
  };

  const makeHandlePoll = appName => {
    const appKey = strToKey(appName);

    return (envName) => {
      const app = apps.filter(app => app.name === appName)[0];
      if (envName === 'Localhost') {
        getTcpConnection(appName, app.envs[0].port);
      }
      getHealthy(appKey, app.envs.filter(env => env.name === envName)[0]);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {apps.map(app => {
        const appKey = strToKey(app.name);
        const tabValue = appState[appKey].tabValue;
        const envState = appState[appKey].env;
        return (
          <Grid key={app.name} item xs={10}>
            <Card sx={{ minWidth: 275 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: app.primaryColor }}>
                  {app.abbreviation}
                </Avatar>
              }
              action={
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item sx={{ paddingRight: 10 }}>
                    <EnvTabs
                      envs={app.envs}
                      envState={envState}
                      value={tabValue}
                      handleChange={makeHandleTabChange(app.name)}
                      handleClick={makeHandleTabClick(app.name)}
                      handlePoll={makeHandlePoll(app.name)}
                    />
                  </Grid>
                  <Grid item>
                    <AppActions app={app} />
                  </Grid>
                </Grid>
              }
              title={app.name}
              subheader={appState[appKey].currentBranch}
            />
            {tabValue !== false &&
              <CardContent>
                {app.envs.map((env, idx) => (
                  <TabPanel
                    key={`${app.name}-${env.name}-content`}
                    value={tabValue}
                    index={idx}
                  >
                    <Links {...env} appName={app.name} />
                  </TabPanel>
                ))}
              </CardContent>
            }
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
