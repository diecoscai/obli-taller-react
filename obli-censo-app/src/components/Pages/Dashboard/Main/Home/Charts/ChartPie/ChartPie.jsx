import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography, CircularProgress } from '@mui/material';

const ChartPie = ({ peopleByOccupation, occupationsName }) => {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setChartData({
                series: peopleByOccupation,
                options: {
                    chart: {
                        type: 'pie',
                    },
                    labels: occupationsName,
                },
            });
            setLoading(false);
        }, 2000);
    }, [peopleByOccupation, occupationsName]);

    return (
        <>
            <Typography variant="h6" component="h6">
                Personas por ocupación
            </Typography>
            {loading ? (
                <CircularProgress /> 
            ) : (
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="pie"
                    height={350}
                />
            )}
        </>
    );
};

export default ChartPie;
