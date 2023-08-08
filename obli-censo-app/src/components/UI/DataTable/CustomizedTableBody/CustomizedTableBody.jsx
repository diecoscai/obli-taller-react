import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import CustomizedButton from '../../CustomizedButton';
import tableCellClasses from '@mui/material/TableCell';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        borderBottom: 'none'
    }
}));

const StyledTableRow = styled(TableRow)(() => ({
    '& td': {
        backgroundColor: '#F1F6F9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: 16
    }
}));

const CustomizedTableBody = ({ user, onDeleteUser }) => {
    return (
        <StyledTableRow key={user.id}>
            <StyledTableCell align="center">{user.nombre}</StyledTableCell>
            <StyledTableCell align="center">{user.departamento}</StyledTableCell>
            <StyledTableCell align="center">{user.ciudad}</StyledTableCell>
            <StyledTableCell align="center">{user.fechaNacimiento}</StyledTableCell>
            <StyledTableCell align="center">{user.ocupacion}</StyledTableCell>
            <StyledTableCell align="center">
                <CustomizedButton onHandleClick={() => onDeleteUser(user.id)}>
                    <Typography variant={'p'} color={'white'} align={'center'}>
                        Eliminar
                    </Typography>
                </CustomizedButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default CustomizedTableBody;
