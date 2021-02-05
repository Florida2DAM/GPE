import * as React from 'react';
import {Fragment} from 'react';
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {TabPanel, TabView} from 'primereact/tabview';
import {Toast} from 'primereact/toast';
import {createRef} from 'react';

const axios = require('axios');
const moment = require('moment');
const apiPort = '44342';
const api = 'https://localhost:' + apiPort + '/api/';

export class LotsView extends React.Component {

    constructor(props) {
        super(props);
        this.coolToast = createRef();
        this.state = {
            bets: [],
            markets: [],
            marketId: '',
            userId: '',
            eventId: ''
        }
    }

    componentDidMount() {
        this.getBets();
        this.getMarkets();
    }

    getBets = () => {
        axios.get(api+'Apuestas').then((response) => {
            response.data.forEach(item => {
                item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
                item.DineroApostado += '€';
            })
            this.setState({bets: response.data});
        })
    }
    getMarkets = () => {
        axios.get(api+'Mercados').then((response) => {
            response.data.forEach(item => {
                if (item.Bloqueado === true) {
                    item.Bloqueado = 'Si';
                } else {
                    item.Bloqueado = 'No';
                }
                item.DineroOver += '€';
                item.DineroUnder += '€';
            });
            this.setState({markets: response.data});
        })
    }

    filterMail = () => {
        axios.get(api+'Apuestas/GetEmail?UsuarioId=' + this.state.userId).then((response) => {
            response.data.forEach(item => {
                item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
                item.DineroApostado = item.DineroApostado + '€';
            })
            this.setState({bets: response.data});
            this.showSuccessToast();
        })
    }
    filterMarket = () => {
        axios.get(api+'Apuestas/GetMercado?MercadoId=' + this.state.marketId).then((response) => {
            response.data.forEach(item => {
                item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
                item.DineroApostado = item.DineroApostado + '€';
            })
            this.setState({bets: response.data});
            this.showSuccessToast();
        })
    }
    filterEvent = () => {
        axios.get(api+'Apuestas/GetEvento?EventoId=' + this.state.eventId).then((response) => {
            response.data.forEach(item => {
                item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
                item.DineroApostado = item.DineroApostado + '€';
            })
            this.setState({bets: response.data});
            this.showSuccessToast();
        })
    }
    createMarkets = () => {
        axios.post(api+'Mercados?EventoId=' + this.state.eventId).then(() => {
            this.showInfoSuccessToast('Mercados para el evento ' + this.state.eventId + ' creados');
            this.resetStates();
            this.getMarkets();
        })
            .catch(error => {
                this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que haya introducido el ID de Evento para realizar la inserción de nuevos mercados');
            });
    }
    lockMarket = () => {
        axios.get(api+'Mercados/Locked?MercadoId=' + this.state.marketId).then((response) => {
            if (response.data.Bloqueado) {
                this.showErrorToast('Este mercado ya esta bloqueado');
                this.resetStates();
            } else {
                axios.put(api+'Mercados/Lock?MercadoId=' + this.state.marketId).then(() => {
                    this.showInfoSuccessToast('Mercado ' + this.state.marketId + ' bloqueado');
                    this.resetStates();
                    this.getMarkets();
                })
                    .catch(error => {
                        this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que ha introducido el ID de Mercado a bloquear correcto.');
                    });
            }
        });
    }
    unlockMarket = () => {
        axios.get(api+'Mercados/Locked?MercadoId=' + this.state.marketId).then((response) => {
            if (!response.data.Bloqueado) {
                this.showErrorToast('Este mercado ya esta desbloqueado');
                this.resetStates();
            } else {
                axios.put(api+'Mercados/Unlock?MercadoId=' + this.state.marketId).then(() => {
                    this.showInfoSuccessToast('Mercado ' + this.state.marketId + ' desbloqueado');
                    this.resetStates();
                    this.getMarkets();
                })
                    .catch(error => {
                        this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que ha introducido el ID de Mercado a desbloquear correcto.');
                    });
            }
        });
    }

    handlerEmail = (event) => {
        this.setState({userId: event.target.value});
    }
    handlerMarketId = (event) => {
        this.setState({marketId: event.target.value});
    }
    handlerEventId = (event) => {
        this.setState({eventId: event.target.value});
    }

    resetStates = () => {
        this.getBets();
        this.setState({userId: ''});
        this.setState({marketId: ''});
        this.setState({eventId: ''});
    }

    filterButton = () => {
        if (this.state.userId) {
            this.filterMail();
        }
        if (this.state.marketId) {
            this.filterMarket();
        }
        if (this.state.eventId) {
            this.filterEvent();
        }
    }

    showSuccessToast = () => {
        this.coolToast.current.show({severity: 'success', summary: 'Hecho', life: 3000});
    }

    showInfoSuccessToast = (detailValue) => {
        this.coolToast.current.show({severity: 'success', summary: 'Hecho', detail: detailValue, life: 3000});
    }

    showErrorToast = (error) => {
        this.coolToast.current.show({severity: 'error', summary: 'Error', detail: error, sticky: true});
    }

    render() {
        return (
            <Fragment>
                <Toast ref={this.coolToast}/>
                <TabView>
                    <TabPanel header='Filtrar Apuestas'>
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
                        <div>
                            <DataTable value={this.state.bets}>
                                <Column style={{textAlign: 'center', width: '12%'}} field='ApuestaId'
                                        header='IDApuesta'/>
                                <Column style={{textAlign: 'center', width: '9%'}} field='TipoApuesta' header='Tipo'/>
                                <Column style={{textAlign: 'center', width: '11%'}} field='TipoMercado'
                                        header='Mercado'/>
                                <Column style={{textAlign: 'center', width: '8%'}} field='Cuota' header='Cuota'/>
                                <Column style={{textAlign: 'center', width: '10%'}} field='DineroApostado'
                                        header='Apuesta'/>
                                <Column style={{textAlign: 'center', width: '16%'}} field='FechaApuesta'
                                        header='Fecha'/>
                                <Column style={{textAlign: 'center', width: '30%'}} field='UsuarioId'
                                        header='Email Usuario'/>
                                <Column style={{textAlign: 'center', width: '13%'}} field='MercadoId'
                                        header='IDMercado'/>
                                <Column style={{textAlign: 'center', width: '12%'}} field='Mercado.EventoId'
                                        header='ID Evento'/>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header='Crear/Bloquear Mercados'>
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
                        <div>
                            <DataTable value={this.state.markets}>
                                <Column style={{textAlign: 'center', width: '14%'}} field='MercadoId'
                                        header='ID Mercado'/>
                                <Column style={{textAlign: 'center', width: '10%'}} field='OverUnder'
                                        header='Tipo Mercado'/>
                                <Column style={{textAlign: 'center'}} field='CuotaOver' header='Cuota Over'/>
                                <Column style={{textAlign: 'center'}} field='CuotaUnder' header='Cuota Under'/>
                                <Column style={{textAlign: 'center'}} field='DineroOver' header='Dinero Over'/>
                                <Column style={{textAlign: 'center'}} field='DineroUnder' header='Dinero Under'/>
                                <Column style={{textAlign: 'center', width: '14%'}} field='Bloqueado'
                                        header='Bloqueado'/>
                                <Column style={{textAlign: 'center', width: '12%'}} field='EventoId'
                                        header='ID Evento'/>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
