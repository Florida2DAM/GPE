import * as React from 'react';
import { createRef, Fragment } from 'react';
import '../App.css';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from "primereact/toast";
import {Checkbox} from 'primereact/checkbox';
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { GPEApi, axios, moment } from '../components/GPEConst';
import { GPEInput } from '../components/GPEInput';
import { GPEDatePicker } from "../components/GPEDatePicker";

export class OrdersView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            orders: [],
            allOrders: [],
            filter: '',
            orderId: 0,
            clientId: 0,
            delivered: '',
            date: '',
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        axios.get(GPEApi + 'Orders').then((response) => {
            response.data.forEach(item => {
                item.Date = moment(item.Date).format('YYYY-MM-DD');
                item.DeliveryDate = moment(item.Date).format('YYYY-MM-DD');
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
            this.setState({ orders: response.data });
            this.setState({ allOrders: response.data })
        })
    }

    filterHandler = (e) => {
        this.setState({ filter: e.target.value }, () => {
            this.filter();
            console.log(this.state.filter);
        });
    };

    getDelivered = (e) => {
        if (this.state.delivered) {
            this.setState({ delivered: 'No' })
        } else this.setState({ delivered: 'Yes' })   
    }

    dateHandler = (e) => {
        e = moment(e).format('YYYY-MM-DD')
        this.setState({ date: e}, () => this.filterDate())
    }

    filter = () => {
        let orderList = [];
        if (this.state.filter == '') {
            this.setState({ orders: this.state.allOrders });
        } else {
            this.state.allOrders.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.OrderId == (filterText)
                    || element.ClientId == (filterText)
                    || element.Client.City.toUpperCase().includes(filterText) ){
                    orderList.push(element);
                }
            });
            this.setState({ orders: orderList });
        }
    };

    filterDate = () => {
        let orderList = [];
        if (this.state.date === ''){
            this.setState({ orders: this.state.allOrders });
        } else {
            this.state.allOrders.forEach(element => {
                const filterDate = this.state.date;
                if (element.Date.includes(filterDate)){
                    console.log("ha pasado");
                    orderList.push(element);
                }
            });
            this.setState({ orders: orderList });
        }
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
                <Toast ref={this.GPEAlert} />
                <TabView>
                    <TabPanel header='Orders'>
                        <div className='flexCenter'>
                            <GPEInput onChange={this.filterHandler} />
                            <Button label='Actualizar' icon='pi pi-refresh' onClick={this.getOrders}
                                            className='p-button-secondary p-mr-2'
                                            style={{backgroundColor: '#86AEC2'}}/>
                            <Checkbox onChange={this.getDelivered} checked={this.state.delivered}></Checkbox>
                            <GPEDatePicker tittle={'Date'} getDate={this.dateHandler}/>
                        </div>
                        <div>
                            <DataTable value={this.state.orders}>
                                <Column style={{ textAlign: 'center', width: '15%' }} field='OrderId' header='OrderId' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='ClientId' header='ClientId' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='OrderNum' header='OrderNum' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Date' header='Date' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='DeliveryDate' header='DeliveryDate' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Deliverer' header='Deliverer' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Total' header='Total' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Delivered' header='Delivered' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Paid' header='Paid' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='PayingMethod' header='Method' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='EmployeeId' header='EmployeeId' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Client.City' header='City' />
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
