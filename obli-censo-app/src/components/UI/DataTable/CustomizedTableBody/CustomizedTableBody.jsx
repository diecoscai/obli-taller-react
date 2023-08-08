import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import CustomizedButton from '../../CustomizedButton';
import tableCellClasses from '@mui/material/TableCell';
import { useEffect, useState } from 'react';

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

const CustomizedTableBody = ({ user, onDeleteUser, deptos, occupations }) => {
  const minDepartamentoId = deptos.length > 0 ? Math.min(...deptos.map((depto) => depto.id)) : 0;
  const [occupationName, setOccupationName] = useState(0);

  useEffect(() => {
    if (user.ocupacion > 5) {
      setOccupationName(user.ocupacion - 2);
    } else {
      setOccupationName(user.ocupacion - 1);
    }
  }, [user.ocupacion]);

  return (
    <StyledTableRow key={user.id}>
      <StyledTableCell align="center">{user.nombre}</StyledTableCell>
      <StyledTableCell align="center">
        {deptos.length > 0
          ? deptos[user.departamento - minDepartamentoId].nombre
          : user.departamento}
      </StyledTableCell>
      <StyledTableCell align="center">{user.fechaNacimiento}</StyledTableCell>
      <StyledTableCell align="center">
        {occupations.length > 0 ? occupations[occupationName].ocupacion : user.ocupacion}
      </StyledTableCell>
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
