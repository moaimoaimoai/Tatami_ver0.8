import React, { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

export const SnackbarContext = React.createContext();

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const SnackbarProvider = (props) => {
    const classes = useStyles();
    const queueRef = useRef([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(undefined);
    const [variant, setVariant] = useState("success");
    const [key, setKey] = useState(undefined);
    const Icon = variantIcon[variant];

    const processQueue = () => {
        if (queueRef.current.length > 0) {
            const currentSnack = queueRef.current.shift();
            setMessage(currentSnack.message);
            setVariant(currentSnack.variant);
            setKey(currentSnack.key);
            setOpen(true);
        }
    };

    const newSnack = (variant, message) => {
        queueRef.current.push({
            message,
            variant,
            key: new Date().getTime(),
        });

        if (open) {
            // immediately begin dismissing current message
            // to start showing new one
            setOpen(false);
            processQueue();
        } else {
            processQueue();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{
            newSnack
        }}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                key={key}
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
            >
                <SnackbarContent
                    className={clsx(classes[variant])}
                    message={<span id={message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message ? message : undefined}
                    </span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Snackbar>

            {props.children}
        </SnackbarContext.Provider>
    )
}

export default SnackbarProvider;