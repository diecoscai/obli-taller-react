import { Button } from '@mui/material';
const CustomizedButton = ({ onHandleClick, children }) => {
    return (
        <Button
            variant="outlined"
            color="error"
            onClick={onHandleClick}
            sx={{
                borderRadius: 2,
                boxShadow: '2px 2px 5px #ccc',
                fontWeight: 'bold',
                textShadow: '2px 2px 5px #555549',
                backgroundColor: '#ff0000'
            }}>
            {children}
        </ Button>
    )
}

CustomizedButton.defaultProps = {
    onHandleClick: () => { }
}

export default CustomizedButton
