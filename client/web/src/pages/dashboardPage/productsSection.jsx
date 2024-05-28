import { v4 as uuid } from 'uuid';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import CardHeader from '@/components/cardHeader';

import productsData from '@/_mocks/products';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAdminProducts } from '@/store/redux/actions/adminActions';

function ProductsSection() {
	return (
		<Card type="none">
			<Stack direction="column">
				<CardHeader
					title="Products Overview"
					size="small"
					sx={{
						m: 2,
					}}
				>
					<ButtonGroup variant="outlined" size="small" aria-label="temporaly button group">
						<Button
							variant="contained"
							sx={{
								outline: (theme) => `2px solid ${theme.palette.primary.main}`,
							}}
						>
							This Month
						</Button>
					</ButtonGroup>
				</CardHeader>
				<ProductsTable />
				<Button
					size="small"
					startIcon={<KeyboardArrowDownIcon />}
					sx={{
						m: 1,
					}}
				>
					View All Products
				</Button>
			</Stack>
		</Card>
	);
}

const STATUS_CONFIG = {
	success: {
		color: 'success.main',
	},
	error: {
		color: 'error.main',
	},
	warning: {
		color: 'warning.light',
	},
};

function ProductsTable() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { mostGained } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getAdminProducts());
	}, [dispatch]);

	return (
		<TableContainer>
			<Table aria-label="products purchases table" size="medium">
				<TableHead>
					<TableRow>
						<TableCell>Item</TableCell>
						<TableCell align="left" padding="none" sx={{ minWidth: 140 }}>
							Item Details
						</TableCell>
						<TableCell align="right">Sold</TableCell>
						<TableCell align="left">Gain</TableCell>
						<TableCell align="right">Added</TableCell>
						<TableCell align="center">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{mostGained &&
						mostGained.map((product) => <ProductsTableRow key={product._id} product={product} />)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function ProductsTableRow({ product }) {
	const { sold, stock, createdAt, monthlyGain } = product;

	const stockStatus =
		stock > 20 ? { title: `${stock} remaining`, status: 'success' } : { title: 'Running out', status: 'error' };

	return (
		<TableRow hover>
			<TableCell>
				<img alt="Item Img" src={product?.images[0].url} height={40} />
			</TableCell>
			<TableCell align="left" padding="none">
				<Link
					href="#!"
					variant="subtitle1"
					underline="hover"
					color="text.primary"
					sx={{
						display: 'block',
						'&:hover': {
							color: 'primary.main',
						},
					}}
				>
					{product?.name}
				</Link>
				<Stack direction="row" alignItems="center" spacing={1}>
					<Box
						component="span"
						width={8}
						height={8}
						bgcolor={STATUS_CONFIG[stockStatus?.status]?.color || '#d3d3d3'}
						borderRadius="50%"
					/>
					<Typography variant="caption" color="text.tertiary">
						{stockStatus?.title}
					</Typography>
				</Stack>
			</TableCell>
			<TableCell align="right">
				<Typography variant="body1" color="text.tertiary">
					{sold}
				</Typography>
			</TableCell>
			<TableCell align="left">
				<Typography variant="body1" color="text.tertiary">
					<Typography
						component="span"
						variant="inherit"
						color={`${Math.sign(monthlyGain) === 1 ? 'success.dark' : 'error.main'}`}
					>
						{Math.sign(monthlyGain) === 1 ? (
							<ArrowUpwardIcon fontSize="inherit" />
						) : (
							<ArrowDownwardIcon fontSize="inherit" />
						)}
						&nbsp;
						{monthlyGain.toFixed(2)}
						%&nbsp;
					</Typography>
					from last month
				</Typography>
			</TableCell>
			<TableCell align="right">
				<Typography variant="body1" color="text.tertiary">
					{new Date(createdAt).toLocaleDateString('vi-VN')}
				</Typography>
			</TableCell>
			<TableCell align="center">
				<IconButton size="small">
					<MoreHorizIcon fontSize="small" />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}

export default ProductsSection;
