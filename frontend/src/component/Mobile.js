import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import { Box, styled } from '@mui/material';
import { useWorkoutsContext } from '../Hooks/useWorkoutContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import { axiosInstance } from '../config';
import SearchIcon from '@mui/icons-material/Search';


import FormLabel from "@material-ui/core/FormLabel";
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';


const InputCustom = styled(InputBase)`
background: #fff;
width: 250px;
margin-top: 8px;
margin-bottom: 14px;
border: 1px solid ;
@media only screen and (max-width: 430px) {
padding-left: 20px;
}
`

const CustLabel = styled(FormLabel)`
color: #111;
@media only screen and(max-width: 430px) {
    color: #fff!important;
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    '&:hover': {
        backgroundColor: '#fff',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const FormDialog = ({ url }) => {

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);



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
            setTitle('')
            setLoad('')
            setReps('')
            setError('')
        } catch (err) {
            setError(`error: ${err.response.data.err}`)
        }
    }

    return (
        <Box>
            {/* add search input filter in future  */}
            {/* <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                // onChange={(e) => filterList(e)}
                />
            </Search> */}
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
                sx={{
                    display: { xs: 'block', sm: 'none' }
                }}
            >
                Add Workout
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}

            >
                <DialogTitle>Add Exercise</DialogTitle>
                <DialogContent >
                    <Box
                        component="form"
                        onSubmit={handleForm}
                    >
                        <FormControl >
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
                            {error && <ErrorDiv>{error}</ErrorDiv>}
                        </FormControl >
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
export default FormDialog