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
import { axios, GPEApi, moment } from '../components/GPEConst';

export class OrdersView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            orders: [],
            allOrders: [],
            orderLines: [],
            allOrderLines: [],
            filter: '',
            filterLine: '',
            orderId: 0,
            clientId: 0,
            orderNum: 0,
            date: '',
            deliveryDate: '',
            deliverer: '',
            total: 0,
            delivered: true,
            paid: 0,
            payingMethod: '',
            employeeId: 0,
            ordersFilteredDates: [],
            showPaid: '',
            showDelivered: '',
            visibleModify: false,
            visibleModifyLines: false,
            lineId: 0,
            articleId: 0,
            lotId: '',
            description: '',
            price: 0,
            brand: '',
            category: '',
            quantity: 0,
            iva: 0,
            discount: 0,
            totalLine: 0,
        }
    }

    componentDidMount() {
        this.getOrders();
        this.getOrderLines();
    }

    // We get all orders and orderlines info with this promises and save the info into our states
    getOrders = () => {
        axios.get(GPEApi + 'Orders').then((response) => {
            response.data.forEach(item => {
                item.Date = moment(item.Date).format('DD/MM/YYYY');
                item.DeliveryDate = moment(item.Date).format('DD/MM/YYYY');
            });
            this.setState({ orders: response.data });
            this.setState({ allOrders: response.data });
            this.setState({ ordersFilteredDates: response.data });
            console.log(response.data)
        })
    }

    getOrderLines = () => {
        axios.get(GPEApi + 'OrderLines').then((response) => {
            this.setState({ orderLines: response.data });
            this.setState({ allOrderLines: response.data });
        })
    }

    filterHandler = (e) => {
        this.setState({ filter: e.target.value }, () => {
            this.filter();
            console.log(this.state.filter);
        });
    };

    filterLineHandler = (e) => {
        this.setState({ filterLine: e.target.value }, () => {
            this.filterLines();
            console.log(this.state.filterLine);
        });
    };

    getDelivered = (e) => {
        if (this.state.delivered) {
            this.setState({ delivered: 'No' })
        } else this.setState({ delivered: 'Yes' })
    }

    dateFilterHandler = (e) => {
        e = moment(e).format('DD/MM/YYYY')
        this.setState({ date: e }, () => this.filterDate())
    }

    filter = () => {
        let orderList = [];
        if (this.state.filter === '') {
            this.setState({ orders: this.state.allOrders });
        } else {
            this.state.ordersFilteredDates.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.OrderId == (filterText)
                    || element.ClientId == (filterText)
                    || element.EmployeeId == (filterText)
                    || element.OrderNum == (filterText)
                    || element.Deliverer.toUpperCase().includes(filterText)
                    || element.Client.City.toUpperCase().includes(filterText)
                ) {
                    orderList.push(element);
                }
            });
            this.setState({ orders: orderList });
        }
    };

    filterLines = () => {
        let lineList = [];
        if (this.state.filterLines == '') {
            this.setState({ orderLines: this.state.allOrderLines });
        } else {
            this.state.orderLines.forEach(element => {
                const filterText = this.state.filterLine;
                if (element.OrderId == (filterText)) {
                    lineList.push(element);
                }
            });
            this.setState({ orderLines: lineList });
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

    btnActive = (rowData) => {
        return (<>{rowData.Delivered ?
            <Button label='YES' className='p-button-success' />
            :
            <Button label='NO' className=' p-button-danger' />
        }
        </>)
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

    showDelivered = () => {

        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Delivered == true) {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showDelivered: !this.state.showDelivered }) });
    };

    showNotDelivered = () => {
        let orderList = [];
        this.state.allOrders.forEach(element => {
            if (element.Delivered == false) {
                orderList.push(element);
            }
        });
        this.setState({ orders: orderList }, () => { this.setState({ showDelivered: !this.state.showDelivered }) });
    };

    modifyOrderLine = (rowData) => {
        return <Button label='Modify' icon='pi pi-pencil' onClick={() => this.showInputsLines(rowData)}
            className='p-button-secondary p-mr-2'
            style={{ backgroundColor: '#86AEC2' }} />
    }

    changePage = (rowData) => {
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
        this.setState({ deliverer: rowData.Deliverer });
        this.setState({ delivered: rowData.Delivered });
        this.setState({ payingMethod: rowData.PayingMethod });
        this.setState({ employeeId: rowData.EmployeeId });
        this.setState({ paid: rowData.Paid });
    }

    showInputsLines = (rowData) => {
        this.visibleHandlerLines();
        console.log(rowData)
        this.setState({ orderId: rowData.OrderId });
        this.setState({ lineId: rowData.LineId });
        this.setState({ articleId: rowData.ArticleId });
        this.setState({ lotId: rowData.LotId });
        this.setState({ description: rowData.Description });
        this.setState({ price: rowData.Price });
        this.setState({ brand: rowData.Brand });
        this.setState({ category: rowData.Category });
        this.setState({ quantity: rowData.Quantity });
        this.setState({ iva: rowData.Iva })
        this.setState({ discount: rowData.Discount });
        this.setState({ totalLine: rowData.TotalLine });
    }

    visibleHandler = () => {
        this.setState({ visibleModify: !this.state.visibleModify });
    }
    visibleHandlerLines = () => {
        this.setState({ visibleModifyLines: !this.state.visibleModifyLines });
    }
    orderIdHandler = (e) => {
        this.setState({ orderId: e.target.value });
    }
    clientIdHandler = (e) => {
        this.setState({ clientId: e.target.value });
    }
    dateHandler = (e) => {
        this.setState({ date: e.target.value });
    }
    deliveryDateHandler = (e) => {
        this.setState({ deliveryDate: e.target.value });
    }
    delivererHandler = (e) => {
        this.setState({ deliverer: e.target.value });
    }
    deliveredHandler = () => {
        this.setState({ delivered: !this.state.delivered });
    }
    totalHandler = (e) => {
        this.setState({ total: e.target.value })
    }
    paidHandler = (e) => {
        this.setState({ paid: e.target.value })
    }
    payingMethodHandler = (e) => {
        this.setState({ payingMethod: e.target.value });
    }
    employeeIdHandler = (e) => {
        this.setState({ employeeId: e.target.value });
    }
    lineIdHandler = (e) => {
        this.setState({ lineId: e.target.value });
    }
    articleIdHandler = (e) => {
        this.setState({ articleId: e.target.value });
    }
    lotIdHandler = (e) => {
        this.setState({ lotId: e.target.value });
    }
    descriptionHandler = (e) => {
        this.setState({ description: e.target.value });
    }
    priceHandler = (e) => {
        this.setState({ price: e.target.value });
    }
    brandHandler = (e) => {
        this.setState({ brand: e.target.value });
    }
    categoryHandler = (e) => {
        this.setState({ category: e.target.value });
    }
    quantityHandler = (e) => {
        this.setState({ quantity: e.target.value });
    }
    ivaHandler = (e) => {
        this.setState({ iva: e.target.value });
    }
    discountHandler = (e) => {
        this.setState({ discount: e.target.value });
    }
    totalLineHandler = (e) => {
        this.setState({ totalLine: e.target.value });
    }

    updateOrder = () => {
        let order = {
            OrderId: this.state.orderId,
            Clientid: this.state.clientId,
            OrderNum: this.state.orderNum,
            Date: this.state.date,
            DeliveryDate: this.state.deliveryDate,
            Deliverer: this.state.deliverer,
            Total: this.state.total,
            Delivered: this.state.delivered,
            Paid: this.state.paid,
            PayingMethod: this.state.payingMethod,
            EmployeeId: this.state.employeeId,
        }
        console.log(order);
        axios.put(GPEApi + 'Orders', order).then(response => {
            this.visibleHandler();
            this.getOrders();
            this.clearInputs();
        }
        )
    }

    updateOrderLine = () => {
        let orderLine = {
            OrderId: this.state.orderId,
            LineId: this.state.lineId,
            ArticleId: this.state.articleId,
            LotId: this.state.lotId,
            Description: this.state.description,
            Price: this.state.price,
            Brand: this.state.brand,
            Category: this.state.category,
            Quantity: this.state.quantity,
            Iva: this.state.iva,
            Discount: this.state.discount,
            TotalLine: this.state.totalLine,
        }
        console.log(orderLine);
        axios.put(GPEApi + 'OrderLines', orderLine).then(response => {
            this.visibleHandlerLines();
            this.getOrderLines();
            this.clearInputs();
        }
        )
    }

    clearInputs = () => {
        this.setState({ orderId: 0 });
        this.setState({ clientId: 0 });
        this.setState({ orderNum: 0 });
        this.setState({ date: '' });
        this.setState({ deliveryDate: '' });
        this.setState({ deliverer: '' });
        this.setState({ paid: 0 })
        this.setState({ total: 0 });
        this.setState({ payingMethod: '' });
        this.setState({ EmployeeId: 0 });
        this.setState({ lineId: 0 });
        this.setState({ articleId: 0 });
        this.setState({ lotId: '' });
        this.setState({ description: '' });
        this.setState({ price: 0 });
        this.setState({ brand: '' });
        this.setState({ category: '' });
        this.setState({ quantity: 0 });
        this.setState({ iva: 0 })
        this.setState({ discount: 0 });
        this.setState({ totalLine: 0 });
    }

    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert} />
                <TabView>
                    <TabPanel header='Orders'>
                        {this.state.visibleModify ?
                            <div>
                                <div className='orderLinesView'>
                                    <InputText value={this.state.orderId} onChange={this.orderIdHandler} disabled
                                        placeholder='Order ID' style={{ width: '100px' }} />
                                    <InputText value={this.state.clientId} onChange={this.clientIdHandler} disabled
                                        placeholder='Client ID' style={{ width: '200px' }} />
                                    <InputText value={this.state.date} onChange={this.dateHandler} disabled
                                        placeholder='Date' style={{ width: '200px' }} />
                                    <InputText value={this.state.deliveryDate} onChange={this.deliveryDateHandler} disabled
                                        placeholder='Delivery Date' style={{ width: '200px' }} />
                                    <InputText value={this.state.deliverer} onChange={this.delivererHandler} disabled
                                        placeholder='Deliverer' style={{ width: '200px' }} />
                                    <InputText value={this.state.total} onChange={this.totalHandler} disabled
                                        placeholder='Total' style={{ width: '200px' }} />
                                    <InputText value={this.state.paid} onChange={this.paidHandler}
                                        placeholder='Paid' style={{ width: '200px' }} />
                                    <InputText value={this.state.payingMethod} onChange={this.payingMethodHandler}
                                        placeholder='Paying Method' style={{ width: '200px' }} />
                                    <InputText value={this.state.employeeId} onChange={this.employeeIdHandler} disabled
                                        placeholder='Employee ID' style={{ width: '200px' }} />
                                    {this.state.delivered ?
                                        <Button label='YES' onClick={this.deliveredHandler} className='p-button-success' />
                                        :
                                        <Button label='NO' onClick={this.deliveredHandler} className=' p-button-danger' />
                                    }
                                    <Button label='Modify' icon='pi pi-send' onClick={this.updateOrder}
                                        className='p-button-secondary p-mr-2'
                                        style={{ backgroundColor: '#77FF94', color: 'black' }} />
                                </div>
                                <div>
                                    <DataTable value={this.state.orderLines}>
                                        <Column style={{ textAlign: 'center', width: '20%' }} field='OrderId' header='OrderId' />
                                        <Column style={{ textAlign: 'center', width: '20%' }} field='LineId' header='LineId' />
                                        <Column style={{ textAlign: 'center', width: '20%' }} field='ArticleId' header='ArticleId' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='LotId' header='LotId' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Description' header='Description' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Price' header='Price' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Brand' header='Brand' />
                                        <Column style={{ textAlign: 'center', width: '10%' }} field='Category' header='Category' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Quantity' header='Quantity' />
                                        <Column style={{ textAlign: 'center', width: '30%' }} field='Iva' header='Iva' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='Discount' header='Discount' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} field='TotalLine' header='TotalLine' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} body={this.modifyOrderLine}
                                            field="Modify" header="Modify" />
                                    </DataTable>
                                </div>
                            </div>
                            :
                            <div>
                                <div className='flexCenter'>
                                    <GPEInput onChange={this.filterHandler} />
                                    <GPEDatePicker tittle={'Date'} getDate={this.dateFilterHandler} />
                                    <Button label='Refresh' icon='pi pi-refresh' onClick={this.getOrders}
                                        className='p-button-secondary p-mr-2'
                                        style={{ backgroundColor: '#86AEC2' }} />

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
                                        <Column style={{ textAlign: 'center', width: '10%' }} field='Deliverer' header='Deliverer' />
                                        <Column style={{ textAlign: 'center', width: '15%' }} field='Total' header='Total' />
                                        <Column style={{ textAlign: 'center', width: '15%' }} field='Paid' header='Paid' />
                                        <Column style={{ textAlign: 'center', width: '20%' }} field='PayingMethod' header='Method' />
                                        <Column style={{ textAlign: 'center', width: '20%' }} field='EmployeeId' header='EmployeeId' />
                                        <Column style={{ textAlign: 'center', width: '20%' }} field='Client.City' header='City' />
                                        <Column body={this.btnActive} style={{ textAlign: 'center', width: '10%' }} field='Delivered' header='Delivered' />
                                        <Column style={{ textAlign: 'center', width: '25%' }} body={this.changePage} field="Modify" header="Modify" />
                                    </DataTable>
                                </div>
                            </div>
                        }
                    </TabPanel>
                    <TabPanel header='Order Lines'>
                        {this.state.visibleModifyLines ?
                            <div>
                                <InputText value={this.state.orderId} disabled onChange={this.orderIdHandler}
                                    placeholder='Order ID' style={{ width: '100px' }} />
                                <InputText value={this.state.lineId} onChange={this.lineIdHandler}
                                    placeholder='Line ID' style={{ width: '200px' }} />
                                <InputText value={this.state.articleId} onChange={this.articleIdHandler}
                                    placeholder='Article ID' style={{ width: '200px' }} />
                                <InputText value={this.state.lotId} onChange={this.lotIdHandler}
                                    placeholder='Lot Id' style={{ width: '200px' }} />
                                <InputText value={this.state.description} onChange={this.descriptionHandler}
                                    placeholder='Description' style={{ width: '200px' }} />
                                <InputText value={this.state.price} onChange={this.priceHandler}
                                    placeholder='Price' style={{ width: '200px' }} />
                                <InputText value={this.state.paid} onChange={this.brandHandler}
                                    placeholder='Brand' style={{ width: '200px' }} />
                                <InputText value={this.state.category} onChange={this.categoryHandler}
                                    placeholder='Category' style={{ width: '200px' }} />
                                <InputText value={this.state.quantity} onChange={this.quantityHandler}
                                    placeholder='Quantity' style={{ width: '200px' }} />
                                <InputText value={this.state.iva} onChange={this.ivaHandler}
                                    placeholder='Iva' style={{ width: '200px' }} />
                                <InputText value={this.state.discount} onChange={this.discountHandler}
                                    placeholder='Discount' style={{ width: '200px' }} />
                                <InputText value={this.state.totalLine} onChange={this.totalLineHandler}
                                    placeholder='Total Line' style={{ width: '200px' }} />
                                <Button label='Modify' icon='pi pi-send' onClick={this.updateOrderLine}
                                    className='p-button-secondary p-mr-2'
                                    style={{ backgroundColor: '#77FF94', color: 'black' }} />
                            </div>
                            :
                            <div>
                                <div className='flexCenter'>
                                    <GPEInput onChange={this.filterLineHandler} />
                                    <Button label='Refresh' icon='pi pi-refresh' onClick={this.getOrderLines}
                                        className='p-button-secondary p-mr-2'
                                        style={{ backgroundColor: '#86AEC2' }} />
                                </div>
                                <div>

                                </div>
                            </div>
                        }
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
