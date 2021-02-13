import * as React from 'react';
import {Fragment} from 'react';
import '../App.css';
import {TabPanel, TabView} from 'primereact/tabview';
import {Chart} from 'primereact/chart';
import {axios, GPEApi,moment} from '../components/GPEConst'



export class ReportsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ordersDate: [],
            ordersCount: [],
            clientsDate: [],
            clientsCount: [],
        }

    }

    componentDidMount() {
        this.getOrdersDate();
        this.getOrdersCount();
        this.getClientsDate();
        this.getClientsCount();
    }

    // Llamadas Axios
    getOrdersDate = () => {
        axios.get(GPEApi+'Orders/GetFechas').then((response) => {
            this.setState({ordersDate: response.data});
        })
    }
    getOrdersCount = () => {
        axios.get(GPEApi+'Orders/GetAltas').then((response) => {
            this.setState({ordersCount: response.data});
        })
    }
    getClientsDate = () => {
        axios.get(GPEApi+'Clients/GetFechas').then((response) => {
            this.setState({clientsDate: response.data});
        })
    }
    getClientsCount = () => {
        axios.get(GPEApi+'Clients/GetAltas').then((response) => {
            this.setState({clientsCount: response.data});
        })
    }

    render() {
        const betsData = {
            labels: this.state.betsDate,
            datasets: [
                {
                    label: 'Apuestas',
                    data: this.state.betsCount,
                    fill: false,
                    borderColor: '#42A5F5',
                    backgroundColor: '#393e46',
                }
            ]
        };
        const usersData = {
            labels: this.state.usersDate,
            datasets: [
                {
                    label: 'Usuarios',
                    data: this.state.usersCount,
                    fill: false,
                    borderColor: '#42A5F5',
                    backgroundColor: '#393e46'
                }
            ]
        };
        const chartOptions = {
            legend: {
                labels: {
                    fontColor: '#42A5F5'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#00adb5'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#00adb5'
                    }
                }]
            }
        }
        return (
            <Fragment>
                <TabView>
                    <TabPanel header='Apuestas'>
                        <div className='chartView'>
                            <Chart className='chart' type='line' data={betsData} options={chartOptions} width='850%'/>
                        </div>
                    </TabPanel>
                    <TabPanel header='Usuarios'>
                        <div className='chartView'>
                            <Chart className='chart' type='line' data={usersData} options={chartOptions} width='850%'/>
                        </div>
                    </TabPanel>
                </TabView>
            </Fragment>
        )
    }
}
