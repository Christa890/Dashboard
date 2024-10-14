import { Pie } from "react-chartjs-2";

function PieChart(){
    const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };
  
    return <Pie data={data} />;
  }

  export default PieChart;