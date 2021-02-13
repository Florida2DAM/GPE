import * as React from 'react';
import {createRef, Fragment} from 'react';
import '../App.css';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {TabPanel, TabView} from 'primereact/tabview';
import {Toast} from 'primereact/toast';
import {GPEInput} from '../components/GPEInput';
import {axios, GPEApi} from '../components/GPEConst'

export class ArticlesView extends React.Component {
    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            articles: [],
            allArticles: [],
            articleId: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            iva: '',
            activeIndex: 0,
            enabled: false,
            visible: true,
            show: true,
            visibleModify: false,
        }
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles = () => {
        axios.get(GPEApi + 'Articles/BackOffice').then((response) => {
            this.setState({articles: response.data});
            this.setState({allArticles: response.data});
        })
    }

    updateArticle = () => {
        let article = {
            ArticleId: this.state.articleId,
            Description: this.state.description,
            Price: this.state.price,
            Brand: this.state.brand,
            Category: this.state.category,
            Iva: this.state.iva,

        }
        axios.put(GPEApi + 'Articles', article).then(response => {
                this.visibleHandler();
                this.getArticles();
                this.clearInputs();
            }
        )
    }

    checkIputs = () => {
        if (this.state.description == '' || this.state.price == '' ||
            this.state.brand == '' || this.state.category == '' || this.state.iva == '') {
            return false;
        } else {
            return true;
        }
    }

    addArticle = () => {
        if (this.checkIputs()) {
            let article = {
                ArticleId: this.state.articleId,
                Description: this.state.description,
                Price: this.state.price,
                Brand: this.state.brand,
                Category: this.state.category,
                Iva: this.state.iva,
                Enabled: false,
            }
            axios.post(GPEApi + 'Articles', article).then(response => {
                    this.getArticles();
                    this.clearInputs();
                    this.setState({activeIndex: 0});
                }
            )
        } else {
            alert("You have to introduce all fields")
        }
    }


    articleIdHandler = (e) => {
        this.setState({articleId: e.target.value});
    }
    descriptionHandler = (e) => {
        this.setState({description: e.target.value});
    };
    priceHandler = (e) => {
        this.setState({price: e.target.value});
    };
    brandHandler = (e) => {
        this.setState({brand: e.target.value});
    };
    categoryHandler = (e) => {
        this.setState({category: e.target.value});
    };
    ivaHandler = (e) => {
        this.setState({iva: e.target.value});
    };
    filterHandler = (e) => {
        this.setState({filter: e.target.value}, () => {
            this.filter();
        });
    };

    filter = () => {

        let articleList = [];
        if (this.state.filter === '') {
            this.setState({articles: this.state.allArticles});
        } else {
            this.state.allArticles.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.ArticleId == (filterText) ||
                    element.Description.toUpperCase().includes(filterText) ||
                    element.Brand.toUpperCase().includes(filterText) ||
                    element.Category.toUpperCase().includes(filterText) ||
                    element.Price == (filterText) ||
                    element.Iva == (filterText)
                ) {
                    articleList.push(element);
                }
            });
            this.setState({articles: articleList});
        }
    };


    showEnable = () => {

        let articleList = [];
        this.state.allArticles.forEach(element => {
            if (element.Enabled == true) {
                articleList.push(element);
            }
        });
        this.setState({articles: articleList}, () => {
            this.setState({show: !this.state.show})
        });

    };

    showDisable = () => {
        let articleList = [];
        this.state.allArticles.forEach(element => {
            if (element.Enabled == false) {
                articleList.push(element);
            }
        });
        this.setState({articles: articleList}, () => {
            this.setState({show: !this.state.show})
        });

    };

    changePage = (rowData) => {
        return <Button label='Modify' icon='pi pi-pencil' onClick={() => this.showInputs(rowData)}
                       className='p-button-secondary p-mr-2'
                       style={{backgroundColor: '#86AEC2'}}/>
    }

    visibleHandler = () => {
        this.setState({visibleModify: !this.state.visibleModify});
    }

    showInputs = (rowData) => {
        this.visibleHandler();
        console.log(rowData)
        this.setState({articleId: rowData.ArticleId});
        this.setState({description: rowData.Description});
        this.setState({price: rowData.Price});
        this.setState({brand: rowData.Brand});
        this.setState({category: rowData.Category});
        this.setState({iva: rowData.Iva});
    }
    clearInputs = () => {
        this.setState({articleId: ''});
        this.setState({description: ''});
        this.setState({price: ''});
        this.setState({brand: ''});
        this.setState({category: ''});
        this.setState({iva: ''});
    }

    btnActive = (rowData) => {
        return (<>{rowData.Enabled ?
            <Button label='YES' onClick={() => this.changeArticle(rowData)} className='p-button-success'/>
            :
            <Button label='NO' onClick={() => this.changeArticle(rowData)} className=' p-button-danger'/>
        }
        </>)
    }
    changeArticle = (articles) => {
        axios.put(GPEApi + 'Articles/' + articles.ArticleId).then(() => this.getArticles())
    }

    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert}/>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header='Articles'>
                        {this.state.visibleModify ?
                            <div>
                                <InputText value={this.state.articleId} disabled onChange={this.articleIdHandler}
                                           placeholder='Articulo ID' style={{width: '100px'}}/>
                                <InputText value={this.state.description} onChange={this.descriptionHandler}
                                           placeholder='Description' style={{width: '200px'}}/>
                                <InputText value={this.state.price} onChange={this.priceHandler}
                                           placeholder='Price' style={{width: '200px'}}/>
                                <InputText value={this.state.brand} onChange={this.brandHandler}
                                           placeholder='Brand' style={{width: '200px'}}/>
                                <InputText value={this.state.category} onChange={this.categoryHandler}
                                           placeholder='Category' style={{width: '200px'}}/>
                                <InputText value={this.state.iva} onChange={this.ivaHandler}
                                           placeholder='Iva' style={{width: '200px'}}/>
                                <Button label='Modify' icon='pi pi-send' onClick={this.updateArticle}
                                        className='p-button-secondary p-mr-2'
                                        style={{backgroundColor: '#77FF94', color: 'black'}}/>
                            </div>
                            :
                            <div>
                                <div className='flexCenter'>
                                    <GPEInput onChange={this.filterHandler}/>
                                    {this.state.show ? <Button label='Show Enable' onClick={this.showEnable}
                                                               className='p-button-secondary p-mr-2' icon='pi pi-eye'
                                                               style={{backgroundColor: '#86AEC2'}}/> :
                                        <Button label='Show Disable' onClick={this.showDisable}
                                                className='p-button-secondary p-mr-2' icon='pi pi-eye'
                                                style={{backgroundColor: '#86AEC2'}}/>
                                    }
                                    <Button label='Actualizar' icon='pi pi-refresh' onClick={this.getArticles}
                                            className='p-button-secondary p-mr-2'
                                            style={{backgroundColor: '#86AEC2'}}/>
                                </div>
                                <div>
                                    <DataTable value={this.state.articles}>
                                        <Column style={{textAlign: 'center', width: '15%'}} field='ArticleId'
                                                header='ArticleId'/>
                                        <Column style={{textAlign: 'center', width: '25%'}} field='Description'
                                                header='Description'/>
                                        <Column style={{textAlign: 'center', width: '15%'}} field='Price'
                                                header='Price'/>
                                        <Column style={{textAlign: 'center', width: '25%'}} field='Brand'
                                                header='Brand'/>
                                        <Column style={{textAlign: 'center', width: '25%'}} field='Category'
                                                header='Category'/>
                                        <Column style={{textAlign: 'center', width: '10%'}} field='Iva'
                                                header='Iva'/>
                                        <Column body={this.btnActive} style={{textAlign: 'center', width: '10%'}}
                                                field='Enabled'
                                                header='Enabled'/>
                                        <Column style={{textAlign: 'center', width: '25%'}} body={this.changePage}
                                                field="Modify" header="Modify"/>
                                    </DataTable>
                                </div>
                            </div>
                        }
                    </TabPanel>
                    <TabPanel header='New Articles'>
                        <InputText value={this.state.description} onChange={this.descriptionHandler}
                                   placeholder='Description' style={{width: '200px'}}/>
                        <InputText value={this.state.price} onChange={this.priceHandler}
                                   placeholder='Price' style={{width: '200px'}}/>
                        <InputText value={this.state.brand} onChange={this.brandHandler}
                                   placeholder='Brand' style={{width: '200px'}}/>
                        <InputText value={this.state.category} onChange={this.categoryHandler}
                                   placeholder='Category' style={{width: '200px'}}/>
                        <InputText value={this.state.iva} onChange={this.ivaHandler}
                                   placeholder='Iva' style={{width: '200px'}}/>
                        <Button label=' New Lot' icon='pi pi-plus-circle' onClick={this.addArticle}
                                className='p-button-secondary p-mr-2'
                                style={{backgroundColor: '#77FF94', color: 'black'}}/>
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
