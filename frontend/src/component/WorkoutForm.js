import React, { useState } from 'react'
import { Box, styled } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from '@material-ui/core/InputBase';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useWorkoutsContext } from '../Hooks/useWorkoutContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import Card from '@mui/material/Card';
import Mobile from './Mobile';
import { axiosInstance } from '../config';


const InputCustom = styled(InputBase)`
background: #fff;
margin-top: 8px;
margin-bottom: 14px;
border: 1px solid ;
padding-left: 20px;
@media only screen and (max-width: 430px) {
}
`

const ErrorDiv = styled('p')`
  padding: 5px;
  background: #fefefe;
  border: 1px solid red;
  color: red;
  border-radius: 4px;
  margin: 16px 0;
`
const CustLabel = styled(FormLabel)`
color: #111;
@media only screen and (max-width: 430px) {
color: #fff !important;
}
`
const H4 = styled('h4')`
@media only screen and (max-width: 430px) {
    color: #fff;
}
`


const WorkoutForm = ({ url }) => {

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');

    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleForm = async (e) => {
        e.preventDefault();

        // check if user login, if not login, rest to the function wont run
        // if user login sent the Bearer token with the api call.
        if (!user) {
            setError('You must be logged in')
            return
        }

        // create new workout
        try {
            const workoutData = { title, load, reps }
            const config = {
                headers: {
                    "content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
            };

            const res = await axiosInstance.post(`/workouts`,
                workoutData,
                config,
            )
            const json = await res.data
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
            // console.log(response);
            setTitle('')
            setLoad('')
            setReps('')
            console.log('new workout added');
        } catch (err) {
            // console.log(err);
            setError(`error: ${err.response.data.err}`)
        }
    }

    return (
        <>
            <Card sx={{
                display: { xs: 'none', sm: 'block' },
                maxWidth: {
                    sm: 300
                },
                maxHeight: { xs: 400, sm: 400 },
                m: 1,
                background: { sm: '#ece7e8' },
                opacity: '0.9',
            }} >
                <Box component="form" onSubmit={handleForm}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10px 5px',

                    }}>

                    <H4>Add New Workout </H4>

                    <FormControl sx={{ color: '#d6c5c2', m: '20px' }}>

                        <CustLabel>Exercise Title:</CustLabel>
                        <InputCustom
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />

                        <CustLabel>Load (in kg):</CustLabel>
                        <InputCustom type='number'
                            onChange={(e) => setLoad(e.target.value)}
                            value={load}
                        />

                        <CustLabel>Reps:</CustLabel>
                        <InputCustom type='number'
                            onChange={(e) => setReps(e.target.value)}
                            value={reps}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            type='submit'
                        >
                            Add
                        </Button>

                    </FormControl >
                    {error && <ErrorDiv>{error}</ErrorDiv>}
                </Box >

            </Card >
            <Mobile
                handleForm={handleForm}
                setTitle={setTitle}
                title={title}
                load={load}
                reps={reps}
                setLoad={setLoad}
                setReps={setReps}
                error
                url={url}
            />
        </>
    )
}

export default WorkoutForm