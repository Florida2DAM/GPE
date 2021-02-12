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

export class EmployeesView extends React.Component {

    constructor(props) {
        super(props);
        this.GPEAlert = createRef();
        this.state = {
            employees: [],
            allEmployees: [],
            name:'',
            type:'',
            enabled:'',
            types : ['Salesman','Deliverer'],
            enableds : ['true','false'],
        }
    }
    nameHandler = (e) => {
        this.setState({name: e.target.value});
    };
    typeHandler = (e) => {
        this.setState({type: e.target.value});
    };
    enabledHandler = (e) => {

            this.setState({enabled: e.target.value });


        };


    clearInputs = () => {
        this.setState({name: ''});
        this.setState({type: ''});
    }


    checkIputs = () => {
        if ( this.state.name == '' || this.state.type == ''|| this.state.enabled == '') {
            return false;
        } else {
            return true;
        }
    }
    addEmployee = () => {
        if (this.checkIputs()) {
            let employee = {

                Name: this.state.name,
                Type: this.state.type,
                Enabled: true
            }
            axios.post(GPEApi + 'Employees', employee).then(response => {
                    this.getEmployees();
                    this.clearInputs();
                    this.setState({activeIndex: 0});
                }
            )
        } else {
            alert("You have to introduce all fields")
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
            this.setState({allEmployees: response.data});
        })
    }
    filterHandler = (e) => {
        this.setState({filter: e.target.value}, () => {
            this.filter();
            console.log(this.state.filter);
            console.log(this.state.allEmployees);
        });
    };

    filter = () => {

        let employeeList = [];
        if (this.state.filter === '') {
            this.setState({employees: this.state.allEmployees});

        } else {
            this.state.allEmployees.forEach(element => {
                const filterText = this.state.filter.toUpperCase();
                if (element.EmployeeId == this.state.filter
                    || element.Name.toUpperCase().includes(this.state.filter.toUpperCase())
                    ||  element.Type.toUpperCase().includes(this.state.filter.toUpperCase())
                    || element.Enabled.toUpperCase().includes(this.state.filter.toUpperCase())) {
                    employeeList.push(element);
                }
            });
            this.setState({employees: employeeList});
        }
    };

    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert}/>
                <TabView>
                    <TabPanel header='Employees Filter'>
                        <div className='flexCenter'>
                            <GPEInput  onChange={this.filterHandler}/>
                            <Button label='Actualizar' icon='pi pi-refresh' onClick={this.resetStates}
                                    className='p-button-secondary p-mr-2'
                                    style={{backgroundColor: '#86AEC2'}}/>

                        </div>
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

                    </TabPanel>
                    <TabPanel header='New Employees'>

                            <div>
                                <InputText value={this.state.name} onChange={this.nameHandler}
                                           placeholder='Name' style={{width: '220px'}}
                                          />
                                <Dropdown value={this.state.type} options={this.state.types}
                                           placeholder="Select Type" onChange={this.typeHandler}
                                          />
                                <Dropdown value={this.state.enabled} options={this.state.enableds}
                                          placeholder="Select if is enabled" onChange={this.enabledHandler}
                                />


                                <Button label=' New Lot' icon='pi pi-plus-circle' onClick={this.addEmployee}
                                        className='p-button-secondary p-mr-2'
                                        style={{backgroundColor: '#77FF94', color: 'black'}}/>
                            </div>


                    </TabPanel>
                </TabView>

            </Fragment>
        )
    }



}                                /*<Dropdown  options={this.state.enableds}
                                          placeholder="Select if is enabled" onChange={this.enabledHandler}
                                          />*/
