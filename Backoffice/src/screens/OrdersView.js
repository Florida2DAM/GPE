import * as React from 'react';
import { createRef, Fragment } from 'react';
import '../App.css';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from "primereact/toast";
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
            ordersFilteredDates: [],
            showPaid: '',
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
            this.setState({ allOrders: response.data });
            this.setState({ ordersFilteredDates: response.data });
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
            this.state.ordersFilteredDates.forEach(element => {
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
                if (element.Date.includes(filterDate)
                    || element.DeliveryDate.includes(filterDate)){
                    orderList.push(element);
                }
            });
            this.setState({ orders: orderList });
            this.setState({ ordersFilteredDates: orderList });
        }
    }

    btnPaid = (rowData) => {
        return (<>{rowData.Paid ?
            <Button label='YES' onClick={() => this.changePaid(rowData)} className='p-button-success' />
            :
            <Button label='NO' onClick={() => this.changePaid(rowData)} className=' p-button-danger' />
        }
        </>)
    }

    btnDelivered = (rowData) => {
        return (<>{rowData.Delivered ?
            <Button label='YES' onClick={() => this.changeDelivered(rowData)} className='p-button-success' />
            :
            <Button label='NO' onClick={() => this.changeDelivered(rowData)} className=' p-button-danger' />
        }
        </>)
    }

    changePaid = (orders) => {
        axios.put(GPEApi + 'Orders/' + orders.OrdersId).then(() => this.getOrders())
    }

    changeDelivered = (orders) => {
        axios.put(GPEApi + 'Orders/' + orders.OrdersId).then(() => this.getOrders())
    }

    showPaid = () => {

        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Enabled == true) {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showPaid: !this.state.showPaid }) });

    };

    showDisable = () => {
        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Enabled == false) {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showPaid: !this.state.showPaid }) });

    };
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
                            <Button label='Refresh' icon='pi pi-refresh' onClick={this.getOrders}
                                            className='p-button-secondary p-mr-2'
                                            style={{backgroundColor: '#86AEC2'}}/>
                            <GPEDatePicker tittle={'Date'} getDate={this.dateHandler}/>
                            {this.state.show ? <Button label='Show Enable' onClick={this.showEnable}
                                        className='p-button-secondary p-mr-2' icon='pi pi-eye'
                                        style={{ backgroundColor: '#86AEC2' }} /> :
                                        <Button label='Show Disable' onClick={this.showDisable}
                                            className='p-button-secondary p-mr-2' icon='pi pi-eye'
                                            style={{ backgroundColor: '#86AEC2' }} />
                                    }
                        </div>
                        <div>
                            <DataTable value={this.state.orders}>
                                <Column style={{ textAlign: 'center', width: '10%' }} field='OrderId' header='OrderId' />
                                <Column style={{ textAlign: 'center', width: '10%' }} field='ClientId' header='ClientId' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='OrderNum' header='OrderNum' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Date' header='Date' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='DeliveryDate' header='DeliveryDate' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Deliverer' header='Deliverer' />
                                <Column style={{ textAlign: 'center', width: '25%' }} field='Total' header='Total' />
                                <Column body={this.btnDelivered} style={{ textAlign: 'center', width: '20%' }} field='Delivered' header='Delivered' />
                                <Column body={this.btnPaid} style={{ textAlign: 'center', width: '20%' }} field='Paid' header='Paid' />
                                <Column style={{ textAlign: 'center', width: '30%' }} field='PayingMethod' header='Method' />
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
