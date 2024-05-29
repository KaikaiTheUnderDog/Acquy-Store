// MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import PageHeader from '@/components/pageHeader';
import ProductTable from './dataTables';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

function ManageProductPage() {
	const navigate = useNavigate();

	return (
		<>
			<PageHeader title="Manage Products">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/admin/dashboard">
						Admin
					</Link>
					<Typography color="text.tertiary">Products</Typography>
				</Breadcrumbs>
			</PageHeader>

			<Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
				<Button variant="contained" color="primary" onClick={() => navigate('/admin/products/new')}>
					New Product
				</Button>
			</Box>

			<ProductTable props={{ dense: true }} />
		</>
	);
}

export default ManageProductPage;
