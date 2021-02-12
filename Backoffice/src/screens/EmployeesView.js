import * as React from 'react';
import {createRef, Fragment} from 'react';
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {TabPanel, TabView} from 'primereact/tabview';
import {Toast} from 'primereact/toast';

import {axios, GPEApi} from '../components/GPEConst'

export class EmployeesView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            employees: [],
        }
    }

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees = () => {
        axios.get(GPEApi + 'Employees').then((response) => {
            response.data.forEach(item => {
                if (item.Enabled === true) {
                    item.Enabled = 'Yes';
                } else {
                    item.Enabled = 'No';
                }
            });
            this.setState({employees: response.data});
        })
    }
    // getMarkets = () => {
    //     axios.get(GPEApi+'Mercados').then((response) => {
    //         response.data.forEach(item => {
    //             if (item.Bloqueado === true) {
    //                 item.Bloqueado = 'Si';
    //             } else {
    //                 item.Bloqueado = 'No';
    //             }
    //             item.DineroOver += '€';
    //             item.DineroUnder += '€';
    //         });
    //         this.setState({markets: response.data});
    //     })
    // }
    //
    // filterMail = () => {
    //     axios.get(GPEApi+'Apuestas/GetEmail?UsuarioId=' + this.state.userId).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
    //             item.DineroApostado = item.DineroApostado + '€';
    //         })
    //         this.setState({employees: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // filterMarket = () => {
    //     axios.get(GPEApi+'Apuestas/GetMercado?MercadoId=' + this.state.marketId).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
    //             item.DineroApostado = item.DineroApostado + '€';
    //         })
    //         this.setState({employees: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // filterEvent = () => {
    //     axios.get(GPEApi+'Apuestas/GetEvento?EventoId=' + this.state.eventId).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
    //             item.DineroApostado = item.DineroApostado + '€';
    //         })
    //         this.setState({employees: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // createMarkets = () => {
    //     axios.post(GPEApi+'Mercados?EventoId=' + this.state.eventId).then(() => {
    //         this.showInfoSuccessToast('Mercados para el evento ' + this.state.eventId + ' creados');
    //         this.resetStates();
    //         this.getMarkets();
    //     })
    //         .catch(error => {
    //             this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que haya introducido el ID de Evento para realizar la inserción de nuevos mercados');
    //         });
    // }
    // lockMarket = () => {
    //     axios.get(GPEApi+'Mercados/Locked?MercadoId=' + this.state.marketId).then((response) => {
    //         if (response.data.Bloqueado) {
    //             this.showErrorToast('Este mercado ya esta bloqueado');
    //             this.resetStates();
    //         } else {
    //             axios.put(GPEApi+'Mercados/Lock?MercadoId=' + this.state.marketId).then(() => {
    //                 this.showInfoSuccessToast('Mercado ' + this.state.marketId + ' bloqueado');
    //                 this.resetStates();
    //                 this.getMarkets();
    //             })
    //                 .catch(error => {
    //                     this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que ha introducido el ID de Mercado a bloquear correcto.');
    //                 });
    //         }
    //     });
    // }
    // unlockMarket = () => {
    //     axios.get(GPEApi+'Mercados/Locked?MercadoId=' + this.state.marketId).then((response) => {
    //         if (!response.data.Bloqueado) {
    //             this.showErrorToast('Este mercado ya esta desbloqueado');
    //             this.resetStates();
    //         } else {
    //             axios.put(GPEApi+'Mercados/Unlock?MercadoId=' + this.state.marketId).then(() => {
    //                 this.showInfoSuccessToast('Mercado ' + this.state.marketId + ' desbloqueado');
    //                 this.resetStates();
    //                 this.getMarkets();
    //             })
    //                 .catch(error => {
    //                     this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que ha introducido el ID de Mercado a desbloquear correcto.');
    //                 });
    //         }
    //     });
    // }
    //
    // handlerEmail = (event) => {
    //     this.setState({userId: event.target.value});
    // }
    // handlerMarketId = (event) => {
    //     this.setState({marketId: event.target.value});
    // }
    // handlerEventId = (event) => {
    //     this.setState({eventId: event.target.value});
    // }
    //
    // resetStates = () => {
    //     this.getEmployees();
    //     this.setState({userId: ''});
    //     this.setState({marketId: ''});
    //     this.setState({eventId: ''});
    // }
    //
    // filterButton = () => {
    //     if (this.state.userId) {
    //         this.filterMail();
    //     }
    //     if (this.state.marketId) {
    //         this.filterMarket();
    //     }
    //     if (this.state.eventId) {
    //         this.filterEvent();
    //     }
    // }
    //
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
                    <TabPanel header='Employees Filter'>
                        <div className='flexCenter'>
                            <InputText value={this.state.userId} onChange={this.handlerEmail}
                                       disabled={this.state.marketId || this.state.eventId} placeholder='Email'
                                       style={{width: '40%'}}/>
                            <InputText value={this.state.marketId} onChange={this.handlerMarketId}
                                       disabled={this.state.userId || this.state.eventId} placeholder='Id Mercado'/>
                            <InputText value={this.state.eventId} onChange={this.handlerEventId}
                                       disabled={this.state.marketId || this.state.userId}
                                       placeholder='ID Evento' style={{width: '15%'}}/>
                            <Button label='Actualizar' icon='pi pi-refresh' onClick={this.resetStates}
                                    className='p-button-secondary p-mr-2'
                                    style={{backgroundColor: '#86AEC2'}}/>
                            <Button label='Filtrar' icon='pi pi-filter' onClick={this.filterButton}
                                    className='p-button-secondary p-mr-2'/>
                        </div>

                    </TabPanel>
                    <TabPanel header='New Employees'>
                        <div className='flexCenter'>
                            <div className='marketsInputs'>
                                <InputText value={this.state.eventId} onChange={this.handlerEventId}
                                           disabled={this.state.marketId}
                                           placeholder='ID Evento' style={{width: '220px'}}/>
                                <div className='flexCenter'>
                                    <Button label='Crear Mercados' icon='pi pi-plus' onClick={this.createMarkets}
                                            className='p-button-secondary p-mr-2' style={{width: '220px'}}/>
                                </div>
                            </div>
                            <div className='marketsInputs'>
                                <InputText value={this.state.marketId} onChange={this.handlerMarketId}
                                           disabled={this.state.eventId}
                                           placeholder='Id de mercado' style={{width: '270px'}}/>
                                <div className='flexCenter'>
                                    <Button label='Bloquear' icon='pi pi-lock' onClick={this.lockMarket}
                                            className='p-button-secondary p-mr-2' style={{backgroundColor: '#CA3C25'}}/>
                                    <Button label='Desbloquear' icon='pi pi-unlock' onClick={this.unlockMarket}
                                            className='p-button-secondary p-mr-2'
                                            style={{backgroundColor: '#77FF94', color: 'black'}}/>
                                </div>
                            </div>
                        </div>

                    </TabPanel>
                </TabView>
                <div>
                    <DataTable value={this.state.employees}>
                        <Column style={{textAlign: 'center', width: '12%'}} field='EmployeeId'
                                header='EmployeeId'/>
                        <Column style={{textAlign: 'center', width: '9%'}} field='Name' header='Name'/>
                        <Column style={{textAlign: 'center', width: '11%'}} field='Type'
                                header='Type'/>
                        <Column style={{textAlign: 'center', width: '8%'}} field='Enabled' header='Enabled'/>
                    </DataTable>
                </div>
            </Fragment>
        )
    }

    /*
    * import * as React from 'react';
import {createRef, Fragment} from 'react';
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {TabPanel, TabView} from 'primereact/tabview';
import {Toast} from 'primereact/toast';
import {axios, GPEApi} from '../components/GPEConst'
import {GPEInput} from '../components/GPEInput';
import {Dropdown} from 'primereact/dropdown';

export class LotsView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            lots: [],
            allLots: [],
            date: '',
            filter: '',
            lotId: '',
            articleId: '',
            allArticleId: [],
            stock: 0,
            visible: true,
            activeIndex: 0,
        }
    }

    componentDidMount() {
        this.getLots();
    }

    getLots = () => {
        axios.get(GPEApi + 'Lots').then((response) => {
            this.setState({allLots: response.data});
            this.setState({lots: response.data});
        })
        this.getArticleIds();
    }
    getArticleIds = () => {
        axios.get(GPEApi + 'Articles/BackOffice').then((response) => {
            let articleIds = [];
            response.data.forEach(e => {
                articleIds.push(e.ArticleId)
            })
            this.setState({allArticleId: articleIds});
            console.log(articleIds)
        })
    }
    updateLot = () => {
        let lot = {
            ArticleId: this.state.articleId,
            LotId: this.state.lotId,
            stock: this.state.stock
        }
        axios.put(GPEApi + 'Lots', lot).then(response => {
                this.visibleHandler();
                this.getLots();
                this.clearInputs();
            }
        )

    }
    checkIputs = () => {
        if (this.state.stock == '' || this.state.articleId == '' || this.state.lotId == '') {
            return false;
        } else {
            return true;
        }
    }
    addLots = () => {
        if (this.checkIputs()) {
            let lot = {
                ArticleId: this.state.articleId,
                LotId: this.state.lotId,
                stock: this.state.stock
            }
            axios.post(GPEApi + 'Lots', lot).then(response => {
                    this.getLots();
                    this.clearInputs();
                    this.setState({activeIndex: 0});
                }
            )
        } else {
            alert("You have to introduce all fields")
        }

    }

    lotIdHandler = (e) => {
        this.setState({lotId: e.target.value});
    };
    stockHandler = (e) => {
        this.setState({stock: e.target.value});
    };
    articleIdHandler = (e) => {
        this.setState({articleId: e.target.value}, console.log(e.target.value));
    }
    filterHandler = (e) => {
        this.setState({filter: e.target.value}, () => {
            this.filter();
            console.log(this.state.filter);
        });
    };

    filter = () => {

        let lotList = [];
        if (this.state.filter === '') {
            this.setState({lots: this.state.allLots});
        } else {
            this.state.allLots.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.ArticleId == (filterText)
                    || element.LotId.toUpperCase().includes(filterText)) {
                    lotList.push(element);
                }
            });
            this.setState({lots: lotList});
        }
    };

    changePage = (rowData) => {
        return <Button label='Modify' icon='pi pi-pencil' onClick={() => this.showInputs(rowData)}
                       className='p-button-secondary p-mr-2'
                       style={{backgroundColor: '#86AEC2'}}/>
    }

    visibleHandler = () => {
        this.setState({visible: !this.state.visible});
    }

    showInputs = (rowData) => {
        this.visibleHandler();
        console.log(rowData)
        this.setState({lotId: rowData.LotId});
        this.setState({stock: rowData.Stock}, () => console.log(this.state.stock));
        this.setState({articleId: rowData.ArticleId});
    }
    clearInputs = () => {
        this.setState({lotId: ''});
        this.setState({stock: ''});
        this.setState({articleId: ''});
    }

    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert}/>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header='Lots'>
                        {this.state.visible === true ? <div>
                                <div className='flexCenter'>
                                    <GPEInput onChange={this.filterHandler}/>
                                    <Button label='Actualizar' icon='pi pi-refresh' onClick={this.getLots}
                                            className='p-button-secondary p-mr-2'
                                            style={{backgroundColor: '#86AEC2'}}/>
                                </div>
                                <div>
                                    <DataTable value={this.state.lots}>
                                        <Column style={{textAlign: 'center', width: '12%'}} field='ArticleId'
                                                header='ArticleId'/>
                                        <Column style={{textAlign: 'center', width: '9%'}} field='LotId' header='LotId'/>
                                        <Column style={{textAlign: 'center', width: '11%'}} field='Stock' header='Stock'/>
                                        <Column style={{textAlign: 'center', width: '11%'}} body={this.changePage}
                                                field="Modify" header="Modify"></Column>
                                    </DataTable>
                                </div>
                            </div>
                            :
                            <div>
                                <Dropdown value={this.state.articleId} options={this.state.allArticleId}
                                          onChange={this.articleIdHandler} placeholder="Select a Id"/>
                                <InputText value={this.state.lotId} onChange={this.lotIdHandler}
                                           placeholder='Lot Id' style={{width: '220px'}}/>
                                <InputText value={this.state.stock} onChange={this.stockHandler}
                                           placeholder='Stock Number' style={{width: '220px'}}/>
                                <Button label='Modify' icon='pi pi-send' onClick={this.updateLot}
                                        className='p-button-secondary p-mr-2'
                                        style={{backgroundColor: '#77FF94', color: 'black'}}/>
                            </div>}
                    </TabPanel>
                    <TabPanel header='New Lot'>
                        <div className='flexCenter'>
                            <div>
                                <Dropdown value={this.state.articleId} options={this.state.allArticleId}
                                          onChange={this.articleIdHandler} placeholder="Select a Id"
                                          className={this.state.articleId == '' && "p-invalid p-d-block"}/>
                                <InputText value={this.state.lotId} onChange={this.lotIdHandler}
                                           placeholder='Lot Id' style={{width: '220px'}}
                                           className={this.state.lotId == '' && "p-invalid p-d-block"}/>
                                <InputText value={this.state.stock} onChange={this.stockHandler}
                                           placeholder='Stock Number' style={{width: '220px'}}
                                           className={this.state.stock == '' && "p-invalid p-d-block"}/>
                            </div>
                            <div className='flexCenter'>
                                <Button label=' New Lot' icon='pi pi-plus-circle' onClick={this.addLots}
                                        className='p-button-secondary p-mr-2'
                                        style={{backgroundColor: '#77FF94', color: 'black'}}/>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}

    *
    *
    * */
}
