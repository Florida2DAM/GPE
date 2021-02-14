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
                this.GPEShowSuccess('Lot updated');
            }
        )
    }
    checkInputs = () => {
        if (this.state.stock == '' || this.state.articleId == '' || this.state.lotId == '') {
            return false;
        } else {
            return true;
        }
    }
    addLots = () => {
        if (this.checkInputs()) {
            let lot = {
                ArticleId: this.state.articleId,
                LotId: this.state.lotId,
                stock: this.state.stock
            }
            axios.post(GPEApi + 'Lots', lot).then(response => {
                    this.getLots();
                    this.clearInputs();
                    this.setState({activeIndex: 0});
                    this.GPEShowSuccess('Lot inserted')
                }
            )
        } else {
            this.GPEShowError('You have to introduce all fields')
        }
    }

    lotIdHandler = (e) => {
        this.setState({lotId: e.target.value});
    };
    stockHandler = (e) => {
        this.setState({stock: e.target.value});
    };
    articleIdHandler = (e) => {
        this.setState({articleId: e.target.value});
    }
    filterHandler = (e) => {
        this.setState({filter: e.target.value}, () => {
            this.filter();
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
        this.setState({lotId: rowData.LotId});
        this.setState({stock: rowData.Stock});
        this.setState({articleId: rowData.ArticleId});
    }
    clearInputs = () => {
        this.setState({lotId: ''});
        this.setState({stock: ''});
        this.setState({articleId: ''});
    }

    GPEShowError = (error) => {
        this.GPEAlert.current.show({severity: 'error', summary: 'Error', detail: error, life: 3000});
    }
    GPEShowSuccess = (detailValue) => {
        this.GPEAlert.current.show({severity: 'success', summary: 'Done', detail: detailValue, life: 3000});
    }

    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert}/>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header='Lots'>
                        {this.state.visible === true ? <div>
                                <div className='flex-center'>
                                    <GPEInput onChange={this.filterHandler}/>
                                    <Button label='Refresh' icon='pi pi-refresh' onClick={this.getLots}
                                            className='p-button-secondary p-mr-2'
                                            style={{backgroundColor: '#86AEC2'}}/>
                                </div>
                                <div>
                                    <DataTable value={this.state.lots}>
                                        <Column style={{textAlign: 'center'}} field='ArticleId'
                                                header='ArticleId'/>
                                        <Column style={{textAlign: 'center'}} field='LotId' header='LotId'/>
                                        <Column style={{textAlign: 'center'}} field='Stock' header='Stock'/>
                                        <Column style={{textAlign: 'center'}} body={this.changePage}
                                                field='Modify' header='Modify'/>
                                    </DataTable>
                                </div>
                            </div>
                            :
                            <div>
                                <Dropdown value={this.state.articleId} options={this.state.allArticleId}
                                          onChange={this.articleIdHandler} disabled placeholder='Select a Id'/>
                                <InputText value={this.state.lotId} disabled onChange={this.lotIdHandler}
                                           placeholder='Lot Id'/>
                                <InputText value={this.state.stock} onChange={this.stockHandler}
                                           placeholder='Stock Number'
                                           className={this.state.stock == '' && 'p-invalid p-d-block'}/>
                                <Button label='Modify' icon='pi pi-send' onClick={this.updateLot}
                                        className='p-button-secondary p-mr-2'
                                        style={{backgroundColor: '#77FF94', color: 'black'}}/>
                            </div>}
                    </TabPanel>
                    <TabPanel header='New Lot'>
                        <div className='flex-center'>
                            <div>
                                <Dropdown value={this.state.articleId} options={this.state.allArticleId}
                                          onChange={this.articleIdHandler} placeholder='Select a Id'
                                          className={this.state.articleId == '' && 'p-invalid p-d-block'}/>
                                <InputText value={this.state.lotId} onChange={this.lotIdHandler}
                                           placeholder='Lot Id'
                                           className={this.state.lotId == '' && 'p-invalid p-d-block'}/>
                                <InputText value={this.state.stock} onChange={this.stockHandler}
                                           placeholder='Stock Number'
                                           className={this.state.stock == '' && 'p-invalid p-d-block'}/>
                            </div>
                            <div className='flex-center'>
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
