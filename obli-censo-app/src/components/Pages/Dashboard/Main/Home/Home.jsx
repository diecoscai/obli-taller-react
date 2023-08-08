import React from 'react';
import { Grid } from '@mui/material';
import Charts from './Charts';
import Map from './Map/Map';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { fetchGetPerson, fetchGetOccupations, fetchDeptos } from '../../../../../api/censoAPI';
import { useDispatch } from 'react-redux';
import { onGetPerson } from '../../../../../app/slices/personSlice';
import { getOccupations } from '../../../../../app/slices/occupationSlice';
import { getDeptos } from '../../../../../app/slices/deptoSlice';

const Home = () => {
  const userLogged = useSelector((state) => state.user.userLogged);
  const people = useSelector((state) => state.personList.personArr) || [];
  const occupations = useSelector((state) => state.occupations.occupationsList.ocupaciones) || [];
  const deptos = useSelector((state) => state.deptos.deptoList.departamentos) || [];
  const [peopleByOccupation, setPeopleByOccupation] = useState([]);
  const [occupationsName, setOccupationsName] = useState([]);
  const [peopleByDeptos, setPeopleByDeptos] = useState([]);
  const [deptosName, setDeptosName] = useState([]);
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

      fetchGetOccupations({
        apiKey: userLogged.apiKey,
        idUser: userLogged.id
      })
        .then((response) => {
          dispatch(getOccupations(response));
        })
        .catch((error) => {
          console.log(error);
        });

      fetchDeptos({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((response) => {
          dispatch(getDeptos(response));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userLogged, dispatch]);

  useEffect(() => {
    if (people && occupations) {
      const peopleByOccupationsCount = occupations.map(() => 0);

      people.forEach((person) => {
        if (person.ocupacion > 5) {
          peopleByOccupationsCount[person.ocupacion - 2] += 1;
        } else {
          peopleByOccupationsCount[person.ocupacion - 1] += 1;
        }
      });

      setPeopleByOccupation(peopleByOccupationsCount);

      setOccupationsName(occupations.map((occupation) => occupation.ocupacion));

      const peopleByDeptosCount = deptos.map(() => 0);

      const minDeptoId = Math.min(...deptos.map((departamento) => departamento.id));

      people.forEach((person) => {
        peopleByDeptosCount[person.departamento - minDeptoId] += 1;
      });

      setPeopleByDeptos(peopleByDeptosCount);

      setDeptosName(deptos.map((depto) => depto.nombre));
    }
  }, [people, occupations, deptos]);

  return (
    <div>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: '80%',
          margin: 'auto',
          marginTop: '10vh',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
        <Grid item xs={12}>
          <Charts
            peopleByOccupation={peopleByOccupation}
            occupationsName={occupationsName}
            peopleByDeptos={peopleByDeptos}
            deptosName={deptosName}
          />
        </Grid>
        <Grid item xs={12}>
          <Map departments={deptos} peopleByDeptos={peopleByDeptos} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
