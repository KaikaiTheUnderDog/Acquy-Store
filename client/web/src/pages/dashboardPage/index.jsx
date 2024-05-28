import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import PageHeader from '@/components/pageHeader';

import SalesOverviewCard from './salesCard';
import StatsSection from './statsSection';
import ProductsSection from './productsSection';
import CustomersOverviewCard from './customerCard';
import MostVisitedCard from './mostVisitedCard';
import OrdersProgressCard from './ordersProgressCard';

function Dashboard() {
	return (
		<>
			<PageHeader title="Dashboard">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="#!">
						Admin
					</Link>
					<Typography color="text.tertiary">Dashboard</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12}>
					<StatsSection />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<MostVisitedCard />
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<CustomersOverviewCard />
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<OrdersProgressCard />
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<ProductsSection />
				</Grid>
				<Grid item xs={12} sm={12} md={12}>
					<SalesOverviewCard />
				</Grid>
			</Grid>
		</>
	);
}

export default Dashboard;
