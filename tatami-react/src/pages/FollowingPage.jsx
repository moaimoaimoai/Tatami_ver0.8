import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles((theme) => {
    return {
        listAvatar: {
            backgroundColor: "#10d876"
        }
    }
})

const FollowingPage = (props) => {
    const history = useHistory()
    const classes = useStyles();

    const toPage = () => {
        history.push(props.url);
    }
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar className={classes.listAvatar}>
                    <CallMissedOutgoingIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.url}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={toPage}>
                    <ChevronRightIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default FollowingPage;