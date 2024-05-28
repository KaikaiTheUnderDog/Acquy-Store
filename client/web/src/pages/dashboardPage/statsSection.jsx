import useAutoCounter from '@hooks/useAutoCounter';
import { Loader1 } from '@/components/loader';
// MUI
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, getDashboardData } from '@/store/redux/actions/adminActions';
import { useEffect, useState, useMemo } from 'react';
import { enqueueSnackbar } from 'notistack';

function StatsSection() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { dashboardData, loading, error } = useSelector((state) => state.dashboard);

	const [sales, setSales] = useState(0);
	const [userCount, setUserCount] = useState(0);
	const [productCount, setProductCount] = useState(0);
	const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);

	useEffect(() => {
		dispatch(getDashboardData());
	}, [dispatch]);

	useEffect(() => {
		if (dashboardData) {
			setSales(dashboardData.sales.totalSales);
			setUserCount(dashboardData.userCount);
			setProductCount(dashboardData.productCount);

			// eslint-disable-next-line no-underscore-dangle
			const deliveredOrders = dashboardData.orders.byStatus.find((status) => status._id === 'Delivered');
			setDeliveredOrdersCount(deliveredOrders ? deliveredOrders.count : 0);
		}
		if (error) {
			enqueueSnackbar(error, { variant: 'muiSnackbar', severity: 'error' });
			dispatch(clearErrors(error));
		}
	}, [dashboardData, error, dispatch]);

	if (loading) {
		return <Loader1 color="primary.main" />;
	}

	return (
		<section>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={3}>
					<StatSection
						statData={{
							name: 'Total sales',
							total: sales,
							color: 'success.main',
							Icon: AttachMoneyOutlinedIcon,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatSection
						statData={{
							name: 'Total products',
							total: productCount,
							color: 'cuaternary.main',
							Icon: SellOutlinedIcon,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatSection
						statData={{
							name: 'Total users',
							total: userCount,
							color: 'tertiary.400',
							Icon: AccountBoxOutlinedIcon,
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<StatSection
						statData={{
							name: 'Total delivered orders',
							total: deliveredOrdersCount,
							color: 'secondary.main',
							Icon: InventoryOutlinedIcon,
						}}
					/>
				</Grid>
			</Grid>
		</section>
	);
}

function StatSection({ statData }) {
	const { color, Icon, name, total } = statData;

	const counter = useAutoCounter({
		limiter: total,
		increment: 500,
		interval: 10,
	});

	return (
		<Card>
			<Stack direction="row" spacing={1} alignItems="center">
				<Icon
					sx={{
						fontSize: 70,
						color,
					}}
					color="disabled"
				/>
				<span>
					<Typography fontSize={30} variant="subtitle1">
						{counter.toLocaleString()}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{name}
					</Typography>
				</span>
			</Stack>
		</Card>
	);
}

export default StatsSection;
