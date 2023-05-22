import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Styles from './style.module.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
//components
import { List, ListItem, ListItemText } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
//context
import { observer } from 'mobx-react-lite';
import useStore from '../../hooks/useStore';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '30%',
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '20ch',
        },
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    searchWrapper: {
        backgroundColor: '#eae6df',
    },

    colorField: {
        backgroundColor: '#eae6df',
    },
    field: {
        border: '1px solid #eae6df',
    },
    person: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        backgroundColor: '#eae6df',
        height: '50px',
    },
}));

const CustomPaper = withStyles((theme) => ({
    root: {
        backgroundColor: '#eae6df ',
        margin: '5px 7px',
    },
}))(Paper);

export default observer(Recipients);

function Recipients() {
    const [recipientsStore, chatsStore] = useStore('recipients', 'chats');
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
            setSearchPhone('');
            addRecipient(formattedPhoneNumber);
            setСurrentRecipient(formattedPhoneNumber);
        } else {
            // Некорректный номер телефона
            setSearchPhone('');
        }
    };

    return (
        <div className={classes.wrapper}>
            <h2 className="visually-hidden">Recipients</h2>
            <div className={classes.person}>
                <Link to="/">
                    <PersonIcon fontSize="large" />
                </Link>
            </div>

            <CustomPaper
                component="form"
                className={classes.root}
                onSubmit={handleSearchSubmit}
            >
                <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Поиск или новый чат"
                    onChange={handleSearchChange}
                    value={searchPhone}
                />
            </CustomPaper>
            <List>
                {recipients.map((item) => (
                    <ListItem
                        key={item.id}
                        className={
                            currentRecipient && item.id == currentRecipient.id
                                ? `${classes.field} ${classes.colorField}`
                                : classes.field
                        }
                        button
                    >
                        <ListItemText
                            primary={item.name || item.phone}
                            onClick={() => setСurrentRecipient(item.phone)}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
