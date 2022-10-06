import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../config';
import axios from 'axios'
import WorkoutTemplate from '../component/WorkoutTemplate';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import { Container } from '@mui/system';
import WorkoutForm from '../component/WorkoutForm';
import PulseLoader from "react-spinners/PulseLoader";
import { useWorkoutsContext } from '../Hooks/useWorkoutContext';
import { useAuthContext } from '../Hooks/useAuthContext';


const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext();

    const url = 'http://localhost:4000/';
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {

        // fetch workouts list
        const fetchData = async () => {

            try {
                const res = await axiosInstance.get(`/workouts`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await res.data
                dispatch({ type: 'SET_WORKOUTS', payload: json })
                setIsLoading(false)

            } catch (err) {
                console.log(err.message);
                setIsLoading(false);
                setError('Could Not Fetch Data :(');
            }
        }

        // if user has value try fetch the data, if not don't try.
        if (user) {
            fetchData()
        }


    }, [dispatch, user]);


    const override = {
        display: "block",
        margin: "0 auto",
        position: 'absolute',
        left: '30%',
        top: '40%'
    };
    const errorStyle = {
        margin: "0 auto",
        position: 'absolute',
        left: '40%',
        top: '50%',
        color: '#ff0033',
        fontWeight: '500',
        fontSize: '20px',
        background: '#FFBABA',
        height: '40px',
        padding: '5px'
    };

    return (
        <Container>
            <Grid sx={{
                display: {
                    sm:
                        'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    columnGap: 2,
                }
            }}
                mt={4}>

                {isLoading && <PulseLoader cssOverride={override} color='#36D7B7' />}
                {error && <div style={errorStyle}>{error}</div>}

                <WorkoutForm url={url} setIsLoading={setIsLoading} isLoading={isLoading} />


                <Grid sx={{ gridRowStart: '1', gridColumn: 'span 2' }}  >
                    <Item rowGap={1}>
                        {workouts && workouts.map((workout) => (
                            <WorkoutTemplate key={workout._id} workout={workout} url={url} />
                        ))}
                    </Item>
                </Grid>
            </Grid>
        </ Container >
    )
}

export default Home