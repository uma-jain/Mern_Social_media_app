import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GroupIcon from '@material-ui/icons/GroupAdd';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
export const folderListItems = (
  <div>
     <Link style={{ textDecoration: 'none' }} to="/">
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    </Link>
    
    <Link style={{ textDecoration: 'none' }} to="/followers">
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Friends" />
    </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} to="/discover">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Find Friends" />
      </ListItem>
    </Link>
  </div>
);

export const otherFolderListItems = (
  <div>
    
    <Link style={{ textDecoration: 'none' }} to="/settings">
    <ListItem button>
      <ListItemIcon>
        <FaceIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    </Link>
  
  </div>
);