import ReactApexChart from 'react-apexcharts';
import { Typography } from '@mui/material';

const ChartBar = ({ peopleByDeptos, deptosName }) => {
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

    return (
        <>
            <Typography variant="h6" component="h6">
                Personas por departamento
            </Typography>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </>
    );
};

export default ChartBar;
