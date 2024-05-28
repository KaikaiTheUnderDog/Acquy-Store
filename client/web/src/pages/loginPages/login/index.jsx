import { enqueueSnackbar } from 'notistack';

import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch, useSelector } from '@/store';

import logo from '@/assets/images/logo/png/logo.png';
import LoginIcon from '@mui/icons-material/Login';
import { clearErrors, login } from '../../../store/redux/actions/userActions';

function LoginPage() {
	return (
		<Container>
			<Card elevation={20} type="none" variant="elevation" sx={{ my: 6 }} hover={false}>
				<Grid
					container
					spacing={0}
					sx={{
						minHeight: 400,
					}}
				>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<Box
							py={8}
							px={{
								xs: 2,
								md: 8,
							}}
							sx={{ display: 'grid', placeItems: 'center', height: '100%' }}
						>
							<Stack direction="column" spacing={5} justifyContent="space-between" height="100%">
								<div>
									<Typography variant="h1" fontWeight="medium">
										Welcome back!
									</Typography>
									<Typography variant="body2" color="textSecondary">
										Sign in to your account to continue
									</Typography>
								</div>

								<LoginForm />
							</Stack>
						</Box>
					</Grid>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<Stack
							bgcolor="primary.main"
							direction="column"
							justifyContent="space-between"
							height="100%"
							width="100%"
							color="primary.light"
							padding="10%"
							spacing={3}
						>
							<Box
								component="img"
								src={logo}
								alt="slim logo"
								sx={{
									mx: 'auto',
									width: { xs: '100%', sm: '60%' },
									objectFit: 'contain',
									alignSelf: 'center',
								}}
							/>

							<Typography variant="body2" color="primary.contrastText">
								We work with clients big and small across a range of sectors and we utilise all forms of
								media to get your name out there in a way that’s right for you. We believe that analysis
								of your company and your customers is key in responding effectively to your promotional
								needs and we will work with you to fully understand your business to achieve the
								greatest amount of publicity possible so that you can see a return from the advertising.
							</Typography>
							<Typography color="primary.light">OR ADDRESS:</Typography>
							<Typography variant="body2" color="primary.contrastText">
								1 Vo Van Ngan, Thu Duc, Ho Chi Minh City, Vietnam
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Card>
		</Container>
	);
}

function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) navigate('/');

		if (error) {
			enqueueSnackbar(error, { variant: 'muiSnackbar', severity: 'error' });
			dispatch(clearErrors(error));
		}
	}, [error, isAuthenticated]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	return (
		<form onSubmit={handleSubmit}>
			<TextField
				autoFocus
				value={email}
				color="primary"
				name="Email"
				label="Email"
				margin="normal"
				variant="outlined"
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
			/>
			<TextField
				value={password}
				color="primary"
				name="password"
				type="password"
				margin="normal"
				label="Password"
				variant="outlined"
				onChange={(e) => setPassword(e.target.value)}
				fullWidth
			/>
			<Link to="/resetPassword" component={RouterLink} color="tertiary.main" style={{ alignSelf: 'flex-end' }}>
				Forgot password?
			</Link>
			<Button
				sx={{
					mt: 2,
					textTransform: 'uppercase',
					color: 'primary.contrastText',
					' &:not(:disabled)': {
						backgroundColor: 'red',
					},
					'&:hover': {
						background: (theme) =>
							`linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.tertiary.dark} 100%)`,
					},
				}}
				type="submit"
				variant="contained"
				disabled={loading}
				style={{ marginTop: 30 }}
				endIcon={
					loading ? (
						<CircularProgress
							color="secondary"
							size={25}
							sx={{
								my: 'auto',
							}}
						/>
					) : (
						<LoginIcon />
					)
				}
				fullWidth
				color="primary"
			>
				Sign In
			</Button>
		</form>
	);
}

export default LoginPage;
