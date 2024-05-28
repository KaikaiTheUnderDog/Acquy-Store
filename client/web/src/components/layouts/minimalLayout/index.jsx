import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import bgImg from '@/assets/images/minimal_background.png';

function MinimalLayout() {
	return (
		<Box
			component="main"
			minHeight="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{
				backgroundImage: `url(${bgImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backdropFilter: 'blur(500px)',
				/* backgroundImage: (theme) =>
					`linear-gradient(45deg, ${theme.palette.primary[400]}  0%, ${theme.palette.secondary[300]}  33%, ${theme.palette.tertiary[100]}  66%, ${theme.palette.cuaternary.main} 100%)`,
			 */
			}}
		>
			<Outlet />
		</Box>
	);
}

export default MinimalLayout;
