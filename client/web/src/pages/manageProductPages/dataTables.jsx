import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CardHeader from '@/components/cardHeader';
import DataTable from '@/components/dataTable';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { getAdminProducts } from '@/store/redux/actions/adminActions';
import { enqueueSnackbar } from 'notistack';

const getHeadCells = [
	{
		id: '_id',
		numeric: false,
		disablePadding: false,
		label: 'Id',
	},
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Name',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Price',
	},
	{
		id: 'sold',
		numeric: true,
		disablePadding: false,
		label: 'Sold',
	},
	{
		id: 'stock',
		numeric: true,
		disablePadding: false,
		label: 'Stock',
	},
	{
		id: 'actions',
		numeric: false,
		disablePadding: false,
		label: 'Actions',
	},
];

function ProductTable({ props }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { products, error } = useSelector((state) => state.products);

	const [open, setOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	useEffect(() => {
		dispatch(getAdminProducts());
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			enqueueSnackbar(error, { variant: 'muiSnackbar', severity: 'error' });
		}
	}, [error, dispatch, enqueueSnackbar]);

	const handleDeleteClick = (productId) => {
		setSelectedProduct(productId);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedProduct(null);
	};

	const handleConfirmDelete = () => {
		setOpen(false);
		setSelectedProduct(null);
	};

	return (
		<Card component="section" type="section">
			<CardHeader title="Products Overview" subtitle="Manage your products." />
			<DataTable
				headCells={getHeadCells}
				rows={products || []} // Ensure rows is always an array
				emptyRowsHeight={{ default: 66.8, dense: 46.8 }}
				render={(row) => (
					<TableRow hover tabIndex={-1} key={row._id}>
						<TableCell>{row._id}</TableCell>
						<TableCell>{row.name}</TableCell>
						<TableCell align="right">${row.price}</TableCell>
						<TableCell align="right">{row.sold}</TableCell>
						<TableCell align="right">{row.stock}</TableCell>
						<TableCell align="left">
							<Tooltip title="Update Product" arrow>
								<IconButton
									aria-label="edit"
									color="warning"
									size="small"
									sx={{ fontSize: 2 }}
									onClick={() => navigate(`/admin/product/${row._id}`)}
								>
									<ModeEditOutlineOutlinedIcon fontSize="medium" />
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete Product" arrow>
								<IconButton
									aria-label="delete"
									color="error"
									size="small"
									sx={{ fontSize: 2 }}
									onClick={() => handleDeleteClick(row._id)}
								>
									<DeleteOutlineOutlinedIcon fontSize="medium" />
								</IconButton>
							</Tooltip>
						</TableCell>
					</TableRow>
				)}
				{...props}
			/>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to delete this product?</DialogContentText>
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

export default ProductTable;
