import { Grid } from '@mui/material';
import ChartPie from './ChartPie/ChartPie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { fetchGetPerson, fetchGetOccupations } from '../../../../../../api/censoAPI';
import { useDispatch } from 'react-redux';
import { onGetPerson } from '../../../../../../app/slices/personSlice';
import { getOccupations } from '../../../../../../app/slices/occupationSlice';

const Charts = () => {
  const userLogged = useSelector((state) => state.user.userLogged);
  const people = useSelector((state) => state.personList.personArr) || [];
  const occupations = useSelector((state) => state.occupations.occupationsList.ocupaciones) || [];
  const [peopleByOccupation, setPeopleByOccupation] = useState([]);
  const [occupationsName, setOccupationsName] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userLogged) {
      fetchGetPerson({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((response) => {
          dispatch(onGetPerson(response.personas));
        })
        .catch((error) => {
          console.log(error);
        });

      fetchGetOccupations({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((response) => {
          dispatch(getOccupations(response));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userLogged, dispatch]);

  useEffect(() => {
    if (people && occupations) {
      const PeopleByOccupationsCount = occupations.map(() => 0);

      people.forEach((person) => {
        if (person.ocupacion > 5) {
          PeopleByOccupationsCount[person.ocupacion - 2] += 1;
        } else {
          PeopleByOccupationsCount[person.ocupacion - 1] += 1;
        }
      });

      setPeopleByOccupation(PeopleByOccupationsCount);

      setOccupationsName(occupations.map((occupation) => occupation.ocupacion));
    }
  }, [people, occupations]);

  return (
    <>
      <Grid item xs={12} sm={6}>
        <ChartPie peopleByOccupation={peopleByOccupation} occupationsName={occupationsName} />
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12} sm={6}></Grid>
    </>
  );
};

export default Charts;
