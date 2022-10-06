import React, { useState } from 'react';
import { Box, styled } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from '@material-ui/core/InputBase';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { useLogin } from '../Hooks/useLogin';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';


const CustLabel = styled(FormLabel)`
color: #fff !important;
`
const InputCustom = styled(InputBase)`
background-color: #fff;
width: 250px;
margin-top: 10px;
margin-bottom: 14px;
border: 1px solid #000;
border-radius: 10px;
padding-left: 15px;
`
const ErrorDiv = styled('p')`
  padding: 5px;
  background: #fefefe;
  border: 1px solid red;
  color: red;
  border-radius: 4px;
  margin: 12px 0;
  max-width: 250px;
`

const H1 = styled('h1')`
color:#fff;
font-weight: 300;
`

const VisibleDiv = styled('div')`
position: relative;
`

const ShowPasswordImg = styled('img')`
  cursor: pointer;
  position: absolute;
  top: -4%;
  right: 1.5%;
  padding-top: 18px;
  `
const CustLink = styled(Link)`
text-decoration: none;
color: #ddd;
:hover{
    border-bottom: 1px solid #ddd;
}
  `


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { Login, isLoading, error } = useLogin();
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await Login(email, password);
    }


    return (
        <Container sx={{ marginTop: ' 5px' }}>
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    margin: { xs: '60px auto', sm: '0 auto' },
                    alignItems: 'center',
                    width: { xs: 350, sm: 400 },
                    height: 450,
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.8)'
                }}>

                <H1>Login</H1>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                    }}

                >

                    <FormControl>
                        <CustLabel>Email:</CustLabel>
                        <InputCustom
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <CustLabel>Password:</CustLabel>

                        <VisibleDiv>
                            <InputCustom
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <ShowPasswordImg className='showPassword'
                                src={visibilityIcon}
                                alt="show password"
                                onClick={() => setShowPassword((prevState) => !prevState)}
                            />
                        </VisibleDiv>

                        <Button
                            variant="contained"
                            color="success"
                            type='submit'
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                    </FormControl >

                    {error ? <ErrorDiv>{error}</ErrorDiv> : null}

                    <Box sx={{ marginTop: '10px' }}>
                        <CustLink to='/signup' >
                            Sign In Instead &gt;
                        </CustLink>
                    </Box>

                </Box >
            </Box >
        </Container>
    )
}

export default Login

