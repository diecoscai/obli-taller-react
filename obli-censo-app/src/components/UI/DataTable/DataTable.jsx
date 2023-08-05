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
    Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux/es/hooks/useSelector';
import { useEffect, useState } from 'react';
import { blue, red } from '@mui/material/colors';

const DataTable = () => {
    const users = useSelector((state) => state.userList.userArr) || [];
    // Estado para controlar la carga de datos
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        borderBottom: 'none', 
    },
}));
    
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        backgroundColor: '#F1F6F9', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: 16,
    },
}));

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    maxWidth: 800,
                    maxHeight: '80vh',
                    margin: 'auto',
                    marginTop: '10vh',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                }}>
                {loading ? (
                    // Muestra "Cargando..." mientras los datos se cargan
                    <p>Cargando...</p>
                ) : (
                    <Table >
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
                            {Array.isArray(users) && users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                sx={{
                                                    borderRadius: 2,
                                                    boxShadow: '2px 2px 5px #ccc',
                                                    fontWeight: 'bold',
                                                    textShadow: '2px 2px 5px #555549',
                                                    backgroundColor: '#ff0000',
                                                }}>
                                                <Typography variant={"p"} color={"white"} align={"center"}>Eliminar</Typography>
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                )}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{backgroundColor: '#F1F6F9'}}
                    labelRowsPerPage="Censados máximos por página"
                />
            </TableContainer>
        </>
    )
}

export default DataTable
