import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Chart from 'react-apexcharts';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@/components/cardHeader';
import { getDashboardData } from '@/store/redux/actions/adminActions'; // Adjust this import as necessary

const getCustomerGraphConfig = (config, seriesData) => ({
	options: {
		colors: getDefaultChartsColors(4),
		chart: {
			...(config?.mode === 'dark' && { foreColor: '#fff' }),
			toolbar: {
				show: false,
			},
			parentHeightOffset: 0,
		},
		labels: seriesData.labels,
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'center',
			formatter(seriesName, opts) {
				return `${seriesName} - ${opts.w.globals.series[opts.seriesIndex].toLocaleString()}`;
			},
			fontFamily: 'inherit',
			fontSize: 13,
			markers: {
				width: 15,
				height: 15,
			},
		},
		tooltip: {
			formatter(value) {
				return (+value).toLocaleString();
			},
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							fontFamily: 'inherit',
							fontSize: 13,
						},
						value: {
							formatter(value) {
								return (+value).toLocaleString();
							},
						},
						total: {
							show: true,
						},
					},
				},
			},
		},
	},
	series: seriesData.series,
});

function MostVisitedCard() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { dashboardData } = useSelector((state) => state.dashboard);

	const [seriesData, setSeriesData] = useState({
		labels: ['Vietnam', 'United States', 'Others'],
		series: [0, 0, 0],
	});

	useEffect(() => {
		dispatch(getDashboardData()); // Dispatch the action to fetch dashboard data
	}, [dispatch]);

	useEffect(() => {
		if (dashboardData?.deliveredOrdersByCountry) {
			const updatedSeriesData = {
				labels: ['Vietnam', 'United States', 'Others'],
				series: [
					dashboardData.deliveredOrdersByCountry.vietnam,
					dashboardData.deliveredOrdersByCountry.unitedStates,
					dashboardData.deliveredOrdersByCountry.others,
				],
			};
			setSeriesData(updatedSeriesData);
		}
	}, [dashboardData]);

	return (
		<Card>
			<CardHeader title="Most Visited" size="small" />
			<Box
				color="text.primary"
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				height="300px"
				mb={2}
				mt={2}
			>
				<Chart
					options={getCustomerGraphConfig({ mode: theme.palette.mode }, seriesData)?.options}
					series={seriesData.series}
					type="donut"
					width="100%"
					height="100%"
				/>
			</Box>
		</Card>
	);
}

export default MostVisitedCard;
