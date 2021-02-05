import * as React from 'react';
import {createRef, Fragment} from 'react';
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {TabPanel, TabView} from 'primereact/tabview';
import {Toast} from 'primereact/toast';

const axios = require('axios');
const moment = require('moment');
const apiPort = '44342';
const api = 'https://localhost:' + apiPort + '/api/';

export class ArticlesView extends React.Component {

    constructor(props) {
        super(props);
        this.coolToast = createRef();
        this.state = {
            eventos: [],
            eventId: '',
            local: '',
            visitant: '',
            date: '',
        }
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        axios.get(api + 'Eventos').then((response) => {
            response.data.forEach(item => {
                item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
            })
            this.setState({eventos: response.data});
        })
    }
    filterLocal = () => {
        axios.get(api + 'Eventos/GetLocal?Local=' + this.state.local).then((response) => {
            response.data.forEach(item => {
                item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
            })
            this.setState({eventos: response.data});
            this.showSuccessToast();
        })
    }
    filterVisitant = () => {
        axios.get(api + 'Eventos/GetVisitante?Visitante=' + this.state.visitant).then((response) => {
            response.data.forEach(item => {
                item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
            })
            this.setState({eventos: response.data});
            this.showSuccessToast();
        })
    }
    filterDate = () => {
        axios.get(api + 'Eventos/GetDate?Fecha=' + this.state.date).then((response) => {
            response.data.forEach(item => {
                item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
            })
            this.setState({eventos: response.data});
            this.showSuccessToast();
        })
    }
    createEvents = () => {
        if (this.state.local && this.state.visitant && this.state.date) {
            let createEvent = {
                Local: this.state.local,
                Visitante: this.state.visitant,
                Fecha: moment(this.state.date).format('YYYY-MM-DD HH:mm:ss')
            }
            axios.post(api + 'Eventos', createEvent).then((response) => {
                this.showInfoSuccessToast('Evento creado');
            })
                .then(this.resetStates)
                .catch(error => {
                    this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que haya introducido los equipos y la fecha.');
                });
        } else {
            this.showErrorToast('Compruebe la conexión y que haya introducido los equipos y la fecha.');
        }
    }
    deleteEvents = () => {
        axios.delete(api + 'Eventos?EventoId=' + this.state.eventId).then((response) => {
            this.showInfoSuccessToast('Evento: ' + this.state.eventId + ' eliminado.');
        })
            .then(this.resetStates)
            .catch(error => {
                this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que haya introducido el ID de evento.');
            });
    }
    updateDate = () => {
        let dateFormated = moment(this.state.date).format('YYYY-MM-DD HH:mm:ss');
        axios.put(api + 'Eventos/NewDate?EventoId=' + this.state.eventId + '&Fecha=' + dateFormated).then((response) => {
            this.showInfoSuccessToast('Fecha actualizada para el evento: ' + this.state.eventId);
        })
            .then(this.resetStates)
            .catch(error => {
                this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que ha introducido la fecha y el ID de evento.');
            });
    }

    handlerLocal = (event) => {
        this.setState({local: event.target.value});
    }
    handlerVisitant = (event) => {
        this.setState({visitant: event.target.value});
    }
    handlerDate = (event) => {
        this.setState({date: event.target.value});
    }
    handlerEventId = (event) => {
        this.setState({eventId: event.target.value});
    }

    resetStates = () => {
        this.getEvents();
        this.setState({local: ''});
        this.setState({visitant: ''});
        this.setState({date: ''});
        this.setState({eventId: ''});
    }

    filterButton = () => {
        if (this.state.local) {
            this.filterLocal();
        }
        if (this.state.visitant) {
            this.filterVisitant();
        }
        if (this.state.date) {
            this.filterDate();
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
                    <TabPanel header='Eventos'>
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
                            <DataTable value={this.state.eventos}>
                                <Column style={{textAlign: 'center', width: '15%'}} field='EventoId'
                                        header='ID Evento'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Local'
                                        header='Equipo Local'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Visitante'
                                        header='Equipo Visitante'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Fecha' header='Fecha'/>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header='Nuevos Eventos'>
                        <div className='flexCenter'>
                            <InputText value={this.state.local} onChange={this.handlerLocal}
                                       placeholder='Equipo local'/>
                            <InputText value={this.state.visitant} onChange={this.handlerVisitant}
                                       placeholder='Equipo visitante'/>
                            <InputText value={this.state.date} onChange={this.handlerDate}
                                       placeholder='Fecha Ej: 2000-01-01 00:00:00' style={{width: '230px'}}/>
                            <Button label='Crear' icon='pi pi-plus' onClick={this.createEvents}
                                    className='p-button-secondary p-mr-2'/>
                        </div>
                        <div>
                            <DataTable value={this.state.eventos}>
                                <Column style={{textAlign: 'center', width: '15%'}} field='EventoId'
                                        header='ID Evento'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Local'
                                        header='Equipo Local'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Visitante'
                                        header='Equipo Visitante'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Fecha' header='Fecha'/>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header='Modificar Fechas'>
                        <div className='flexCenter'>
                            <InputText value={this.state.eventId} onChange={this.handlerEventId}
                                       placeholder='IdEvento'/>
                            <InputText value={this.state.date} onChange={this.handlerDate}
                                       placeholder='Fecha Ej: 2000-01-01 00:00:00' style={{width: '230px'}}/>
                            <Button label='Modificar' icon='pi pi-pencil' onClick={this.updateDate}
                                    className='p-button-secondary p-mr-2'/>
                        </div>
                        <div>
                            <DataTable value={this.state.eventos}>
                                <Column style={{textAlign: 'center', width: '15%'}} field='EventoId'
                                        header='ID Evento'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Local'
                                        header='Equipo Local'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Visitante'
                                        header='Equipo Visitante'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Fecha' header='Fecha'/>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header='Eliminar Eventos'>
                        <div className='flexCenter'>
                            <InputText value={this.state.eventId} onChange={this.handlerEventId}
                                       placeholder='ID evento'/>
                            <Button label='Eliminar' icon='pi pi-trash' onClick={this.deleteEvents}
                                    className='p-button-secondary p-mr-2'/>
                        </div>
                        <div>
                            <DataTable value={this.state.eventos}>
                                <Column style={{textAlign: 'center', width: '15%'}} field='EventoId'
                                        header='ID Evento'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Local'
                                        header='Equipo Local'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Visitante'
                                        header='Equipo Visitante'/>
                                <Column style={{textAlign: 'center', width: '25%'}} field='Fecha' header='Fecha'/>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
