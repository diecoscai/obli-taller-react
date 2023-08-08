import ReactApexChart from 'react-apexcharts';
import { Typography } from '@mui/material';

const ChartPie = ({ peopleByOccupation, occupationsName }) => {
    const data = {
        series: peopleByOccupation,
        options: {
            chart: {
                type: 'pie',
            },
            labels: occupationsName,
        },
    };
    return (
        <>
            <Typography variant="h6" component="h6">
                Personas por ocupación
            </Typography>
            <ReactApexChart
                options={data.options}
                series={data.series}
                type="pie"
                height={350}
            />
        </>
    );
};

export default ChartPie;
