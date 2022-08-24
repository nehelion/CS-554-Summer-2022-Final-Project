import React from 'react';
import {doSignOut} from '../firebase/FirebaseFunctions';
import Button from '@material-ui/core/Button';

import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
	centerWrap: {
		display: 'flex',
		justifyContent: 'center'
	}
});

const SignOutButton = () => 
{
  const classes = useStyles();
  return (
		<div className={classes.centerWrap}>
			<Button variant="outlined" onClick={doSignOut} color="primary">
				Confirm to Sign out
			</Button>
		</div>
  );
};

export default SignOutButton;