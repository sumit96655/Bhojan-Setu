import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Prediction = () => {
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPredictionData();
    }, []);

    const fetchPredictionData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/predictions');
            setPredictionData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch prediction data');
            console.error('Error fetching prediction data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
            </div>
        );
    }

    const chartData = {
        labels: predictionData?.forecast_df?.map(item => new Date(item.Date).toLocaleDateString()) || [],
        datasets: [
            {
                label: 'Predicted Quantity',
                data: predictionData?.forecast_df?.map(item => item['Predicted Quantity']) || [],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Food Donation Prediction',
                font: {
                    size: 16
                }
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Donation Prediction Analysis</h1>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Trend Analysis</h3>
                    <p className="text-gray-600">
                        {predictionData?.summary?.split('\n')[0]}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Average Prediction</h3>
                    <p className="text-gray-600">
                        {predictionData?.summary?.split('\n')[1]}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
                    <p className="text-gray-600">
                        {predictionData?.summary?.split('\n')[4]}
                    </p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Detailed Predictions Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Predicted Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {predictionData?.forecast_df?.slice(0, 10).map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(item.Date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item['Predicted Quantity'].toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Prediction;
