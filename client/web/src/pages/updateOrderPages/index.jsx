import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
	Button,
	Card,
	Grid,
	MenuItem,
	TextField,
	Typography,
	Breadcrumbs,
	Link,
	Stack,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import { getOrderDetails } from '@/store/redux/actions/orderActions';
import { UPDATE_ORDER_RESET } from '@/store/redux/constants/adminConstants';
import { clearErrors, updateOrder } from '@/store/redux/actions/adminActions';
import { enqueueSnackbar } from 'notistack';

const textFieldStyles = {
	label: { color: 'primary.main' },
};

function UpdateOrderPage() {
	const dispatch = useDispatch();
	const params = useParams();

	const { order, loading } = useSelector((state) => state.orderDetails);
	const { isUpdated, error } = useSelector((state) => state.order);

	const [status, setStatus] = useState('');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		dispatch(getOrderDetails(params.id));
	}, [dispatch, params.id]);

	useEffect(() => {
		if (order) {
			setStatus(order.orderStatus);
		}
	}, [order]);

	useEffect(() => {
		if (isUpdated) {
			dispatch(getOrderDetails(params.id));
			enqueueSnackbar('This order status has been updated successfully.', {
				variant: 'muiSnackbar',
				severity: 'success',
			});

			dispatch({ type: UPDATE_ORDER_RESET });
		}
		if (error) {
			enqueueSnackbar(error, { variant: 'muiSnackbar', severity: 'error' });
			dispatch(clearErrors(error));
		}
	}, [isUpdated, error, dispatch, params.id]);

	const handleUpdateClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirmUpdate = () => {
		dispatch(updateOrder(params.id, { status }));
		setOpen(false);
	};

	return (
		<>
			<PageHeader title="Update Order">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/admin/dashboard">
						Admin
					</Link>
					<Link underline="hover" href="/admin/orders">
						Orders
					</Link>
					<Typography color="text.tertiary">Update</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Stack spacing={2}>
						{order && (
							<Card type="section" sx={{ width: '100%', height: 'auto' }}>
								<CardHeader title="Order Details" subtitle="Includes id and status of order." />
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order && order._id}
											label="Order ID"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											value={status}
											onChange={(e) => setStatus(e.target.value)}
											label="Order Status"
											variant="outlined"
											fullWidth
											select
											sx={textFieldStyles}
										>
											{['Pending', 'Shipping', 'Delivered', 'Cancelled'].map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={12}>
										<Button
											variant="contained"
											color="primary"
											fullWidth
											onClick={handleUpdateClick}
										>
											Update
										</Button>
									</Grid>
									<Grid item xs={6}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order && order.paymentMethod}
											label="Payment Method"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order && new Date(order.createdAt).toLocaleDateString('vi-VN')}
											label="Created At"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
								</Grid>
							</Card>
						)}
						{order && order.paymentInfo && (
							<Card type="section" sx={{ width: '100%', height: 'auto' }}>
								<CardHeader title="Payment Info" subtitle="Includes stripe payment info." />
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.paymentInfo.id}
											label="Payment ID"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.paymentInfo.status}
											label="Payment Status"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
								</Grid>
							</Card>
						)}
						{order && order.shippingInfo && (
							<Card type="section" sx={{ width: '100%', height: 'auto' }}>
								<CardHeader title="Shipping Info" subtitle="Includes shipping details." />
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.shippingInfo.receiver}
											label="Receiver"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.shippingInfo.address}
											label="Address"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.shippingInfo.city}
											label="City"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.shippingInfo.postalCode}
											label="Postal Code"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.shippingInfo.country}
											label="Country"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											InputProps={{
												readOnly: true,
											}}
											value={order.shippingInfo.phoneNo}
											label="Phone Number"
											variant="filled"
											fullWidth
											sx={textFieldStyles}
										/>
									</Grid>
								</Grid>
							</Card>
						)}
					</Stack>
				</Grid>
				<Grid item xs={12} md={6}>
					<Stack spacing={2}>
						<Card type="section" sx={{ width: '100%' }}>
							<CardHeader title="Order Items" subtitle="Includes items in the order." />
							<Grid container spacing={2}>
								{order &&
									order.orderItems &&
									order.orderItems.map((item) => (
										<Grid item xs={12} key={item.product}>
											<Card
												sx={{
													display: 'flex',
													alignItems: 'center',
													padding: 2,
													borderRadius: 2,
													boxShadow: 2,
												}}
											>
												<img
													src={item.image}
													alt={item.name}
													style={{ width: 150, height: 100, marginRight: 16 }}
												/>
												<div>
													<Typography variant="h6" sx={{ marginBottom: 1 }}>
														{item.name}
													</Typography>
													<Typography variant="body2" sx={{ marginBottom: 0.5 }}>
														Quantity: {item.quantity}
													</Typography>
													<Typography variant="body2">Price: ${item.price}</Typography>
												</div>
											</Card>
										</Grid>
									))}
							</Grid>
						</Card>
						<Card type="section" sx={{ width: '100%' }}>
							<CardHeader title="Order Summary" subtitle="Summary of the order prices." />
							<Stack spacing={2} sx={{ padding: 2 }}>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="h6">Item Price:</Typography>
									<Typography variant="h6">${order && order.itemsPrice.toFixed(2)}</Typography>
								</Stack>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="h6">Tax Price:</Typography>
									<Typography variant="h6">${order && order.taxPrice.toFixed(2)}</Typography>
								</Stack>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="h6">Shipping Price:</Typography>
									<Typography variant="h6">${order && order.shippingPrice.toFixed(2)}</Typography>
								</Stack>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="h6">Total Price:</Typography>
									<Typography variant="h6">${order && order.totalPrice.toFixed(2)}</Typography>
								</Stack>
							</Stack>
						</Card>
					</Stack>
				</Grid>
			</Grid>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirm Update</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to update this order&apos;s status?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined">
						Cancel
					</Button>
					<Button onClick={handleConfirmUpdate} variant="contained" color="error">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default UpdateOrderPage;
