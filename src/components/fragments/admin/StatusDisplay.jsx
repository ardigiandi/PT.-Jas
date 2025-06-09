import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

const StatusDisplay = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/api/stats");
        setStats(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">Error fetching stats: {error.message}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Portfolios</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{stats.portfolio_count}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{stats.photo_count}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{stats.visitor_count}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusDisplay;
