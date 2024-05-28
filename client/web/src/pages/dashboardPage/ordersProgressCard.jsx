import useAutoCounter from '@hooks/useAutoCounter';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import CardHeader from '@/components/cardHeader';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SALES_PROGRESS_DATA = [
	{
		sale: 43765,
		progress: 70,
		color: 'info',
	},
	{
		sale: 14220,
		progress: 30,
		color: 'error',
	},
	{
		sale: 20220,
		progress: 80,
		color: 'success',
	},
	{
		sale: 24224,
		progress: 50,
		color: 'warning',
	},
	{
		sale: 35224,
		progress: 75,
		color: 'tertiary',
	},
];
function OrdersProgressCard() {
	const { dashboardData } = useSelector((state) => state.dashboard);

	const [pendingOrders, setPendingOrders] = useState([]);
	const [shippingOrders, setShippingOrders] = useState([]);
	const [cancelledOrders, setCancelledOrders] = useState([]);
	const [deliveredOrders, setDeliveredOrders] = useState([]);

	useEffect(() => {
		if (dashboardData) {
			setPendingOrders(dashboardData?.orders?.byStatus?.find((status) => status._id === 'Pending'));
			setShippingOrders(dashboardData?.orders?.byStatus?.find((status) => status._id === 'Shipping'));
			setCancelledOrders(dashboardData?.orders?.byStatus?.find((status) => status._id === 'Cancelled'));
			setDeliveredOrders(dashboardData?.orders?.byStatus?.find((status) => status._id === 'Delivered'));
		}
	}, [dashboardData]);

	return (
		<Card>
			<CardHeader title="Orders Progress" size="small" />
			<Stack spacing={2} mt={2}>
				<OrdersProgress
					saleData={{
						sale: pendingOrders ? pendingOrders.count : 0,
						progress: dashboardData?.orders?.percentages.pending,
						status: 'Pending',
						color: 'warning',
					}}
				/>
				<OrdersProgress
					saleData={{
						sale: shippingOrders ? shippingOrders.count : 0,
						progress: dashboardData?.orders?.percentages.shipping,
						status: 'Shipping',
						color: 'info',
					}}
				/>
				<OrdersProgress
					saleData={{
						sale: deliveredOrders ? deliveredOrders.count : 0,
						progress: dashboardData?.orders?.percentages.delivered,
						status: 'Delivered',
						color: 'success',
					}}
				/>
				<OrdersProgress
					saleData={{
						sale: cancelledOrders ? cancelledOrders.count : 0,
						progress: dashboardData?.orders?.percentages.cancelled,
						status: 'Cancelled',
						color: 'error',
					}}
				/>
				<OrdersProgress
					saleData={{
						sale: dashboardData?.orders?.total || 0,
						progress: '100.00',
						status: 'Total',
						color: 'tertiary',
					}}
				/>
			</Stack>
		</Card>
	);
}

function OrdersProgress({ saleData }) {
	const { progress, color, sale, status } = saleData;
	const counter = useAutoCounter({
		limiter: sale,
		increment: 300,
		interval: 10,
	});
	return (
		<div>
			<Typography variant="body2" color="text.secondary" gutterBottom>
				{counter.toLocaleString()} {status}
			</Typography>
			<LinearProgress
				variant="determinate"
				color={color}
				value={(counter * progress) / sale}
				sx={{
					height: 13,
				}}
			/>
		</div>
	);
}

export default OrdersProgressCard;
