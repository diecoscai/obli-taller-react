import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2c3d5e',
    color: theme.palette.common.white,
    borderBottom: `2px solid ${theme.palette.divider}`,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold'
  }
}));

const CustomizedTableHead = ({ names }) => {
  return (
    <TableHead>
      <TableRow>
        {names &&
          names.length > 0 &&
          names.map((name) => (
            <StyledTableCell key={name} align="center">
              {name}
            </StyledTableCell>
          ))}
        <StyledTableCell></StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

CustomizedTableHead.propTypes = { names: [] };
export default CustomizedTableHead;
