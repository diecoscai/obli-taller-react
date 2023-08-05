import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetPerson } from '../../../../../api/censoAPI';
import { onGetPerson } from '../../../../../app/slices/personSlice';
import DataTable from '../../../../UI/DataTable/DataTable';

const ListadoPersonasCensadas = () => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.userLogged);

  useEffect(() => {
    if (userLogged) {
      fetchGetPerson({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((response) => {
          console.log(response.personas);
          dispatch(onGetPerson(response.personas));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userLogged]);

  return (
    <>
      <DataTable />
    </>
  );
};

export default ListadoPersonasCensadas;
