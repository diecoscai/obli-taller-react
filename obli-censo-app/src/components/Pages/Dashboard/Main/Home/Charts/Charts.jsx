import { Grid } from '@mui/material';
import ChartPie from './ChartPie/ChartPie';
import ChartBar from './ChartBar/ChartBar';

const Charts = ({ peopleByOccupation, occupationsName, peopleByDeptos, deptosName }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <ChartPie peopleByOccupation={peopleByOccupation} occupationsName={occupationsName} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ChartBar peopleByDeptos={peopleByDeptos} deptosName={deptosName} />
      </Grid>
    </Grid>
  );
};

export default Charts;
