import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid2';
import { RegisterMutation } from '../../types.ts';
import { LoadingButton } from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';
import FileInput from '../../UI/FileInput/FileInput.tsx';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { selectRegisterError, selectRegisterLoading } from './usersSlice.ts';
import { googleLogin, register } from './usersThunks.ts';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    avatar: null,
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const registerMutation: RegisterMutation = {
        email: state.email.trim().toLowerCase(),
        password: state.password.trim(),
        confirmPassword: state.confirmPassword.trim(),
        displayName: state.displayName.trim(),
        avatar: state.avatar,
      };
      await dispatch(register(registerMutation)).unwrap();
      navigate('/');
    } catch (e) {
      //toast.error((e as Error).message);
    }
  };
  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: '#2979ff' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3, width: 306 }}>
        <Grid container direction="column" spacing={2}>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              name="email"
              autoComplete="new-email"
              value={state.email}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('email'))}
              helperText={getFieldError('email')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              autoComplete="new-password"
              value={state.confirmPassword}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('confirmPassword'))}
              helperText={getFieldError('confirmPassword')}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              label="Display name"
              name="displayName"
              autoComplete="new-displayName"
              value={state.displayName}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('displayName'))}
              helperText={getFieldError('displayName')}
            />
          </Grid>
          <Grid size={12}>
            <FileInput label="Avatar" name="avatar" onChange={fileInputChangeHandler} required={true} />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <span>Sign up</span>
        </LoadingButton>
        <Link component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </Link>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography component="h6" variant="h6" sx={{ my: 1, textAlign: 'center' }}>
          or:
        </Typography>
        <GoogleLogin
          onSuccess={googleLoginHandler}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </Box>
    </Box>
  );
};

export default Register;
