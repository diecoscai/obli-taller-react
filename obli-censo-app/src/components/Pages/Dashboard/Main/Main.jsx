import Map from '../Map/Map';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeptos, fetchGetOccupations, fetchGetPerson, fetchAllCities } from '../../../../api/censoAPI';
import { onGetPerson } from '../../../../app/slices/personSlice';
import { getDeptos } from '../../../../app/slices/deptoSlice';
import { getOccupations } from '../../../../app/slices/occupationSlice';
import { getCities } from '../../../../app/slices/citySlice';

const Main = () => {
  const dispatch = useDispatch();
  const personList = useSelector((state) => state.personList.personArr) || [];
  const departments = useSelector((state) => state.deptos.deptoList) || [];
  const userLogged = useSelector((state) => state.user.userLogged);
  const [personByDepartment, setPersonByDeptos] = useState([]);
  console.log('departments', departments)

  useEffect(() => {
    if (userLogged) {
      fetchGetPerson({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((users) => {
          dispatch(onGetPerson(users.personas));
        })
        .catch((e) => { console.error(e.message); });

      fetchDeptos({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((departamentos) => {
          dispatch(getDeptos(departamentos.departamentos));
        })
        .catch((e) => { console.error(e.message); });

      fetchGetOccupations({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((ocupaciones) => {
          dispatch(getOccupations(ocupaciones.ocupaciones));
        })
        .catch((e) => { console.error(e.message); });

      fetchAllCities({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((ciudades) => {
          dispatch(getCities(ciudades.ciudades));
        })
        .catch((e) => { console.error(e.message); });
    }
  }, [userLogged]);

  useEffect(() => {
    if (usersData && departamentosData && ocupacionesData) {
      const cantidadPersonasPorDepartamento = departamentosData.map(() => 0);

      const minDepartamentoId = Math.min(
        ...departamentosData.map((departamento) => departamento.id)
      );

      usersData.forEach((persona) => {
        cantidadPersonasPorDepartamento[
          persona.departamento - minDepartamentoId
        ] += 1;
      });

      setUsersByState(cantidadPersonasPorDepartamento);

      const cantidadDePersonasPorOcupacion = ocupacionesData.map(() => 0);

      usersData.forEach((persona) => {
        if (persona.ocupacion > 5) {
          cantidadDePersonasPorOcupacion[persona.ocupacion - 2] += 1;
        } else {
          cantidadDePersonasPorOcupacion[persona.ocupacion - 1] += 1;
        }
      });

      setUsersByOcupation(cantidadDePersonasPorOcupacion);

      setDepartmentsName(
        departamentosData.map((departamento) => departamento.nombre)
      );
      setOcupationsName(
        ocupacionesData.map((ocupacion) => ocupacion.ocupacion)
      );
    }
  }, [usersData, departamentosData, ocupacionesData]);

  console.log('personByDepartment', personByDepartment)
  return (
    <main>
      {personByDepartment.length > 0 && (
        <Map personByDepartment={personByDepartment} />
      )}
    </main>
  );
};

export default Main;
