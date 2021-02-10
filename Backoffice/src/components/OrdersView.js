import * as React from 'react';
import {createRef, Fragment} from 'react';
import '../App.css';
import {TabPanel, TabView} from 'primereact/tabview';
import {Toast} from "primereact/toast";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

const axios = require('axios');
const moment = require('moment');
const api = 'http://54.160.33.104:80/api/';

export class OrdersView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            orders: [],
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        axios.get(api + 'Orders').then((response) => {
            response.data.forEach(item => {
                item.Date = moment(item.Date).format('YYYY-MM-DD');
                item.DeriveryDate = moment(item.Date).format('YYYY-MM-DD');
                if (item.Delivered === true) {
                    item.Delivered = 'Yes';
                } else {
                    item.Delivered = 'No';
                }
                if (item.Paid === true) {
                    item.Paid = 'Yes';
                } else {
                    item.Paid = 'No';
                }
            });
            this.setState({orders: response.data});
        })
    }

    // showSuccess = () => {
    //     this.GPEAlert.current.show({severity: 'success', summary: 'Hecho', life: 3000});
    // }
    //
    // showInfoSuccess = (detailValue) => {
    //     this.GPEAlert.current.show({severity: 'success', summary: 'Hecho', detail: detailValue, life: 3000});
    // }
    //
    // showError = (error) => {
    //     this.GPEAlert.current.show({severity: 'error', summary: 'Error', detail: error, sticky: true});
    // }

    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert}/>
                <TabView>
                    <TabPanel header='Orders'>
                        <div className='flexCenter'>
                            <InputText value={this.state.local} onChange={this.handlerLocal}
                                       placeholder='Equipo local'/>
                            <InputText value={this.state.visitant} onChange={this.handlerVisitant}
                                       placeholder='Equipo visitante'/>
                            <InputText value={this.state.date} onChange={this.handlerDate} disabled={this.state.eventId}
                                       placeholder='Fecha: 2000-01-01 00:00:00' style={{width: '230px'}}/>
                            <Button label='Actualizar' icon='pi pi-refresh' onClick={this.resetStates}
                                    className='p-button-secondary p-mr-2'
                                    style={{backgroundColor: '#86AEC2'}}/>
                            <Button label='Filtrar' icon='pi pi-filter' onClick={this.filterButton}
                                    className='p-button-secondary p-mr-2'/>
                        </div>
                        <div>
                            <DataTable value={this.state.orders}>
                                <Column style={{textAlign: 'center', width: '15%'}} field='OrderId'
                                        header='OrderId'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='ClientId'
                                        header='ClientId'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='OrderNum'
                                        header='OrderNum'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Date'
                                        header='Date'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='DeriveryDate'
                                        header='DeriveryDate'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='ContactName'
                                        header='ContactName'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Total'
                                        header='Total'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Delivered' header='Delivered'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Paid' header='Paid'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='PayingMethod' header='PayingMethod'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='EmployeeId' header='EmployeeId'/>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
