import React from 'react';
import './Menu.css';
import 'bulma/css/bulma.css'

export default class Menu extends React.Component {
    render() {
        return (
            <div className="Menu">
                <aside className="menu">
                    <p className="menu-label">
                        General
                    </p>
                    <ul className="menu-list">
                        <li><a>Dashboard</a></li>
                        <li><a>Customers</a></li>
                    </ul>
                    <p className="menu-label">
                        Administration
                    </p>
                    <ul className="menu-list">
                        <li><a>Team Settings</a></li>
                        <li>
                            <a className="is-active">Manage Your Team</a>
                        </li>
                        <li><a>Invitations</a></li>
                        <li><a>Cloud Storage Environment</a></li>
                        <li><a>Authentication</a></li>
                    </ul>
                    <p className="menu-label">
                        Transactions
                    </p>
                    <ul className="menu-list">
                        <li><a>Payments</a></li>
                        <li><a>Transfers</a></li>
                        <li><a>Balance</a></li>
                    </ul>
                </aside>
            </div>
        );
    }
}

