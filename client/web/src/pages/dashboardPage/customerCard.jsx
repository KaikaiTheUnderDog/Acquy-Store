import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import getDefaultChartsColors from '@helpers/getDefaultChartsColors';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CardHeader from '@/components/cardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUserCountData } from '@/store/redux/actions/adminActions';
import { enqueueSnackbar } from 'notistack';

function CustomersOverviewCard() {
	const [viewBy, setViewBy] = useState('day');

	const changeTab = (tabKey) => {
		setViewBy(tabKey);
	};

	return (
		<Card>
			<CardHeader title="Customer Overview" size="small">
				<ButtonGroup variant="outlined" size="small" aria-label="temporaly button group">
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
			<CustomersChart activeView={viewBy} />
		</Card>
	);
}

function TabButton({ children, tabKey, changeTab, activeView }) {
	return (
		<Button
			onClick={() => changeTab(tabKey)}
			disableElevation
			variant={activeView === tabKey ? 'contained' : 'outlined'}
		>
			{children}
		</Button>
	);
}

function getCustomerGraphConfig(config) {
	return {
		options: {
			colors: getDefaultChartsColors(config?.mode === 'dark' ? 3 : 1),
			fill: {
				opacity: 0.6,
				type: 'solid',
			},
			...(config?.mode === 'dark' && {
				tooltip: {
					theme: 'dark',
				},
			}),
			chart: {
				...(config?.mode === 'dark' && { foreColor: '#fff' }),
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
				parentHeightOffset: 0,
			},
			stroke: {
				width: 0,
				curve: 'straight',
			},
			dataLabels: {
				enabled: false,
			},
			yaxis: {
				seriesName: 'customers quantity',
				min: 0,
				max: 100,
				tickAmount: 4,
				decimalsInFloat: 1,
			},
			grid: {
				xaxis: {
					lines: {
						show: true,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},
			},
			legend: {
				show: true,
				position: 'bottom',
				floating: true,
				offsetY: 20,
			},
		},
		series: {
			day: [],
			week: [],
			month: [],
		},
	};
}

function CustomersChart({ activeView }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { userCountData, error } = useSelector((state) => state.dashboard);

	const [verifiedNewUserData, setVerifiedNewUserData] = useState([]);
	const [unverifiedNewUserData, setUnverifiedNewUserData] = useState([]);

	useEffect(() => {
		dispatch(getUserCountData());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			enqueueSnackbar(error, { variant: 'muiSnackbar', severity: 'error' });
			dispatch(clearErrors(error));
		}
		if (userCountData) {
			const processUserData = (data, timeUnit) => {
				const timeMapping = {
					day: Array.from({ length: new Date().getDate() }, (_, i) => i + 1),
					week: [2, 3, 4, 5, 6, 7, 1],
					month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				};
				const verifiedDataFiltered = timeMapping[timeUnit].map((time) => {
					const timeData = data.verified.find((d) => d._id.time === time);
					return timeData ? timeData.count : 0;
				});
				const unverifiedDataFiltered = timeMapping[timeUnit].map((time) => {
					const timeData = data.unverified.find((d) => d._id.time === time);
					return timeData ? timeData.count : 0;
				});
				return { verifiedDataFiltered, unverifiedDataFiltered };
			};

			if (activeView === 'day') {
				const { verifiedDataFiltered, unverifiedDataFiltered } = processUserData(
					userCountData.dailyNewUserData,
					'day',
				);
				setVerifiedNewUserData([{ name: 'Verified', data: verifiedDataFiltered }]);
				setUnverifiedNewUserData([{ name: 'Unverified', data: unverifiedDataFiltered }]);
			} else if (activeView === 'week') {
				const { verifiedDataFiltered, unverifiedDataFiltered } = processUserData(
					userCountData.weeklyNewUserData,
					'week',
				);
				setVerifiedNewUserData([{ name: 'Verified', data: verifiedDataFiltered }]);
				setUnverifiedNewUserData([{ name: 'Unverified', data: unverifiedDataFiltered }]);
			} else if (activeView === 'month') {
				const { verifiedDataFiltered, unverifiedDataFiltered } = processUserData(
					userCountData.monthlyNewUserData,
					'month',
				);
				setVerifiedNewUserData([{ name: 'Verified', data: verifiedDataFiltered }]);
				setUnverifiedNewUserData([{ name: 'Unverified', data: unverifiedDataFiltered }]);
			}
		}
	}, [error, userCountData, activeView]);

	return (
		<Box
			component={Chart}
			options={getCustomerGraphConfig({ mode: theme.palette.mode })?.options}
			series={verifiedNewUserData.concat(unverifiedNewUserData)}
			type="area"
			width="100%"
			ml={-1}
		/>
	);
}

export default CustomersOverviewCard;
