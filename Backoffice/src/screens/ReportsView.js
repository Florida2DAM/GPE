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
            betsDate: [],
            betsCount: [],
            usersDate: [],
            usersCount: [],
        }

    }

    componentDidMount() {
        this.getBetsDate();
        this.getBetsCount();
        this.getUsersDate();
        this.getUsersCount();
    }

    // Llamadas Axios
    getBetsDate = () => {
        axios.get(GPEApi+'Apuestas/GetFechas').then((response) => {
            this.setState({betsDate: response.data});
        })
    }
    getBetsCount = () => {
        axios.get(GPEApi+'Apuestas/GetAltas').then((response) => {
            this.setState({betsCount: response.data});
        })
    }
    getUsersDate = () => {
        axios.get(GPEApi+'Usuarios/GetFechas').then((response) => {
            this.setState({usersDate: response.data});
        })
    }
    getUsersCount = () => {
        axios.get(GPEApi+'Usuarios/GetAltas').then((response) => {
            this.setState({usersCount: response.data});
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
