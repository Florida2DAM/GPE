import * as React from 'react';
import { createRef, Fragment } from 'react';
import '../App.css';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { GPEInput } from '../components/GPEInput';
import { GPEDatePicker } from "../components/GPEDatePicker";
import { GPEApi, axios, moment } from '../components/GPEConst';

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
            orderNum: 0,
            date: '',
            deliveryDate: '',
            total: 0,
            delivered: '',
            paid: '',
            payingMethod: '',
            employeeId: 0,
            city: '',
            ordersFilteredDates: [],
            showPaid: '',
            showDelivered: '',
            visibleModify: false,
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
        this.setState({ date: e }, () => this.filterDate())
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
                    || element.Client.City.toUpperCase().includes(filterText)) {
                    orderList.push(element);
                }
            });
            this.setState({ orders: orderList });
        }
    };

    filterDate = () => {
        let orderList = [];
        if (this.state.date === '') {
            this.setState({ orders: this.state.allOrders });
        } else {
            this.state.allOrders.forEach(element => {
                const filterDate = this.state.date;
                if (element.Date.includes(filterDate)
                    || element.DeliveryDate.includes(filterDate)) {
                    orderList.push(element);
                }
            });
            this.setState({ orders: orderList });
            this.setState({ ordersFilteredDates: orderList });
        }
    }

    showPaid = () => {

        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Paid == 'Yes') {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showPaid: !this.state.showPaid }) });

    };

    showUnpaid = () => {
        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Paid == 'No') {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showPaid: !this.state.showPaid }) });

    };

    showDelivered = () => {

        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Delivered == 'Yes') {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showDelivered: !this.state.showDelivered }) });
    };

    showNotDelivered = () => {
        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Delivered == 'No') {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showDelivered: !this.state.showDelivered }) });
    };

    modifyOrder = (rowData) => {
        return <Button label='Modify' icon='pi pi-pencil' onClick={() => this.showInputs(rowData)}
            className='p-button-secondary p-mr-2'
            style={{ backgroundColor: '#86AEC2' }} />
    }

    showInputs = (rowData) => {
        this.visibleHandler();
        console.log(rowData)
        this.setState({ orderId: rowData.OrderId });
        this.setState({ clientId: rowData.ClientId });
        this.setState({ orderNum: rowData.OrderNum });
        this.setState({ date: rowData.Date });
        this.setState({ deliveryDate: rowData.DeliveryDate });
        this.setState({ total: rowData.Total });
        this.setState({ delivered: rowData.Delivered });
        this.setState({ paid: rowData.Paid });
        this.setState({ payingMethod: rowData.PaymentMethod });
        this.setState({ employeeId: rowData.EmployeeId });
        this.setState({ city: rowData.Client.City });
    }

    visibleHandler = () => {
        this.setState({ visibleModify: !this.state.visibleModify });
    }


    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert} />
                <TabView>
                    <TabPanel header='Orders'>
                        {this.state.visibleModify ?

                            <div>
                                <InputText value={this.state.articleId} disabled onChange={this.articleIdHandler}
                                    placeholder='Articulo ID' style={{ width: '100px' }} />
                                <InputText value={this.state.descrpition} onChange={this.descrpitionHandler}
                                    placeholder='Description' style={{ width: '200px' }} />
                                <InputText value={this.state.price} onChange={this.priceHandler}
                                    placeholder='Price' style={{ width: '200px' }} />
                                <InputText value={this.state.brand} onChange={this.brandHandler}
                                    placeholder='Brand' style={{ width: '200px' }} />
                                <InputText value={this.state.category} onChange={this.categoryHandler}
                                    placeholder='Category' style={{ width: '200px' }} />
                                <InputText value={this.state.iva} onChange={this.ivaHandler}
                                    placeholder='Iva' style={{ width: '200px' }} />
                                <Button label='Modify' icon='pi pi-send' onClick={this.updateArticle}
                                    className='p-button-secondary p-mr-2'
                                    style={{ backgroundColor: '#77FF94', color: 'black' }} />
                            </div>
                            :
                            <div>
                                <div className='flexCenter'>
                                    <GPEInput onChange={this.filterHandler} />
                                    <GPEDatePicker tittle={'Date'} getDate={this.dateHandler} />
                                    <Button label='Refresh' icon='pi pi-refresh' onClick={this.getOrders}
                                        className='p-button-secondary p-mr-2'
                                        style={{ backgroundColor: '#86AEC2' }} />

                                    {this.state.showPaid ? <Button label='Show Paid' onClick={this.showPaid}
                                        className='p-button-secondary p-mr-2' icon='pi pi-eye'
                                        style={{ backgroundColor: '#86AEC2' }} /> :
                                        <Button label='Show unpaid' onClick={this.showUnpaid}
                                            className='p-button-secondary p-mr-2' icon='pi pi-eye'
                                            style={{ backgroundColor: '#86AEC2' }} />
                                    }
                                    {this.state.showDelivered ? <Button label='Show delivered' onClick={this.showDelivered}
                                        className='p-button-secondary p-mr-2' icon='pi pi-eye'
                                        style={{ backgroundColor: '#86AEC2' }} /> :
                                        <Button label='Show not delivered' onClick={this.showNotDelivered}
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
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Delivered' header='Delivered' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Paid' header='Paid' />
                                        <Column style={{ textAlign: 'center', width: '30%' }} field='PayingMethod' header='Method' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='EmployeeId' header='EmployeeId' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Client.City' header='City' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} body={this.modifyOrder}
                                            field="Modify" header="Modify" />
                                    </DataTable>
                                </div>
                            </div>
                        }
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
