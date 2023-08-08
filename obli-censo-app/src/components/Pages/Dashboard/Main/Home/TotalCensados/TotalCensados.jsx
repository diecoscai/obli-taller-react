import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalRegistered } from '../../../../../../api/censoAPI';
import { getTotalCensados } from '../../../../../../app/slices/totalCensadosSlice';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const TotalCensados = ({ people }) => {
    const dispatch = useDispatch();
    const totalCensados = useSelector((state) => state.totalCensados.totalCensados);
    const userLogged = useSelector((state) => state.user.userLogged);
    const [censadosPercentage, setCensadosPercentage] = useState(0);
    const [montevideoCount, setMontevideoCount] = useState(0);
    const [restOfCountryCount, setRestOfCountryCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTotalRegistered(userLogged.apiKey, userLogged.id);
                const totalCensados = response.total;
                dispatch(getTotalCensados(totalCensados));

                if (people.length > 0) {
                    const peopleCount = people.length
                    const montevideoDeptId = 3218;
                    const montevideoPeople = people.filter(person => person.departamento === montevideoDeptId);
                    const percentage = (peopleCount / totalCensados) * 100;
                    setMontevideoCount(montevideoPeople.length);
                    setRestOfCountryCount(totalCensados - montevideoCount);
                    setCensadosPercentage(percentage);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userLogged, people]);

    const formatNumber = (number, width) => {
        const numStr = number.toFixed(1);
        const parts = numStr.split('.');
        const integerPart = parts[0].padStart(width, '0');
        return integerPart + '.' + parts[1];
    };

    return (
        <Grid container spacing={2} paddingLeft={'20xp'} paddingTop={'20px'}>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#333', borderRadius: 10, padding: '20px', height: '20vh', margin: '10px', paddingTop: '5px' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                            Total de Censados
                        </Typography>
                        <Typography variant="h4" component="p" sx={{ color: 'white', fontSize: '2.5rem', marginTop: '10px' }}>
                            {totalCensados}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#333', borderRadius: 10, padding: '20px', height: '20vh', margin: '10px', paddingTop: '5px' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                            Porcentaje de Personas Censadas en Montevideo
                        </Typography>
                        <Typography variant="h4" component="p" sx={{ color: 'white', fontSize: '2.5rem', marginTop: '10px' }}>
                            {formatNumber(censadosPercentage, 5)}%
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#333', borderRadius: 10, padding: '20px', height: '20vh', margin: '10px', paddingTop: '5px' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                            Cantidad de Personas Censadas en Montevideo
                        </Typography>
                        <Typography variant="h4" component="p" sx={{ color: 'white', fontSize: '2.5rem', marginTop: '10px' }}>
                            {montevideoCount}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#333', borderRadius: 10, padding: '20px', height: '20vh', margin: '10px', paddingTop: '5px' }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                            Cantidad de Personas Censadas en Resto del País
                        </Typography>
                        <Typography variant="h4" component="p" sx={{ color: 'white', fontSize: '2.5rem', marginTop: '10px' }}>
                            {restOfCountryCount}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TotalCensados;
