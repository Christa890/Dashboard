import React, { useState, useEffect } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { useNavigate, useParams } from "react-router-dom";
import "chart.js/auto";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import DoughnutChart from "./charts/DoughnutChart";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "../styles/style.css";

type Dashboard = {
  id: string;
  name: string;
  dateCreated: string;
  layout: any;
};

interface ChartLayout extends Layout {
  chartType: string;
}
//const [isDraggable, setIsDraggable] = useState(true);
const DashboardCreator: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [layout, setLayout] = useState<ChartLayout[]>([
    { i: "chart-1", x: 0, y: 0, w: 4, h: 4, chartType: "Pie" },
    { i: "chart-2", x: 4, y: 0, w: 4, h: 4, chartType: "Bar" },
  ]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      const savedDashboards = JSON.parse(
        localStorage.getItem("dashboards") || "[]"
      );
      const dashboard = savedDashboards.find((db: Dashboard) => db.id === id);
      if (dashboard) {
        setName(dashboard.name);
        setLayout(dashboard.layout);
      }
    }
  }, [id]);

  const saveDashboard = () => {
    const newDashboard = {
      id: id || String(Date.now()),
      name,
      dateCreated: new Date().toLocaleDateString(),
      layout,
    };
      // Check if name is empty
  if (!name.trim()) {
    alert("Dashboard name cannot be empty!");
    return;
  }

  const savedDashboards = JSON.parse(
    localStorage.getItem("dashboards") || "[]"
  );

  // Check for duplicate names
  const isDuplicateName = savedDashboards.some(
    (db: Dashboard) => db.name.toLowerCase() === name.trim().toLowerCase()
  );

  if (isDuplicateName && !id) {
    // If dashboard with same name exists and we're not editing
    alert("Dashboard name must be unique!");
    return;
  }
    if(layout.length==0){
        alert("Please insert atleast one chart");
        return 
    }

    if (id) {
      const updatedDashboards = savedDashboards.map((db: Dashboard) =>
        db.id === id ? newDashboard : db
      );
      localStorage.setItem("dashboards", JSON.stringify(updatedDashboards));
    } else {
      localStorage.setItem(
        "dashboards",
        JSON.stringify([...savedDashboards, newDashboard])
      );
    }

    

    navigate("/");
  };

  const [chartType, setChartType] = useState(""); // Default chart selection

  // Function to add a new chart to the layout
  const addChart = () => {
    const newChartId = `chart-${layout.length + 1}`;
    setLayout([
      ...layout,
      { i: newChartId, x: 0, y: 0, w: 6, h: 4, chartType },
    ]);
    setChartType("");
  };

  // Function to remove chart from layout
  const removeChart = (chartId: string) => {
    setLayout(layout.filter((chart) => chart.i !== chartId));
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedLayout = newLayout.map((item) => {
      const existingChart = layout.find((l) => l.i === item.i);
      return {
        ...item,
        chartType: existingChart?.chartType || "Pie", // Retain the existing chart type or default to 'Pie'
      };
    });
    setLayout(updatedLayout);
  };

  // Dynamically render the chart based on the type
  const renderChart = (chartType: string) => {
    switch (chartType) {
      case "Pie":
        return <PieChart />;
      case "Bar":
        return <BarChart />;
      case "Line":
        return <LineChart />;
      case "Doughnut":
        return <DoughnutChart />;
      default:
        return <PieChart />;
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="dashboard-header">Create Dashboard</h1>
      <div className="dashboard-form-container">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="dashboard-input mb-6 w-full"
          placeholder="Enter Dashboard Name"
        />
        <div className="chart-selector">
          <label htmlFor="chartType">Choose Chart Type:</label>
          <div className="select-container">
            <select
              id="chartType"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="" disabled>
                Select Chart
              </option>
              <option value="Pie">Pie Chart</option>
              <option value="Bar">Bar Chart</option>
              <option value="Line">Line Chart</option>
              <option value="Doughnut">Doughnut Chart</option>
            </select>
            <button className="add-chart" onClick={addChart}>
              Add Chart
            </button>
          </div>
        </div>

        <button onClick={saveDashboard} className="dashboard-save-btn mt-6">
          Save Dashboard
        </button>
      </div>
      <GridLayout
        className="layout border-2 border-gray-300 rounded-lg p-4 bg-gray-50"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
        isDraggable={true} // Allow dragging
        isResizable={true} // Allow resizing
        compactType={null} // Disable compacting to allow free movement
        preventCollision={true} // Prevent item collisions
      >
        {layout.map((chart) => (
          <div key={chart.i} className="chart-container">
            <div className="chart-header">
              <button
               className="chart-close-button"
               onMouseDown={(e) => {
                e.stopPropagation(); // Prevent the click from propagating
                removeChart(chart.i); // Call removeChart on click
              }} 
              >
                &times;
              </button>
            </div>
            {renderChart(chart.chartType)} {/* Dynamically render chart */}
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default DashboardCreator;
