import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'var(--background-color)',
    color: 'var(--color)',
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.6s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
  }),
);

const greenVars = {
  '--color': 'transparent',
  '--background-color': '#44b700'
};

const redVars = {
  '--color': 'transparent',
  '--background-color': '#b74400'
};

const lightgrayVars = {
  '--color': 'transparent',
  '--background-color': '#777777'
};

const grayVars = {
  '--color': 'transparent',
  '--background-color': '#333333'
};

const beaconVars = {
  '--color': '#44b700',
  '--background-color': '#44b700'
};

const updateTime = 1000; // every second

const getState = envState => {
  switch (envState){
    case 'unknown':
      return lightgrayVars;
    case 'stopped':
      return grayVars;
    case 'starting':
      return lightgrayVars;
    case 'running':
    case 'healthy':
      return greenVars;
    case 'down':
      return redVars;
    default:
      return lightgrayVars;
  }
}

const EnvAvatarWithPollProgress = ({ initial, env, pollTime, onPoll }) => {
  const [time, setTime] = useState(0);
  const [poll, setPoll] = useState(false);
  
  useEffect(() => {
    const ticker = () => {
      if (time < pollTime) {
        if (poll) {
          setPoll(false);
        }
        setTime(time + updateTime);
      } else {
        setTime(0);
        setPoll(true);
        onPoll();
      }
    };
    const timer = setTimeout(() => ticker(), updateTime);
    return () => clearTimeout(timer);
  }, [poll, onPoll, time, pollTime]);

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <StyledBadge
        style={poll ? beaconVars : getState(env.state)}
        // style={disconnectedVars}
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar sx={{ width: 24, height: 24 }}>
          {initial}
        </Avatar>
      </StyledBadge>
      <CircularProgress
        size={30}
        thickness={2}
        sx={{
          color: 'gray',
          position: 'absolute',
          top: -3,
          left: -3,
          zIndex: 0,
        }}
        variant="determinate"
        value={time * 100 / pollTime}
      />
    </Box>
  );
};

export const EnvTabs = ({ envs, envState, value, handleChange, handleClick, handlePoll }) => {
  return (
    <Tabs value={value} onChange={handleChange} aria-label="">
      {envs.map((env, idx) => {
        return (
          <StyledTab
            onClick={() => handleClick(idx)}
            key={env.name}
            icon={
              <EnvAvatarWithPollProgress
                initial={env.name[0]}
                env={envState[env.name]}
                pollTime={env.pollTime}
                onPoll={() => handlePoll(env.name)}
              />
            }
            label={env.name}
          />
        )
      })};
    </Tabs>
  );
};
