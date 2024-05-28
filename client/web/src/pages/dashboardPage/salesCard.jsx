import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import Chart from 'react-apexcharts';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';

import CardHeader from '@/components/cardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { clearErrors } from '@/store/redux/actions/adminActions';

function SalesOverviewCard() {
	const [viewBy, setViewBy] = useState('month');

	const changeTab = (tabKey) => {
		setViewBy(tabKey);
	};
	return (
		<Card>
			<CardHeader title="Sales Overview" size="small">
				<ButtonGroup variant="text" size="small" aria-label="temporaly button group">
					<TabButton changeTab={changeTab} tabKey="day" activeView={viewBy}>
						Day
					</TabButton>
					<TabButton changeTab={changeTab} tabKey="week" activeView={viewBy}>
						Week
					</TabButton>
					<TabButton changeTab={changeTab} tabKey="month" activeView={viewBy}>
						Month
					</TabButton>
				</ButtonGroup>
			</CardHeader>
			<Grid container spacing={3}>
				<Grid item xs={12} lg={12} cl={12}>
					<IncomesChart activeView={viewBy} />
				</Grid>
			</Grid>
		</Card>
	);
}
function TabButton({ children, tabKey, changeTab, activeView }) {
	return (
		<Button
			onClick={() => changeTab(tabKey)}
			sx={{
				...(activeView === tabKey && {
					outline: (theme) => `2px solid ${theme.palette.primary.main}`,
				}),
			}}
		>
			{children}
		</Button>
	);
}

const sharedGraphConfig = {
	fill: {
		opacity: 0.6,
		type: 'solid',
	},
	stroke: {
		width: 4,
		curve: 'straight',
	},
	dataLabels: {
		enabled: true,
	},
	yaxis: {
		min: 0,
		max: 1000.0,
		tickAmount: 10,
		decimalsInFloat: 1,
	},
	legend: {
		show: true,
		showForSingleSeries: true,
		offsetY: 20,
	},
};

const getIncomesGraphConfig = (config) => ({
	options: {
		colors: getDefaultChartsColors(2),
		chart: {
			...(config?.mode === 'dark' && { foreColor: '#fff' }),
			id: 'incomes',
			group: 'sales',
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
			parentHeightOffset: 0,
		},
		...(config?.mode === 'dark' && {
			tooltip: {
				theme: 'dark',
			},
		}),
		...sharedGraphConfig,
	},
});

function IncomesChart({ activeView }) {
	const theme = useTheme();
	const dispatch = useDispatch();

	const { dashboardData, error } = useSelector((state) => state.dashboard);

	const [monthlySalesData, setMonthlySalesData] = useState([]);
	const [weeklySalesData, setWeeklySalesData] = useState([]);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		if (error) {
			enqueueSnackbar(error, { variant: 'muiSnackbar', severity: 'error' });
			dispatch(clearErrors(error));
		}

		if (dashboardData) {
			const monthsMapping = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			const monthlySalesDataFiltered = monthsMapping.map((month) => {
				// eslint-disable-next-line no-underscore-dangle
				const monthData = dashboardData.monthlySalesData.find((m) => m._id === month);
				return monthData ? monthData.totalSales : 0;
			});
			setMonthlySalesData([{ name: 'Incomes', data: monthlySalesDataFiltered }]);

			const daysOfWeekMapping = [2, 3, 4, 5, 6, 7, 1];
			const weeklySalesDataFiltered = daysOfWeekMapping.map((day) => {
				// eslint-disable-next-line no-underscore-dangle
				const dayData = dashboardData.weeklySalesData.find((d) => d._id === day);
				return dayData ? dayData.totalSales : 0;
			});
			setWeeklySalesData([{ name: 'Incomes', data: weeklySalesDataFiltered }]);

			const daysOfMonthMapping = Array.from({ length: new Date().getDate() }, (_, i) => i + 1);
			const dailySalesDataFiltered = daysOfMonthMapping.map((day) => {
				// eslint-disable-next-line no-underscore-dangle
				const dayData = dashboardData.dailySalesData.find((d) => d._id === day);
				return dayData ? dayData.totalSales : 0;
			});
			setDailySalesData([{ name: 'Incomes', data: dailySalesDataFiltered }]);
		}
	}, [error, dashboardData]);

	return (
		<Box
			component={Chart}
			options={getIncomesGraphConfig({ mode: theme.palette.mode })?.options}
			series={
				// eslint-disable-next-line no-nested-ternary
				activeView === 'month' ? monthlySalesData : activeView === 'week' ? weeklySalesData : dailySalesData
			}
			type="area"
			width="100%"
		/>
	);
}

export default SalesOverviewCard;
