import {
  Table,
  TableBody,
  TablePagination,
  TableContainer,
  Paper,
  Typography,
  Box
} from '@mui/material';
import CustomizedButton from '../CustomizedButton';
import CustomizedTableBody from './CustomizedTableBody';
import CustomizedTableHead from './CustomizedTableHead';
import CustomizedSelect from '../CustomizedSelect';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  fetchDeptos,
  fetchGetPerson,
  fetchGetOccupations,
  fetchDeletePerson
} from '../../../api/censoAPI';
import { onDeletePerson, onGetPerson } from '../../../app/slices/personSlice';
import { getOccupations } from '../../../app/slices/occupationSlice';
import { getDeptos } from '../../../app/slices/deptoSlice';
import PropTypes from 'prop-types';

const DataTable = () => {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.userLogged);
  const person = useSelector((state) => state.personList.personArr) || [];
  const occupations = useSelector((state) => state.occupations.occupationsList) || [];
  const deparments = useSelector((state) => state.deptos.deptoList) || [];

  const [loading, setLoading] = useState(false);
  const [personDeleted, setPersonDeleted] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [filteredPersonList, setFilteredPersonList] = useState([]);

  CustomizedTableHead.propTypes = {
    names: PropTypes.arrayOf(PropTypes.string).isRequired
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDeleteUser = (id) => {
    fetchDeletePerson({ apiKey: userLogged.apiKey, idUser: userLogged.id, idCenso: id })
      .then((response) => {
        if (response.mensaje === 'Registro eliminado con éxito') {
          dispatch(onDeletePerson(id));
          setPersonDeleted(true);
          //Crear UI Alert y Spinner
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (personDeleted) {
      setLoading(false);
      setPersonDeleted(false);
    }
  }, [personDeleted]);

  useEffect(() => {
    if (userLogged) {
      fetchGetPerson({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((users) => {
          console.log('users', users.personas);
          dispatch(onGetPerson(users.personas));
        })
        .catch((e) => {
          console.error(e.message);
        });

      fetchDeptos({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((deparments) => {
          dispatch(getDeptos(deparments.departamentos));
          console.log('Response: ', deparments.departamentos);
        })
        .catch((e) => {
          console.error(e.message);
        });

      fetchGetOccupations({ apiKey: userLogged.apiKey, idUser: userLogged.id })
        .then((ocupaciones) => {
          dispatch(getOccupations(ocupaciones.ocupaciones));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, []);

  useEffect(() => {
    const updatedFilteredPersonList = selectedOccupation
      ? person.filter((item) => item.ocupacion === selectedOccupation)
      : person;
    setFilteredPersonList(updatedFilteredPersonList);
  }, [person, selectedOccupation]);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Box position="relative">
          <Typography variant={'h4'} color={'#2c3d5e'} fontWeight={'bold'} textAlign={'center'}>
            Personas Censadas
          </Typography>
          <Box
            position="absolute"
            top={'10%'}
            right={'10%'}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}>
            <Typography variant={'h6'} color={'#2c3d5e'} fontWeight={'bold'}>
              Filtrar por ocupacion:
            </Typography>
            <CustomizedSelect
              onChange={(e) => setSelectedOccupation(e.target.value)}
              value={selectedOccupation}
              occupations={occupations}
            />
            <CustomizedButton onHandleClick={() => setSelectedOccupation(null)}>
              <Typography variant={'p'} color={'white'} align={'center'}>
                {' '}
                Limpiar Filtro{' '}
              </Typography>
            </CustomizedButton>
          </Box>
          <Box>
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: '80%',
                margin: 'auto',
                marginTop: '10vh',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                overflowX: 'auto'
              }}>
              <Table position="absolute">
                <CustomizedTableHead
                  names={['Nombre', 'Departamento', 'Fecha de Nacimiento', 'Ocupacion']}
                />
                <TableBody>
                  {Array.isArray(filteredPersonList) &&
                    filteredPersonList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user) => (
                        <CustomizedTableBody
                          key={user.id}
                          user={user}
                          onDeleteUser={onDeleteUser}
                          deptos={deparments}
                          occupations={occupations}
                        />
                      ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredPersonList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: '#F1F6F9' }}
                labelRowsPerPage="Censados máximos por página"
              />
            </TableContainer>
          </Box>
        </Box>
      )}
    </>
  );
};

export default DataTable;
