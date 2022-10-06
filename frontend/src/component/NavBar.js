import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useLogout } from '../Hooks/useLogout';
import { useAuthContext } from '../Hooks/useAuthContext';

const NavLink = styled(Link)`
text-decoration: none;
margin-right: 12px;
font-size: 20px;
color: #ece7e8;
:hover {
border-bottom: 1px solid #FFFF00;
}
`
const CustSpan = styled(Button)`
color: #FFFF00;
`
const CustUserName = styled(Button)`
margin-right: 15px;
font-size: 16px;
color:#fff;
@media only screen and (max-width: 430px) {
font-size: 14px;
margin-top: 30px;
padding: 0;
}
`
const H2 = styled('h2')`
color:#fff;
`

const NavBar = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    // update the global state and reset the user to be null & delete user details and token from local storage
    const handleLogout = () => {
        logout()
    }

    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: '#0c0b19', opacity: '0.80' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to='/' >
                                <H2>Workout Tracker</H2>
                            </Link>
                        </Typography>

                        {user && (
                            <Box sx={{
                                display: { xs: 'flex' },
                                alignItems: { xs: 'end' },
                            }}>
                                <CustUserName>{`Hello ${user.name}`}</CustUserName>
                                <CustSpan variant="outlined" onClick={handleLogout}>Logout</CustSpan>
                            </Box>
                        )}

                        {!user && (
                            <Box sx={{ mt: { xs: '30px' } }}>
                                <NavLink to='/login' color="inherit">Login</NavLink>
                                <NavLink to='/signup' color="inherit">Signup</NavLink>
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </header >
    )
}

export default NavBar