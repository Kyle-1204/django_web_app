import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

const Dashboard = () => {
  // State for each chart's data
  const [candlestickData, setCandlestickData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  // Fetch data from the API for all charts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candlestickRes, lineRes, barRes, pieRes] = await Promise.all([
          axios.get('http://localhost:8000/api/candlestick-data/'),
          axios.get('http://localhost:8000/api/line-chart-data/'),
          axios.get('http://localhost:8000/api/bar-chart-data/'),
          axios.get('http://localhost:8000/api/pie-chart-data/')
        ]);

        setCandlestickData(candlestickRes.data);
        setLineChartData(lineRes.data);
        setBarChartData(barRes.data);
        setPieChartData(pieRes.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  // Candlestick Chart component placeholder (can be filled in with a charting library like TradingView.js)
  const CandlestickChart = () => (
    <div className="chart-container">
      {/* Add your Candlestick chart rendering logic here */}
      <h2>Candlestick Chart</h2>
      <pre>{JSON.stringify(candlestickData, null, 2)}</pre>
    </div>
  );

  // Line Chart component
  const LineChart = () => {
    const data = {
      labels: lineChartData?.labels || [],
      datasets: [
        {
          label: 'Line Chart Data',
          data: lineChartData?.data || [],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1,
        },
      ],
    };

    return <Line data={data} />;
  };

  // Bar Chart component
  const BarChart = () => {
    const data = {
      labels: barChartData?.labels || [],
      datasets: [
        {
          label: 'Bar Chart Data',
          data: barChartData?.data || [],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return <Bar data={data} />;
  };

  // Pie Chart component
  const PieChart = () => {
    const data = {
      labels: pieChartData?.labels || [],
      datasets: [
        {
          label: 'Pie Chart Data',
          data: pieChartData?.data || [],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverOffset: 4,
        },
      ],
    };

    return <Pie data={data} />;
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="chart-item">
          <CandlestickChart />
        </div>
        <div className="chart-item">
          {lineChartData ? <LineChart /> : <p>Loading Line Chart...</p>}
        </div>
        <div className="chart-item">
          {barChartData ? <BarChart /> : <p>Loading Bar Chart...</p>}
        </div>
        <div className="chart-item">
          {pieChartData ? <PieChart /> : <p>Loading Pie Chart...</p>}
        </div>
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .chart-item {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};