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
const apiPort = '44388';
const api = 'https://localhost:' + apiPort + '/api/';

export class ClientsView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            clients: [],
        }
    }

    componentDidMount() {
        this.getClients();
    }

    getClients = () => {
        axios.get(api+'Clients').then((response) => {
            response.data.forEach(item => {
                item.RegisterDate = moment(item.RegisterDate).format('YYYY-MM-DD');
                if (item.Enabled === true) {
                    item.Enabled = 'Yes';
                } else {
                    item.Enabled = 'No';
                }
            });
            this.setState({clients: response.data});
        })
    }
    // filterMail = () => {
    //     axios.get(api+'Usuarios/GetEmail?EmailId=' + this.state.email).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaAlta = moment(item.FechaAlta).format('YYYY-MM-DD');
    //         });
    //         this.setState({clients: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // filterName = () => {
    //     axios.get(api+'Usuarios/GetNombre?Nombre=' + this.state.name).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaAlta = moment(item.FechaAlta).format('YYYY-MM-DD');
    //         });
    //         this.setState({clients: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // filterSurname = () => {
    //     axios.get(api+'Usuarios/GetApellidos?Apellidos=' + this.state.surname).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaAlta = moment(item.FechaAlta).format('YYYY-MM-DD');
    //         });
    //         this.setState({clients: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // deleteUsers = () => {
    //     if(this.state.email){
    //         axios.delete(api+'Usuarios?EmailId=' + this.state.email).then((response) => {
    //             this.showInfoSuccessToast('Usuario ' + this.state.email + ' eliminado.')
    //         })
    //             .then(this.resetStates)
    //             .catch(error => {
    //                 this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que ha introducido correctamente los campos.');
    //             });
    //     }
    //     else{
    //         this.showErrorToast('Compruebe la conexión y que ha introducido correctamente los campos.');
    //     }
    // }
    // changePassword = () => {
    //     let pwd = {
    //         OldPassword: this.state.oldPwd,
    //         NewPassword: this.state.newPwd,
    //         ConfirmPassword: this.state.confirmPwd
    //     };
    //     axios.post(api+'Account/NewPassword?Email=' + this.state.email, pwd).then((response) => {
    //         this.showInfoSuccessToast('Contraseña modificada correctamente para el email:  ' + this.state.email);
    //     })
    //         .then(this.resetStates)
    //         .catch(error => {
    //             this.showErrorToast(error.message.toString() + '\nCompruebe la conexión y que ha introducido correctamente los campos.');
    //         });
    // }
    //
    // handlerEmail = (event) => {
    //     this.setState({email: event.target.value});
    // }
    // handlerName = (event) => {
    //     this.setState({name: event.target.value});
    // }
    // handlerSurname = (event) => {
    //     this.setState({surname: event.target.value});
    // }
    // handlerOldPwd = (event) => {
    //     this.setState({oldPwd: event.target.value});
    // }
    // handlerNewPwd = (event) => {
    //     this.setState({newPwd: event.target.value});
    // }
    // handlerConfirmPwd = (event) => {
    //     this.setState({confirmPwd: event.target.value});
    // }
    //
    // resetStates = () => {
    //     this.getClients();
    //     this.setState({email: ''});
    //     this.setState({name: ''});
    //     this.setState({surname: ''});
    //     this.setState({email: ''});
    //     this.setState({oldPwd: ''});
    //     this.setState({newPwd: ''});
    //     this.setState({confirmPwd: ''});
    // }
    //
    // buttonFilter = () => {
    //     if (this.state.email) {
    //         this.filterMail();
    //     }
    //     if (this.state.name) {
    //         this.filterName();
    //     }
    //     if (this.state.surname) {
    //         this.filterSurname();
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
                    <TabPanel header='Clients'>
                        <div className='flexCenter'>
                            <InputText value={this.state.email} onChange={this.handlerEmail}
                                       disabled={this.state.name || this.state.surname} placeholder='Email'
                                       style={{width: '40%', marginLeft: '1%'}}/>

                            <Button icon='pi pi-refresh' onClick={this.resetStates} variant="outlined"
                                    className='p-button-warning'
                            />
                            <Button label='Filtrar' icon='pi pi-filter' onClick={this.buttonFilter}
                                    className='p-button-warning' style={{width: '15%', marginLeft: '1%', marginRight: '1%'}}/>
                        </div>

                    </TabPanel>
                    <TabPanel header='Add New Client'>
                        <div className='flexCenter'>
                            <InputText value={this.state.email} onChange={this.handlerEmail}
                                       placeholder='Email' style={{width: '40%'}}/>
                            <Button label='Eliminar' icon='pi pi-trash' onClick={this.deleteUsers}
                                    className='p-button-secondary p-mr-2'/>
                        </div>

                    </TabPanel>
                    <TabPanel header='Modify Client'>
                        <div className='flexCenter'>
                            <InputText value={this.state.email} onChange={this.handlerEmail}
                                       placeholder='Email' style={{width: '30%'}}/>
                            <InputText type='password' value={this.state.oldPwd} onChange={this.handlerOldPwd}
                                       placeholder='Contraseña anterior' style={{width: '30%'}}/>
                            <Button label='Confirmar' onClick={this.changePassword}
                                    className='p-button-secondary p-mr-2' style={{width: '30%'}}/>
                        </div>
                    </TabPanel>
                </TabView>
                <div>
                    <DataTable value={this.state.clients}>
                        <Column field='ClientId' header='ClientId'
                                style={{textAlign: 'center'}}/>
                        <Column field='Name' header='Name' style={{textAlign: 'center'}}/>
                        <Column field='Address' header='Address'
                                style={{textAlign: 'center'}}/>
                        <Column field='City' header='City' style={{textAlign: 'center'}}/>
                        <Column field='Province' header='Province' style={{textAlign: 'center'}}/>
                        <Column field='Phone' header='Phone' style={{textAlign: 'center'}}/>
                        <Column field='NIF' header='NIF' style={{textAlign: 'center'}}/>
                        <Column field='ContactName' header='ContactName' style={{textAlign: 'center'}}/>
                        <Column field='RegisterDate' header='RegisterDate' style={{textAlign: 'center'}}/>
                        <Column field='Enabled' header='Enabled' style={{textAlign: 'center'}}/>
                    </DataTable>
                </div>
            </Fragment>
        )
    }
}
