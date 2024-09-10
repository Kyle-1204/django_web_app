import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';
import { createChart } from 'lightweight-charts'; //for candlestick chart

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

const Dashboard = () => {
  //Establish state for chart data
  const [candlestickData, setCandlestickData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  // Use axios to fetch data from django backend
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

  //Candlestick Chart
  const CandlestickChart = ({ candlestickData }) => {
    const chartContainerRef = useRef();
  
    useEffect(() => {
      if (!candlestickData) return; //Wait for data to load
      
      //Styling for data to fit in container
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
      });
      
      //Add candlestick structure
      const candlestickSeries = chart.addCandlestickSeries();
  
      //Formatting
      const formattedData = candlestickData.data.map(item => ({
        time: item.x, 
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
  
      //Add formatted data
      candlestickSeries.setData(formattedData);
  
      //Clean up chart
      return () => chart.remove();
    }, [candlestickData]);
  
    //Return Data
    return <div ref={chartContainerRef} className="candlestick-chart-container" />;
  };

  //Line Chart Data
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

  //Bar Chart Data
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

  //Pie Chart Data
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

  //Display and Styling
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="chart-item">
          <p> Candlestick Data</p>
          {candlestickData ? <CandlestickChart candlestickData={candlestickData}/> : <p> Loading Candlestick Chart...</p>}
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
        p {
          color: #504A4B;
          text-align: center;
        }   
      `}</style>
    </div>
  );
};

export default Dashboard;

