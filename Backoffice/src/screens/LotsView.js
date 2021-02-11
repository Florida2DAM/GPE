import * as React from 'react';
import { createRef, Fragment } from 'react';
import '../App.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { GPEApi, axios, moment } from '../components/GPEConst'
import GPEDatePiker from '../components/GPEDatePicker';
import { GPEInput } from '../components/GPEInput';
import Picker from 'react-picker';
import { Dropdown } from 'primereact/dropdown';

export class LotsView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            lots: [],
            allLots: [],
            date: '',
            filter: '',
            lotId:'',
            articleId:'',
            allArticleId:[]
        }
    }

    componentDidMount() {
        this.getLots();
      
    }

    getLots = () => {
        axios.get(GPEApi + 'Lots').then((response) => {
            this.setState({ allLots: response.data });
            this.setState({ lots: response.data });
        })
        this.getArticleIds();
    }
    getArticleIds = () => {
        axios.get(GPEApi + 'Articles').then((response) => {
            let articleIds=[];
            response.data.forEach(e=>{articleIds.push(e.ArticleId)})
            this.setState({ allArticleId: articleIds });
            console.log(articleIds)
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
    //         this.setState({bets: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // filterMarket = () => {
    //     axios.get(GPEApi+'Apuestas/GetMercado?MercadoId=' + this.state.marketId).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
    //             item.DineroApostado = item.DineroApostado + '€';
    //         })
    //         this.setState({bets: response.data});
    //         this.showSuccessToast();
    //     })
    // }
    // filterEvent = () => {
    //     axios.get(GPEApi+'Apuestas/GetEvento?EventoId=' + this.state.eventId).then((response) => {
    //         response.data.forEach(item => {
    //             item.FechaApuesta = moment(item.FechaApuesta).format('YYYY-MM-DD');
    //             item.DineroApostado = item.DineroApostado + '€';
    //         })
    //         this.setState({bets: response.data});
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

    //
    // resetStates = () => {
    //     this.getLots();
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

    lotIdHandler= (e) => {
        this.setState({ lotId: e.target.value });
    };

    articleIdHandler=(e)=>{
        this.setState({ articleId: e.target.value },console.log(e.target.value));
    }
    filterHandler = (e) => {
        this.setState({ filter: e.target.value }, () => {
            this.filter();
            console.log(this.state.filter);
        });
    };

    filter = () => {
        console.log('DEsde filter');
        let lotList = [];
        if (this.state.filter === '') {
            this.setState({ lots: this.state.allLots });
        } else {
            this.state.allLots.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.ArticleId == (filterText)
                    || element.LotId.toUpperCase().includes(filterText)) {
                    lotList.push(element);
                }
            });
            this.setState({ lots: lotList });
        }
    };
    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert} />
                <TabView>
                    <TabPanel header='Lots'>
                        <div className='flexCenter'>
                            <GPEInput title='Filter : ' onChange={this.filterHandler} />
                            <Button label='Actualizar' icon='pi pi-refresh' onClick={this.getLots}
                                className='p-button-secondary p-mr-2'
                                style={{ backgroundColor: '#86AEC2' }} />
                        </div>
                        <div >
                            <DataTable value={this.state.lots}>
                                <Column style={{ textAlign: 'center', width: '12%' }} field='ArticleId'
                                    header='ArticleId' />
                                <Column style={{ textAlign: 'center', width: '9%' }} field='LotId' header='LotId' />
                                <Column style={{ textAlign: 'center', width: '11%' }} field='Stock'
                                    header='Stock' />
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel header='New Lot'>
                        <div className='flexCenter'>
                            <div >
                            <Dropdown  value={this.state.articleId}  options={this.state.allArticleId} 
                                    onChange={this.articleIdHandler}  placeholder="Select a Id" />
                                <InputText value={this.state.LotId} onChange={this.lotIdHandler}
                                    placeholder='Lot Id' style={{ width: '220px' }} />
                            </div>
                            <div className='marketsInputs'>
                                <InputText value={this.state.marketId} onChange={this.handlerMarketId}
                                    disabled={this.state.eventId}
                                    placeholder='Id de mercado' style={{ width: '270px' }} />
                                <div className='flexCenter'>
                                    <Button label='Bloquear' icon='pi pi-lock' onClick={this.lockMarket}
                                        className='p-button-secondary p-mr-2' style={{ backgroundColor: '#CA3C25' }} />
                                    <Button label='Desbloquear' icon='pi pi-unlock' onClick={this.unlockMarket}
                                        className='p-button-secondary p-mr-2'
                                        style={{ backgroundColor: '#77FF94', color: 'black' }} />
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>

            </Fragment>
        )
    }
}
