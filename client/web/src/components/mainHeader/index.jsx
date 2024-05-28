import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// assets
import logo from '@/assets/images/logo/png/logo.png';

import LoggedUser from './loggedUser';

function MainHeader() {
	return (
		<Box bgcolor="primary.main" component="header" py={1.5} zIndex={1}>
			<Stack
				component={Container}
				maxWidth="lg"
				direction="row"
				height={50}
				justifyContent="space-between"
				alignItems="center"
				flexWrap="wrap"
				spacing={3}
				overflow="hidden"
			>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Box
						component="img"
						width={{
							xs: 100,
							sm: 150,
						}}
						src={logo}
						alt="logo"
					/>
					<Typography
						component="sub"
						variant="caption"
						color="primary.contrastText"
						fontWeight="bold"
						alignSelf="self-end"
						display={{
							xs: 'none',
							sm: 'block',
						}}
					>
						Ryzel Store
					</Typography>
				</Stack>
				<LoggedUser />
			</Stack>
		</Box>
	);
}

export default MainHeader;
