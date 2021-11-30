import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/icons-material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import { Browsers } from '../components/browsers';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '& .MuiListItemSecondaryAction-root': {
    visibility: 'hidden',
  },
  '&:hover': {
    '& .MuiListItemSecondaryAction-root': {
      visibility: 'inherit'
    }
  }
}));

const ListItemWithLink = ({ icon, primary, link, id }) => {
  function copyToClipboard() {
    var copyText = document.getElementById(id);
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <StyledListItem
      secondaryAction={
        <>
          <Browsers link={link} />
          <Tooltip title="Copy link">
            <IconButton edge="end" aria-label="delete" onClick={() => copyToClipboard()}>
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </>
      }
      className='listItem'
    >
      <ListItemAvatar>
        <Avatar sx={{ color: 'inherit', backgroundColor: 'transparent' }}>
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={primary}
        secondary={<a href={link} target="_blank" rel="noreferrer">{link}</a>}
      />
      <input type="text" value={link} id={id} readOnly style={{display: 'none'}} />
    </StyledListItem>
  );
};

export const Links = ({ links, appName }) => (
  <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {links?.map((link, i) => 
      <ListItemWithLink
        key={link.name}
        id={`${appName.replace(/\s+/g, '-').toLowerCase()}-dev${i}`}
        icon={<Link />}
        primary={link.name}
        link={link.href}
      />
    )}
  </List>
);
