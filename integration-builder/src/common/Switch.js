import React from 'react';
import MuiSwitch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    newTrack : {
        opacity: theme.palette.type === 'light' ? 0.44 : 0.36,
    }
}));

export default function Switch (props) {
    const classes = useStyles();
    return (<MuiSwitch {...props} classes={{ track: classes.newTrack }} />)
};
