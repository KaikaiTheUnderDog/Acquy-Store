// MUI
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// assets
import logo from '@/assets/images/logo/png/logo.png';

function Footer() {
	return (
		<Box bgcolor={(theme) => theme.palette.background.paper} py={3} borderTop={1} borderColor="cuaternary.300">
			<Container maxWidth="lg" component={Stack} direction="column" spacing={5}>
				<Grid container spacing={3} alignContent="center" justifyContent="center" alignItems="center">
					<Grid item xs={12} sm={6} md={4}>
						<Box component="img" src={logo} alt="slim logo" width="90%" />
					</Grid>
					<Grid item xs={12} sm={6} md={5}>
						<Typography variant="h6" my={1}>
							NEWSLETTER
						</Typography>
						<form>
							<TextField
								size="small"
								margin="dense"
								InputProps={{
									name: 'email',
									endAdornment: (
										<InputAdornment position="end">
											<Button type="submit" variant="contained" disableElevation>
												Suscribe
											</Button>
										</InputAdornment>
									),
									sx: {
										pr: 0,
									},
								}}
								placeholder="Email"
								variant="outlined"
								fullWidth
							/>
						</form>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1} alignItems="center" direction="column">
							<Typography variant="h6">FOLLOW US ON</Typography>
							<Stack direction="row" spacing={1}>
								<Link
									href="https://www.facebook.com/weepui.bh/"
									target="_blank"
									rel="noreferrer noopener"
								>
									<IconButton aria-label="network" color="primary">
										<FacebookIcon />
									</IconButton>
								</Link>
								<Link href="https://x.com/weepui_it" target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="network" color="primary">
										<TwitterIcon />
									</IconButton>
								</Link>
								<Link
									href="https://www.youtube.com/channel/UCYYoU1WD5Xhgz_4iOEG2TXQ"
									target="_blank"
									rel="noreferrer noopener"
								>
									<IconButton aria-label="network" color="primary">
										<YouTubeIcon />
									</IconButton>
								</Link>
								<Link href="https://github.com/WeePui" target="_blank" rel="noreferrer noopener">
									<IconButton aria-label="network" color="primary">
										<GitHubIcon />
									</IconButton>
								</Link>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								CONTACTS
							</Typography>
							<ContactLink Icon={LocalPhoneOutlinedIcon} text="+84 912 823 283" />
							<ContactLink Icon={EmailOutlinedIcon} text="bhtcag@gmail.com" />
							<ContactLink
								Icon={LocationOnOutlinedIcon}
								text="1 Vo Van Ngan, Thu Duc, Ho Chi Minh City, Vietnam"
							/>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								TERMS OF USE
							</Typography>
							<FooterLink text="Notice of Privacy" />
							<FooterLink text="Terms and Conditions" />
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Stack spacing={1}>
							<Typography variant="h6" my={1}>
								FAQ
							</Typography>
							<FooterLink text="No use of clickable text 1 ?" />
							<FooterLink text="No use of clickable text 2 ?" />
							<FooterLink text="No use of clickable text 3 ?" />
						</Stack>
					</Grid>
				</Grid>

				<Divider
					variant="middle"
					sx={{
						bgcolor: (theme) => theme.palette.secondary.main,
					}}
				/>
				<Stack direction={{ lg: 'row' }} justifyContent="space-between" alignItems="center" flexWrap="wrap">
					<Typography variant="body1" textAlign="center">
						Copyright 2024 © All Rights Reserved. Ryzel Store
					</Typography>
					<Typography variant="subtitle1" textAlign="center">
						💻 - Built by{' '}
						<Link
							underline="hover"
							sx={{
								cursor: 'pointer',
							}}
							href="https://www.facebook.com/weepui.bh/"
							target="_blank"
							rel="noreferrer noopener"
							fontWeight="medium"
							color="red"
						>
							@Huy Bui
						</Link>{' '}
						with ❤️
						{/* Built by antonio ayola and contributors */}
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}

function ContactLink({ Icon, text }) {
	return (
		<Stack spacing={1} alignItems="center" direction="row">
			<Icon
				color="primary"
				sx={{
					mr: 3,
				}}
			/>
			<Typography variant="body1">{text}</Typography>
		</Stack>
	);
}

function FooterLink({ text }) {
	return (
		<Link
			variant="body2"
			fontWeight="300"
			href="#!"
			underline="hover"
			sx={{
				color: 'text.primary',
				'&:hover': {
					'& svg': {
						opacity: '1',
						ml: 2,
					},
				},
				'&::before': {
					content: '""',
					display: 'inline-block',
					borderRadius: '50%',
					bgcolor: 'primary.main',
					width: '4px',
					height: '4px',
					mb: '2px',
					mr: 2,
				},
			}}
		>
			{/* <span style={{ marginRight: '15px' }}>•</span> */}
			{text}
			<ArrowForwardIosIcon
				color="primary"
				sx={{
					transition: '0.3s',
					fontSize: '11px',
					ml: 0,
					opacity: '0',
				}}
			/>
		</Link>
	);
}

export default Footer;
