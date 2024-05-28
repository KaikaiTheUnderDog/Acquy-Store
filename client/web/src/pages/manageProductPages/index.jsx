// MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import PageHeader from '@/components/pageHeader';
import ProductTable from './dataTables';

function ManageProductPage() {
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

			<ProductTable props={{ dense: true }} />
		</>
	);
}

export default ManageProductPage;
