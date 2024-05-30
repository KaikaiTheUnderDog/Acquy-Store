import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CardHeader from '@/components/cardHeader';
import {
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Stack,
	Box,
} from '@mui/material';
import { allOrders, clearErrors, deleteOrder } from '@/store/redux/actions/adminActions';
import { enqueueSnackbar } from 'notistack';
import { DELETE_ORDER_RESET } from '@/store/redux/constants/adminConstants';
import { Loader3 } from '@/components/loader';

const headCells = [
	{
		id: '_id',
		numeric: false,
		disablePadding: false,
		label: 'Id',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'Status',
	},
	{
		id: 'totalPrice',
		numeric: true,
		disablePadding: false,
		label: 'Total Price',
	},
	{
		id: 'createdAt',
		numeric: true,
		disablePadding: false,
		label: 'Created At',
	},
	{
		id: 'actions',
		numeric: false,
		disablePadding: false,
		label: 'Actions',
	},
];

function OrderTable({ props, searchQuery }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { orders = [], error } = useSelector((state) => state.allOrders);
	const { loading, isDeleted } = useSelector((state) => state.order);

	const [open, setOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	useEffect(() => {
		dispatch(allOrders());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			enqueueSnackbar(error, { variant: 'muiSnackbar', severity: 'error' });
		}
		if (isDeleted) {
			dispatch(allOrders());
			dispatch({ type: DELETE_ORDER_RESET });
		}
	}, [error, isDeleted, dispatch, enqueueSnackbar]);

	const handleDeleteClick = (orderId) => {
		setSelectedOrder(orderId);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedOrder(null);
	};

	const handleConfirmDelete = () => {
		dispatch(deleteOrder(selectedOrder));
		setOpen(false);
		setSelectedOrder(null);
	};

	const filteredOrders = orders.filter((order) => order._id.toLowerCase().includes(searchQuery.toLowerCase()));

	if (loading) {
		return <Loader3 />;
	}

	return (
		<Card component="section" type="section">
			<CardHeader title="Orders Overview" subtitle="Manage your orders." />
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
					<TableHead>
						<TableRow>
							{headCells.map((headCell) => (
								<TableCell
									key={headCell.id}
									align={headCell.numeric ? 'right' : 'left'}
									padding={headCell.disablePadding ? 'none' : 'normal'}
									sortDirection={false}
								>
									<TableSortLabel>{headCell.label}</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredOrders.map((row) => (
							<TableRow hover tabIndex={-1} key={row._id}>
								<TableCell>{row._id}</TableCell>
								<TableCell>
									<Stack direction="row" alignItems="center" spacing={1}>
										<Box
											component="span"
											width={8}
											height={8}
											bgcolor={
												row.orderStatus === 'Pending'
													? 'secondary.main'
													: row.orderStatus === 'Shipping'
														? 'info.main'
														: row.orderStatus === 'Delivered'
															? 'success.main'
															: 'primary.main'
											}
											borderRadius="50%"
										/>
										<Typography variant="caption" color="text.tertiary">
											{row.orderStatus}
										</Typography>
									</Stack>
								</TableCell>
								<TableCell align="right">${row.totalPrice}</TableCell>
								<TableCell align="right">
									{new Date(row.createdAt).toLocaleDateString('vi-VN')}
								</TableCell>
								<TableCell align="left">
									<Tooltip title="Update Order" arrow>
										<IconButton
											aria-label="edit"
											color="warning"
											size="small"
											onClick={() => navigate(`/admin/order/${row._id}`)}
										>
											<ModeEditOutlineOutlinedIcon fontSize="medium" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete Order" arrow>
										<IconButton
											aria-label="delete"
											color="error"
											size="small"
											onClick={() => handleDeleteClick(row._id)}
										>
											<DeleteOutlineOutlinedIcon fontSize="medium" />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to delete this order?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined">
						Cancel
					</Button>
					<Button onClick={handleConfirmDelete} variant="contained" color="error">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
}

export default OrderTable;
