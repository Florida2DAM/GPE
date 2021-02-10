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

const apiPort = '44388';
const api = 'https://localhost:' + apiPort + '/api/';

export class ArticlesView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            articles: [],
        }
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles = () => {
        axios.get(api + 'Articles').then((response) => {
            response.data.forEach(item => {
                if (item.Enabled === true) {
                    item.Enabled = 'Yes';
                } else {
                    item.Enabled = 'No';
                }
            });
            this.setState({articles: response.data});
        })
    }
    // articleById = () => {
    //     axios.get(api + 'Articles/GetLocal?Local=' + this.state.local).then((response) => {
    //         response.data.forEach(item => {
    //             item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
    //         })
    //         this.setState({eventos: response.data});
    //         this.showSuccess();
    //     })
    // }
    // articleByDescrip = () => {
    //     axios.get(api + 'Articles/GetVisitante?Visitante=' + this.state.visitant).then((response) => {
    //         response.data.forEach(item => {
    //             item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
    //         })
    //         this.setState({eventos: response.data});
    //         this.showSuccess();
    //     })
    // }
    // articleByBrand
    //     = () => {
    //     axios.get(api + 'Articles/GetDate?Fecha=' + this.state.date).then((response) => {
    //         response.data.forEach(item => {
    //             item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
    //         })
    //         this.setState({eventos: response.data});
    //         this.showSuccess();
    //     })
    // }
    // articleEnabled
    //     = () => {
    //     axios.get(api + 'Articles/GetDate?Fecha=' + this.state.date).then((response) => {
    //         response.data.forEach(item => {
    //             item.Fecha = moment(item.Fecha).format('YYYY-MM-DD HH:mm:ss');
    //         })
    //         this.setState({eventos: response.data});
    //         this.showSuccess();
    //     })
    // }
    // createEvents = () => {
    //     if (this.state.local && this.state.visitant && this.state.date) {
    //         let createEvent = {
    //             Local: this.state.local,
    //             Visitante: this.state.visitant,
    //             Fecha: moment(this.state.date).format('YYYY-MM-DD HH:mm:ss')
    //         }
    //         axios.post(api + 'Articles', createEvent).then((response) => {
    //             this.showInfoSuccess('Evento creado');
    //         })
    //             .then(this.resetStates)
    //             .catch(error => {
    //                 this.showError(error.message.toString() + '\nCompruebe la conexión y que haya introducido los equipos y la fecha.');
    //             });
    //     } else {
    //         this.showError('Compruebe la conexión y que haya introducido los equipos y la fecha.');
    //     }
    // }
    // deleteEvents = () => {
    //     axios.delete(api + 'Articles?EventoId=' + this.state.eventId).then((response) => {
    //         this.showInfoSuccess('Evento: ' + this.state.eventId + ' eliminado.');
    //     })
    //         .then(this.resetStates)
    //         .catch(error => {
    //             this.showError(error.message.toString() + '\nCompruebe la conexión y que haya introducido el ID de evento.');
    //         });
    // }
    // updateDate = () => {
    //     let dateFormated = moment(this.state.date).format('YYYY-MM-DD HH:mm:ss');
    //     axios.put(api + 'Articles/NewDate?EventoId=' + this.state.eventId + '&Fecha=' + dateFormated).then((response) => {
    //         this.showInfoSuccess('Fecha actualizada para el evento: ' + this.state.eventId);
    //     })
    //         .then(this.resetStates)
    //         .catch(error => {
    //             this.showError(error.message.toString() + '\nCompruebe la conexión y que ha introducido la fecha y el ID de evento.');
    //         });
    // }

    // handlerLocal = (event) => {
    //     this.setState({local: event.target.value});
    // }
    // handlerVisitant = (event) => {
    //     this.setState({visitant: event.target.value});
    // }
    // handlerDate = (event) => {
    //     this.setState({date: event.target.value});
    // }
    // handlerEventId = (event) => {
    //     this.setState({eventId: event.target.value});
    // }
    //
    // resetStates = () => {
    //     this.getArticles();
    //     this.setState({local: ''});
    //     this.setState({visitant: ''});
    //     this.setState({date: ''});
    //     this.setState({eventId: ''});
    // }

    // filterButton = () => {
    //     if (this.state.local) {
    //         this.articleById();
    //     }
    //     if (this.state.visitant) {
    //         this.articleByDescrip();
    //     }
    //     if (this.state.date) {
    //         this.articleByBrand
    //         ();
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
                    <TabPanel header='Articles'>
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

                    </TabPanel>
                    <TabPanel header='New Articles'>
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
                    <TabPanel header='Modify Articles'>
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
                    <TabPanel header='Eliminar Articles'>
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
                    <div>
                        <DataTable value={this.state.articles}>
                            <Column style={{textAlign: 'center', width: '15%'}} field='ArticleId'
                                    header='Id'/>
                            <Column style={{textAlign: 'center', width: '25%'}} field='Description'
                                    header='Description'/>
                            <Column style={{textAlign: 'center', width: '25%'}} field='Brand'
                                    header='Brand'/>
                            <Column style={{textAlign: 'center', width: '25%'}} field='Category'
                                    header='Category'/>
                            <Column style={{textAlign: 'center', width: '25%'}} field='Price'
                                    header='Price'/>
                            <Column style={{textAlign: 'center', width: '25%'}} field='Iva'
                                    header='IVA'/>
                            <Column style={{textAlign: 'center', width: '25%'}} field='Enabled' header='Enabled'/>
                        </DataTable>
                    </div>
                </TabView>
            </Fragment>
        )
    }
}
