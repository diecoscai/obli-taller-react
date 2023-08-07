import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  fetchAddPerson,
  fetchDeptos,
  fetchCitiesForState,
  fetchGetOccupations
} from '../../../../../api/censoAPI';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDeptos } from '../../../../../app/slices/deptoSlice';
import { getCities } from '../../../../../app/slices/citySlice';
import { getOccupations } from '../../../../../app/slices/occupationSlice';
import { onAddPerson } from '../../../../../app/slices/personSlice';

const AddPersonForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
  const theme = createTheme({
    palette: {
      yellowButton: createColor('#FFD25E')
    }
  });

  const userLogged = useSelector((state) => state.user.userLogged);
  const deptos = useSelector((state) => state.deptos.deptoList.departamentos) || [];
  const cities = useSelector((state) => state.cities.citiesList.ciudades) || [];
  const occupations = useSelector((state) => state.occupations.occupationsList.ocupaciones) || [];

  const [name, setName] = useState('');
  const [depto, setDepto] = useState('');
  const [city, setCity] = useState('');
  const [birthday, setBirthday] = useState('');
  const [occupation, setOccupation] = useState('');

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
    fetchCitiesForState({ idDepto: depto, apiKey: userLogged.apiKey, idUser: userLogged.id })
      .then((response) => {
        dispatch(getCities(response));
      })
      .catch((error) => {
        console.log(error);
      });

    fetchCitiesForState({ idDepto: depto, apiKey: userLogged.apiKey, idUser: userLogged.id })
      .then((response) => {
        dispatch(getCities(response));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [depto]);

  useEffect(() => {
    fetchGetOccupations({ apiKey: userLogged.apiKey, idUser: userLogged.id })
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
    if (name !== '' || depto !== '' || city !== '' || birthday !== '' || occupation !== '') {
      const newPerson = {
        apiKey: userLogged.apiKey,
        idUser: userLogged.id,
        name: name,
        idDepto: depto,
        idCity: city,
        birthday: birthday,
        idOccupation: occupation
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
              <Select value={depto} onChange={_onHandleChangeDeptos}>
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
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
              <InputLabel>Ocupación</InputLabel>
              <Select value={occupation} onChange={_onHandleChangeOccupation}>
                {Array.isArray(occupations) &&
                  occupations.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.ocupacion}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" onClick={_onHandleAddPerson}>
          Agregar Persona
        </Button>
      </form>
    </>
  );
};

export default AddPersonForm;
