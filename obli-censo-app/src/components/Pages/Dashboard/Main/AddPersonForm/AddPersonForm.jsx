import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomizedButton from '../../../../UI/CustomizedButton';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
    fetchAddPerson,
    fetchDeptos,
    fetchCitiesForState,
    fetchGetOccupations,
} from '../../../../../api/censoAPI';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
} from '@mui/material';

import { getDeptos } from '../../../../../app/slices/deptoSlice';
import { getCities } from '../../../../../app/slices/citySlice';
import { getOccupations } from '../../../../../app/slices/occupationSlice';

const AddPersonForm = () => {
    const dispatch = useDispatch();

    const userLogged = useSelector((state) => state.user.userLogged);
    const deptos =
        useSelector((state) => state.deptos.deptoList.departamentos) || [];
    const cities =
        useSelector((state) => state.cities.citiesList.ciudades) || [];
    const occupations =
        useSelector((state) => state.occupations.occupationsList.ocupaciones) ||
        [];

    const [name, setName] = useState('');
    const [depto, setDepto] = useState('');
    const [city, setCity] = useState('');
    const [birthday, setBirthday] = useState('');
    const [occupation, setOccupation] = useState('');

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    const filteredOccupations = occupations.filter((item) => {
        if (birthday && calculateAge(birthday) < 18) {
            return item.ocupacion === 'Estudiante';
        }
        return true;
    });

    useEffect(() => {
        fetchDeptos({ apiKey: userLogged.apiKey, idUser: userLogged.id })
            .then((response) => {
                dispatch(getDeptos(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetchCitiesForState({
            idDepto: depto,
            apiKey: userLogged.apiKey,
            idUser: userLogged.id,
        })
            .then((response) => {
                dispatch(getCities(response));
            })
            .catch((error) => {
                console.log(error);
            });

        fetchCitiesForState({
            idDepto: depto,
            apiKey: userLogged.apiKey,
            idUser: userLogged.id,
        })
            .then((response) => {
                dispatch(getCities(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [depto]);

    useEffect(() => {
        fetchGetOccupations({
            apiKey: userLogged.apiKey,
            idUser: userLogged.id,
        })
            .then((response) => {
                dispatch(getOccupations(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [occupations]);

    const _onHandleChangeName = (e) => {
        setName(e.target.value);
    };
    const _onHandleChangeDeptos = (e) => {
        setDepto(e.target.value);
    };

    const _onHandleChangeCity = (e) => {
        setCity(e.target.value);
    };
    const _onHandleChangeBirthDay = (e) => {
        setBirthday(e.target.value);
    };
    const _onHandleChangeOccupation = (e) => {
        setOccupation(e.target.value);
    };

    //   apiKey, idUser, name, idState, idCity, birthDate, idOccupation

    const _onHandleAddPerson = (e) => {
        e.preventDefault();
        if (
            name !== '' ||
            depto !== '' ||
            city !== '' ||
            birthday !== '' ||
            occupation !== ''
        ) {
            const newPerson = {
                apiKey: userLogged.apiKey,
                idUser: userLogged.id,
                name: name,
                idDepto: depto,
                idCity: city,
                birthday: birthday,
                idOccupation: occupation,
            };
            fetchAddPerson(newPerson)
                .then((response) => {
                    console.log(response);
                    // dispatch(onAddPerson(newPerson));
                })
                .catch((e) => {
                    console.error(e);
                });
        } else {
            alert('Error!!');
        }
    };

    return (
        <>
            <Typography variant={"h4"} color={"#2c3d5e"} fontWeight={'bold'} textAlign={'center'} >Agregue persona a censar</Typography>
            <form>
                <Grid
                    maxWidth={1000}
                    margin="auto"
                    padding={3}
                    borderRadius={5}
                    minHeight="50vh"
                    container
                    spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre"
                            value={name}
                            onChange={_onHandleChangeName}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth>
                            <InputLabel>Departamento</InputLabel>
                            <Select
                                value={depto}
                                onChange={_onHandleChangeDeptos}>
                                {Array.isArray(deptos) &&
                                    deptos.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.nombre}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth>
                            <InputLabel>Ciudad</InputLabel>
                            <Select value={city} onChange={_onHandleChangeCity}>
                                {Array.isArray(cities) &&
                                    cities.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.nombre}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fecha Nac"
                            value={birthday}
                            onChange={_onHandleChangeBirthDay}
                            type="date"
                            required
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl required fullWidth>
                            <InputLabel>Ocupación</InputLabel>
                            <Select
                                value={occupation}
                                onChange={_onHandleChangeOccupation}>
                                {Array.isArray(filteredOccupations) &&
                                    filteredOccupations.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.ocupacion}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <CustomizedButton onHandleClick={_onHandleAddPerson}  >
                    <Typography variant={'p'} color={'white'} align={'center'}> Agregar Persona </Typography>
                </CustomizedButton>
            </form>
        </>
    );
};

export default AddPersonForm;
