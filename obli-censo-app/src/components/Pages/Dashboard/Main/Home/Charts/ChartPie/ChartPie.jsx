import ReactApexChart from 'react-apexcharts';

const ChartPie = ({ peopleByOccupation, occupationsName }) => {
  const data = {
    series: peopleByOccupation,
    options: {
      chart: {
        type: 'pie'
      },
      labels: occupationsName
    }
  };
  return (
    <div>
      <h2>Máximos por ocupación</h2>
      <ReactApexChart options={data.options} series={data.series} type="pie" />
    </div>
  );
};

export default ChartPie;
