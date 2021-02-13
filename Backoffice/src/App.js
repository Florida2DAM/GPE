import './App.css';
import 'primereact/resources/themes/arya-orange/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import * as React from 'react';
import {HashRouter, NavLink, Route, Switch} from 'react-router-dom';
import {LotsView} from './screens/LotsView';
import {ArticlesView} from './screens/ArticlesView';
import {ReportsView} from './screens/ReportsView';
import {ClientsView} from './screens/ClientsView';
import {EmployeesView} from "./screens/EmployeesView";
import {OrdersView} from "./screens/OrdersView";

export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className='container'>
                    <div className='menu'>
                        <nav>
                            <div>
                                <NavLink to='/articles' activeClassName='selectedLink' className='navLink'>
                                    Articles
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/lots' activeClassName='selectedLink' className='navLink'>
                                    Lots
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/orders' activeClassName='selectedLink' className='navLink'>
                                    Orders
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/clients' activeClassName='selectedLink' className='navLink'>
                                    Clients
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/employees' activeClassName='selectedLink' className='navLink'>
                                    Employees
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/reports' activeClassName='selectedLink' className='navLink'>
                                    Reports
                                </NavLink>
                            </div>
                        </nav>
                    </div>
                    <div className='mainWindow'>
                        <Switch>
                            <Route path='/articles'>
                                <ArticlesView/>
                            </Route>
                            <Route path='/lots'>
                                <LotsView/>
                            </Route>
                            <Route path='/orders'>
                                <OrdersView/>
                            </Route>
                            <Route path='/clients'>
                                <ClientsView/>
                            </Route>
                            <Route path='/employees'>
                                <EmployeesView/>
                            </Route>
                            <Route path='/reports'>
                                <ReportsView/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </HashRouter>
        );
    }
}
