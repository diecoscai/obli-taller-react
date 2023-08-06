import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    Table,
    TableBody,
    TablePagination,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    MenuItem,
    Select,
    Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchDeletePerson } from '../../../api/censoAPI';
import { fetchGetOccupations } from '../../../api/censoAPI';
import { onDeletePerson } from '../../../app/slices/personSlice';
import { getOccupations } from '../../../app/slices/occupationSlice';

const DataTable = () => {
    const dispatch = useDispatch();
    const person = useSelector((state) => state.personList.personArr) || [];
    const occupations = useSelector((state) => state.occupations.occupationsList) || [];
    const userLogged = useSelector((state) => state.user.userLogged);
    const [loading, setLoading] = useState(false);
    const [personDeleted, setPersonDeleted] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#2c3d5e',
            color: theme.palette.common.white,
            borderBottom: `2px solid ${theme.palette.divider}`,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontWeight: 'bold'
        },
        [`&.${tableCellClasses.body}`]: { fontSize: 16, borderBottom: 'none' }
    }));

    const StyledTableRow = styled(TableRow)(() => ({ '& td': { backgroundColor: '#F1F6F9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: 16 } }));

    const onDeleteUser = (id) => {
        fetchDeletePerson({ apiKey: userLogged.apiKey, idUser: userLogged.id, idCenso: id })
            .then(response => {
                if (response.mensaje === 'Registro eliminado con éxito') {
                    dispatch(onDeletePerson(id));
                    setPersonDeleted(true);
                    //Crear UI Alert y Spinner               
                }
            })
            .catch(error => { console.log(error); });
    };

    useEffect(() => {
        if (personDeleted) {
            setLoading(false);
            setPersonDeleted(false);
        }
    }, [personDeleted]);

    useEffect(() => {
        fetchGetOccupations({ apiKey: userLogged.apiKey, idUser: userLogged.id })
            .then((response) => {
                dispatch(getOccupations(response.ocupaciones));
            })
            .catch((error) => { console.log(error); });
    }, []);

    const setSelectedValue = (e) => {
        console.log(e)
        const occupationList = person.filter(item => item.ocupacion === e)
        console.log(occupationList);
    };
    return (
        <>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <Box position="relative">
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end" margin={2} gap={1}>
                        <Typography variant={"h6"} color={"#2c3d5e"} fontWeight={'bold'} marginTop={1}  >Filtrar por ocupacion:</Typography>
                        <Select onChange={(e) => setSelectedValue(e.target.value)} size='small' >
                            {Array.isArray(occupations) && occupations.map((item) => (<MenuItem key={item.id} value={item.id}> {item.ocupacion} </MenuItem>))}
                        </Select>
                    </Box>
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxWidth: 900,
                            maxHeight: '80vh',
                            margin: 'auto',
                            marginTop: '10vh',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                        }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Nombre</StyledTableCell>
                                    <StyledTableCell align="center">Departamento</StyledTableCell>
                                    <StyledTableCell align="center">Ciudad</StyledTableCell>
                                    <StyledTableCell align="center">Fecha de Nacimiento</StyledTableCell>
                                    <StyledTableCell align="center">Ocupacion</StyledTableCell>
                                    <StyledTableCell align="center">Accion</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(person) && person.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell align="center">{user.nombre}</StyledTableCell>
                                            <StyledTableCell align="center">{user.departamento}</StyledTableCell>
                                            <StyledTableCell align="center">{user.ciudad}</StyledTableCell>
                                            <StyledTableCell align="center">{user.fechaNacimiento}</StyledTableCell>
                                            <StyledTableCell align="center">{user.ocupacion}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => onDeleteUser(user.id)}
                                                    sx={{
                                                        borderRadius: 2,
                                                        boxShadow: '2px 2px 5px #ccc',
                                                        fontWeight: 'bold',
                                                        textShadow: '2px 2px 5px #555549',
                                                        backgroundColor: '#ff0000'
                                                    }}>
                                                    <Typography variant={'p'} color={'white'} align={'center'}> Eliminar </Typography>
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={person.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{ backgroundColor: '#F1F6F9' }}
                            labelRowsPerPage="Censados máximos por página"
                        />
                    </TableContainer>
                </Box>
            )}
        </>
    );
};

export default DataTable;
