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
            visible:true,
            employeeId:''
        }
    }
    //take the value and save it in the state
    nameHandler = (e) => {
        this.setState({name: e.target.value});
    };
    //take the value and save it in the state
    typeHandler = (e) => {
        this.setState({type: e.target.value});
    };
    //take the value and save it in the state
    enabledHandler = (e) => {

            this.setState({enabled: e.target.value });


        };

    //clear imputs value

    clearInputs = () => {
        this.setState({name: ''});
        this.setState({type: ''});
    }

    //Check if imputs are empty

    checkIputs = () => {
        if ( this.state.name == '' || this.state.type == ''|| this.state.enabled == '') {
            return false;
        } else {
            return true;
        }
    }
// check the enabled field and shou a green buton if is trua and red buton if is false
    btnActive = (rowData) => {
        console.log(rowData.Enabled);
        return (<>{rowData.Enabled == "Yes"?
            <Button label='YES' onClick={() => this.changeEmployee(rowData)} className='p-button-success' />
            :
            <Button label='NO' onClick={() => this.changeEmployee2(rowData)} className=' p-button-danger' />
        }
        </>)
    }
//post a new enployee on data base
    addEmployee = () => {
        if (this.checkIputs()) {
            let employee = {

                Name: this.state.name,
                Type: this.state.type,
                Enabled: 0
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
// get the data base employees information
    getEmployees = () => {
        axios.get(GPEApi + 'Employees/BackOffice').then((response) => {
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
    //take the value and save it in the state
    filterHandler = (e) => {
        this.setState({filter: e.target.value}, () => {
            this.filter();
            console.log(this.state.filter);
            console.log(this.state.allEmployees);
        });
    };
    // update the abeled employees and turn it disableds
    changeEmployee = (employee) => {


        axios.put(GPEApi + 'Employees/' + employee.EmployeeId,{
            "Name": employee.Name,
            "Type": employee.Type,
            "Enabled": false
        }).then(() => this.getEmployees())
    }
    // update the disabeled employees and turn it enableds
    changeEmployee2 = (employee) => {
        let emp =  {
            Name: this.state.name,
            Type: this.state.type,
            Enabled: this.state.enabled
        }
        axios.put(GPEApi + 'Employees/' + employee.EmployeeId,{
            "Name": employee.Name,
            "Type": employee.Type,
            "Enabled": true
        }).then(() => this.getEmployees())
    }
    // update the employee with a new name and new type
    updateEmployee = () => {
        let emp = {

            Name: this.state.name,
            Type: this.state.type
        }
        axios.put(GPEApi + 'Employees/'+this.state.employeeId , emp).then(response => {
                this.visibleHandler();
                this.getEmployees();
                this.clearInputs();
            }
        )

    }
    // Show and hide the modify screen
    visibleHandler = () => {
        this.setState({visible: !this.state.visible});
    }
    //take the information of the actual employye and save it in the state for use it later
    showInputs = (rowData) => {
        this.visibleHandler();
        console.log(rowData)
        this.setState({employeeId: rowData.EmployeeId});
        this.setState({name: rowData.Name}, () => console.log(this.state.name));
        this.setState({enabled: rowData.Enabled});
    }

    //that funtion takes the input valua and filtre de array of information using it
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
    //button used for go to the modify screen
    changePage = (rowData) => {
        return <Button label='Modify' icon='pi pi-pencil' onClick={() => this.showInputs(rowData)}
                       className='p-button-secondary p-mr-2'
                       style={{backgroundColor: '#86AEC2'}}/>
    }
    render() {
        return (
            <Fragment>
                <Toast ref={this.GPEAlert}/>
                <TabView>
                    <TabPanel header='Employees Filter'>
                        {this.state.visible === true ? <div>
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
                                <Column body={this.btnActive} style={{ textAlign: 'center', width: '10%' }} field='Enabled'
                                        header='Enabled' />
                                <Column style={{textAlign: 'center', width: '11%'}} body={this.changePage}
                                        field="Modify" header="Modify"></Column>

                            </DataTable>
                        </div>
                        </div>          :
                            <div>
                                <InputText value={this.state.name} onChange={this.nameHandler}
                                           placeholder='Name' style={{width: '220px'}}
                                />
                                <Dropdown value={this.state.type} options={this.state.types}
                                          placeholder="Select Type" onChange={this.typeHandler}
                                />
                                <Button label='Modify' icon='pi pi-send' onClick={this.updateEmployee}
                                        className='p-button-secondary p-mr-2'
                                        style={{backgroundColor: '#77FF94', color: 'black'}}/>
                            </div>}

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
