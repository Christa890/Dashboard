import {Doughnut} from 'react-chartjs-2'

interface DoughnutChartProps {
  data: number[];
}

function DoughnutChart({ data }: DoughnutChartProps){
    // Data for the doughnut chart
    const chartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
      datasets: [
        {
          label: 'Votes',
          data: data.length ? data :[12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return <Doughnut data={chartData} />;

}

export default DoughnutChart;