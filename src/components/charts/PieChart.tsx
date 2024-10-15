import { Pie } from "react-chartjs-2";

interface PieChartProps {
  data: number[];
}

function PieChart({ data }: PieChartProps){
    const chartData = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          data: data.length ? data :[300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  
    return <Pie data={chartData} />;
  }

  export default PieChart;