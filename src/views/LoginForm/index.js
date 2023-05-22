import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
//components
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
        backgroundColor: '#ffffff',
        minWidth: '30vw',
        maxWidth: '70vw',
        padding: '20px',
        marginTop: '50px',
        textAlign: 'center',
    },
    field: {
        marginBottom: '20px',
        maxWidth: '500px',
        margin: theme.spacing(1),
    },
    fieldsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        margin: '20px',
    },
}));
const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#000000',
            },
            '&:hover fieldset': {
                borderColor: '#00a884',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#00a884',
            },
        },
    },
})(TextField);

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#000000',
        backgroundColor: '#abaaaa',
        padding: '6px 12px',
        '&:hover': {
            backgroundColor: '#00a884',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
}))(Button);

function LoginForm() {
    const navigate = useNavigate();
    const [loginFormStore] = useStore('loginForm');
    const { fields, fieldUpdate, formValid } = loginFormStore;
    const sendForm = () => {
        navigate('/chatsGroup');
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2 className="visually-hidden">Login form</h2>
            <form className={classes.form}>
                <div className={classes.fieldsWrapper}>
                    {fields.map((field) => (
                        <CssTextField
                            className={classes.field}
                            id={field.name}
                            label={field.label}
                            name={field.name}
                            pattern={field.pattern}
                            value={field.value}
                            variant="filled"
                            onChange={(e) => {
                                fieldUpdate(field.name, e.target.value);
                            }}
                        />
                    ))}
                </div>
                <ColorButton
                    variant="contained"
                    type="submit"
                    onClick={sendForm}
                    disabled={!formValid}
                >
                    Sign in
                </ColorButton>
            </form>
        </div>
    );
}
