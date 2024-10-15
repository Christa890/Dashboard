import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Dashboard = {
  id: string;
  name: string;
  dateCreated: string;
  layout: any;
  screenshot?:string
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

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold dashboard-heading">
        Custom Dashboards
      </h1>
      <table className="min-w-full bg-white border-collapse dashboard-table">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-center">Dashboard Preview</th>
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
                  {dashboard.screenshot ? (
                    <img
                      src={dashboard.screenshot}
                      alt={`${dashboard.name} Preview`}
                      className="dashboard-preview"
                      style={{ width: "40px", height: "40px" }}
                    />
                  ) : (
                    "No Preview Available"
                  )}
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
                  <Link
                    to={`/view/${dashboard.id}`}
                    className="dashboard-view mr-2"
                  >
                    view
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
