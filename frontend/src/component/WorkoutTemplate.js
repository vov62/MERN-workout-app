import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { axiosInstance } from '../config';
import { useWorkoutsContext } from '../Hooks/useWorkoutContext';
import { formatDistanceToNow } from 'date-fns';
import { useAuthContext } from '../Hooks/useAuthContext';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';


const WorkoutTemplate = ({ workout, url }) => {

    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    // delete workout
    const deleteWorkout = async () => {

        // check if user login, if not login, rest to the function wont run
        // if user login sent the Bearer token with the api call.
        if (!user) {
            return
        }

        const res = await axiosInstance.delete(`/workouts/${workout._id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await res.data

        console.log('workout deleted', res);
        dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }

    return (
        <>
            <Card sx={{
                display: { xs: 'none', sm: 'block' },
                maxWidth: { xs: 400, sm: 600 },
                height: { xs: 160 },
                m: 1,
                opacity: '0.75',
                textTransform: 'capitalize',

            }}>

                <CardHeader
                    action={
                        <Button size="small" onClick={deleteWorkout}>
                            <DeleteForeverOutlinedIcon />
                        </Button>
                    }
                    title={workout.title}
                />

                <CardContent>
                    <Typography variant="body1" >
                        <strong>Load (kg):</strong> {workout.load}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Reps:</strong> {workout.reps}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatDistanceToNow(
                            new Date(workout.createdAt), { addSuffix: true }
                        )}
                    </Typography>
                </CardContent>
            </ Card >



            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        position: 'relative',
                    }}
                >
                    <Button size="small"
                        onClick={deleteWorkout}
                        sx={{
                            position: 'absolute',
                            top: '8px', right: 0,
                        }}
                    >
                        <DeleteForeverOutlinedIcon />
                    </Button>
                    <Typography
                        mt={1}
                        variant="h5"
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {workout.title}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails

                >
                    <Typography>
                        <strong>Load (kg):</strong> {workout.load}
                    </Typography>
                    <Typography>
                        <strong>Reps:</strong> {workout.reps}
                    </Typography>
                    <Typography>
                        {formatDistanceToNow(
                            new Date(workout.createdAt), { addSuffix: true }
                        )}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )

}

export default WorkoutTemplate