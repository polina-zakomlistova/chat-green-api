import React, { useState } from 'react';

import Styles from './style.module.css';
import { makeStyles } from '@material-ui/core/styles';
//components
import { List, ListItem, ListItemText } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
//context
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

export default observer(Recipients);

function Recipients() {
    const [recipientsStore] = useStore('recipients');
    const { recipients, currentRecipient, setСurrentRecipient, addRecipient } =
        recipientsStore;
    const classes = useStyles();

    const [searchPhone, setSearchPhone] = useState('');

    const handleSearchChange = (e) => {
        setSearchPhone(e.target.value);
    };
    const validateAndFormatPhoneNumber = (phoneNumber) => {
        const phoneRegex =
            /^[+]?[0-9]?[-\s]?[(]?\d{3}[)]?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
        const cleanPhoneNumber = phoneNumber.replace(/[^\d]/g, '');

        if (phoneRegex.test(cleanPhoneNumber)) {
            return `${cleanPhoneNumber.slice(-10)}`;
        }

        return null;
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        const formattedPhoneNumber = validateAndFormatPhoneNumber(searchPhone);

        if (formattedPhoneNumber) {
            addRecipient(formattedPhoneNumber);
            setCurrentRecipient(formattedPhoneNumber);
        } else {
            // Некорректный номер телефона
        }
    };

    return (
        <div className={Styles}>
            {' '}
            <h1>Recipients</h1>
            <Paper
                component="form"
                className={classes.root}
                onSubmit={handleSearchSubmit}
            >
                <InputBase
                    className={classes.input}
                    placeholder="Search phone"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleSearchChange}
                />
                <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <List className={classes.root}>
                {recipients.map((item) => (
                    <ListItem key={item.phone} button>
                        <ListItemText
                            primary={item.phone}
                            onClick={() => setСurrentRecipient(item.phone)}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
