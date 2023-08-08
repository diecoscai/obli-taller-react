import { Select, MenuItem } from "@mui/material";

const CustomizedSelect = ({ onChange, value, occupations }) => {
    return (
        <Select
            onChange={onChange}
            size='small'
            value={value}
            sx={{
                width: '200px',
                height: '35px',
                borderRadius: '5px',
                backgroundColor: '#f5f5f5',
                color: '#2c3d5e',
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                    color: '#2c3d5e',
                },
                '&:focus': {
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                },
            }}
        >
            {Array.isArray(occupations) && occupations.map((item) => (
                <MenuItem key={item.id} value={item.id}> {item.ocupacion} </MenuItem>
            ))}
        </Select>
    );
}

export default CustomizedSelect;
