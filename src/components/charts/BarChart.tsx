import { Bar} from "react-chartjs-2";
function BarChart() {
    const data = {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "Sales",
          data: [12, 19, 3],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
  
    return <Bar data={data} />;
  }

  export default BarChart;