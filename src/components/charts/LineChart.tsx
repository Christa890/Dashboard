import {Line} from 'react-chartjs-2'

function LineChart() {
    // Data for the chart
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };
    return <Line data={data} />;
}
  

export default LineChart;