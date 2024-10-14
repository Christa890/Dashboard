import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Dashboard = {
  id: string;
  name: string;
  dateCreated: string;
  layout: any;
};

const Home: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  useEffect(() => {
    const savedDashboards = JSON.parse(
      localStorage.getItem("dashboards") || "[]"
    );
    setDashboards(savedDashboards);
  }, []);

  const deleteDashboard = (id: string) => {
    if (confirm("Are you sure you want to delete this dashboard?")) {
      const updatedDashboards = dashboards.filter(
        (dashboard) => dashboard.id !== id
      );
      setDashboards(updatedDashboards);
      localStorage.setItem("dashboards", JSON.stringify(updatedDashboards));
    }
  };
  const getIconsForDashboard = (layout: any[]) => {
    const chartTypes = layout.map((chart) => chart.chartType);
    const uniqueChartTypes = Array.from(new Set(chartTypes)); // To avoid duplicate chart icons
  
    let icons = [];
  
    for (const chartType of uniqueChartTypes) {
      switch (chartType) {
        case 'Pie':
          icons.push('🥧');
          break;
        case 'Bar':
          icons.push('📊');
          break;
        case 'Line':
          icons.push('📈');
          break;
        case 'Doughnut':
          icons.push('🍩');
          break;
        default:
          icons.push('📊'); // Default to bar chart icon
          break;
      }
    }
  
    return icons.join(' '); // Return icons as a string separated by spaces
  };
  

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold dashboard-heading">
        Custom Dashboards
      </h1>
      <table className="min-w-full bg-white border-collapse dashboard-table">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Dashboard Icon</th>
            <th className="border px-4 py-2 text-center">Dashboard Name</th>
            <th className="border px-4 py-2 text-center">Date Created</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dashboards.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No Dashboards
              </td>
            </tr>
          ) : (
            dashboards.map((dashboard) => (
              <tr key={dashboard.id} className="dashboard-row">
                <td className="border px-4 py-2 text-center">
                  <span className="dashboard-icon">
                    {getIconsForDashboard(dashboard.layout)}
                  </span>
                </td>
                <td className="border px-4 py-2 text-center">
                  {dashboard.name}
                </td>
                <td className="border px-4 py-2 text-center">
                  {dashboard.dateCreated}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    to={`/edit/${dashboard.id}`}
                    className="dashboard-link mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="dashboard-button"
                    onClick={() => deleteDashboard(dashboard.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Link
        to="/create"
        className="bg-blue-500 text-white p-2 rounded mt-4 inline-block add-dashboard"
      >
        Add New Dashboard
      </Link>
    </div>
  );
};

export default Home;
