import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography, CircularProgress } from '@mui/material';

const ChartBar = ({ peopleByDeptos, deptosName }) => {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const options = {
                chart: {
                    type: 'bar',
                },
                xaxis: {
                    categories: deptosName,
                },
            };

            const series = [
                {
                    name: 'Number of People',
                    data: peopleByDeptos,
                },
            ];

            setChartData({ options, series });
            setLoading(false);
        }, 2000);
    }, [peopleByDeptos, deptosName]);

    return (
        <>
            <Typography variant="h6" component="h6">
                Personas por departamento
            </Typography>
            {loading ? (
                <CircularProgress /> 
            ) : (
                <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="bar"
                    height={350}
                />
            )}
        </>
    );
};

export default ChartBar;
