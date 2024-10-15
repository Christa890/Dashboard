import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GridLayout from "react-grid-layout";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import DoughnutChart from "./charts/DoughnutChart";

type Dashboard = {
  id: string;
  name: string;
  dateCreated: string;
  layout: any;
};

const DashboardView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  useEffect(() => {
    const savedDashboards = JSON.parse(
      localStorage.getItem("dashboards") || "[]"
    );
    const foundDashboard = savedDashboards.find(
      (db: Dashboard) => db.id === id
    );
    if (foundDashboard) {
      setDashboard(foundDashboard);
    }
  }, [id]);

  // Function to render chart based on type
  const renderChart = (chartType: string, data: number[]) => {
    switch (chartType) {
        case "Pie":
          return <PieChart data={data} />;
        case "Bar":
          return <BarChart data={data}/>;
        case "Line":
          return <LineChart data={data}/>;
        case "Doughnut":
          return <DoughnutChart data={data}/>;
        default:
          return <PieChart data={data}/>;// Fallback for undefined chart types
    }
  };

  if (!dashboard) {
    return <div>Loading...</div>; // Or handle loading state differently
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="viewHeader">
      <h1 className="text-2xl font-bold">{dashboard.name}</h1>
      <Link to={`/`} className="viewBackbtn mr-2">
        Back
      </Link>
        </div>
     
      <GridLayout
        className="layout border-2 border-gray-300 rounded-lg p-4 bg-gray-50"
        layout={dashboard.layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isDraggable={false} // Disable dragging in view mode
        isResizable={false} // Disable resizing in view mode
        compactType={null} // Disable compacting to allow free movement
        preventCollision={true} // Prevent item collisions
      >
        {dashboard.layout.map(
          (chart: { i: React.Key | null | undefined; chartType: string; chartData:  number[] }) => (
            <div key={chart.i} className="chart-container">
              {renderChart(chart.chartType, chart.chartData)} {/* Dynamically render chart */}
            </div>
          )
        )}
      </GridLayout>
    </div>
  );
};

export default DashboardView;
