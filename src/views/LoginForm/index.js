import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Styles from './style.module.css';
//components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//context
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';

export default observer(LoginForm);

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function LoginForm() {
    const navigate = useNavigate();
    const [loginFormStore] = useStore('loginForm');
    const { fields, fieldUpdate, formValid } = loginFormStore;
    const sendForm = () => {
        navigate('/chatsGroup');
    };

    const classes = useStyles();

    return (
        <div className={Styles}>
            <h1>Login form</h1>

            <form className={classes.root}>
                <div>
                    {fields.map((field) => (
                        <TextField
                            id={field.name}
                            label={field.label}
                            name={field.name}
                            pattern={field.pattern}
                            value={field.value}
                            variant="outlined"
                            onChange={(e) => {
                                fieldUpdate(field.name, e.target.value);
                            }}
                        />
                    ))}
                </div>
                <Button type="submit" onClick={sendForm} disabled={!formValid}>
                    Sign in
                </Button>
            </form>
        </div>
    );
}
