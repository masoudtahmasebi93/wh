/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
};

function PhoneBookForm(props) {

    const initialData = {
        firstName:'Coder',
        lastName:'Byte',
        phone:'8885559999'
    }

    const [userState, setUserState] = useState(initialData);

    const handleUserChange = (e) => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userState.firstName || !userState.lastName || !userState.phone) return;
        props.addUser(userState);
        setUserState(initialData);
    };

    return (
        <form onSubmit={handleSubmit} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                name='firstName'
                type='text'
                value={userState.firstName}
                onChange={handleUserChange}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                name='lastName'
                type='text'
                value={userState.lastName}
                onChange={handleUserChange}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                name='phone'
                type='text'
                value={userState.phone}
                onChange={handleUserChange}
            />
            <br />
            <input
                style={style.form.submitBtn}
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable(props) {
    const sortedData = props.users.sort((a, b) => a.lastName.localeCompare(b.lastName));

    const rows =
        sortedData.length > 0 && sortedData.map((user, index) => {
            return(
                <tr key={user.id}>
                    <td style={style.tableCell}>{user.firstName}</td>
                    <td style={style.tableCell}>{user.lastName}</td>
                    <td style={style.tableCell}>{user.phone}</td>
                </tr>
            )
        })

    return (
        <table style={style.table} className='informationTable'>
            <thead>
            <tr>
                <th style={style.tableCell}>First name</th>
                <th style={style.tableCell}>Last name</th>
                <th style={style.tableCell}>Phone</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>

        </table>
    );
}

function Application(props) {

    const usersObj = [];

    const [users, setUsers] = useState(usersObj);

    const addUser = (user) => {
        user.id = users.length + 1;
        setUsers([...users, user]);
    };

    return (
        <section>
            <PhoneBookForm addUser={addUser} />
            <InformationTable users={users} />
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);