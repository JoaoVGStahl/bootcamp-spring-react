import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';
type ChartData = {
    series: number[];
    labels: string[];
}
const DonutChart = () => {

    let chartData : ChartData = { series: [], labels: [] };
    axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then(resp => {
           const data = resp.data as SaleSum[];
           const myLabels = data.map(x => x.sellerName);
           const mySeries = data.map(x => x.sum);
           chartData =  { series: mySeries, labels: myLabels};    


            console.log(chartData);
        } );
    /*
    const mockData = {
        series: [477138, 499928, 444867, 220426, 473088],
        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    }
    */

    const options = {
        legend: {
            show: true
        }
    }


    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;