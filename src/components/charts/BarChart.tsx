import { Bar} from "react-chartjs-2";

interface BarChartProps {
  data: number[];
}

function BarChart({ data }: BarChartProps) {
    const chartData = {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Sales",
          data: data.length ? data : [12, 19, 3],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
  
    return <Bar data={chartData} />;
  }

  export default BarChart;