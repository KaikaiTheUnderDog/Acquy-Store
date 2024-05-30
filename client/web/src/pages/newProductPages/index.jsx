import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
	IconButton,
	CardMedia,
	CardContent,
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import PageHeader from '@/components/pageHeader';
import CardHeader from '@/components/cardHeader';
import { newProduct, clearErrors } from '@/store/redux/actions/adminActions';
import { NEW_PRODUCT_RESET } from '@/store/redux/constants/adminConstants';
import { enqueueSnackbar } from 'notistack';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { Loader3 } from '@/components/loader';

const categories = ['Games', 'Accessories', 'Consoles', 'Merchandises', 'Alternatives'];

const textFieldStyles = {
	label: { color: 'primary.main' },
};

function NewProductPage() {
	const dispatch = useDispatch();
	const { success, error, loading } = useSelector((state) => state.newProduct);

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [stock, setStock] = useState('');
	const [images, setImages] = useState(Array(4).fill(null));
	const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));
	const [open, setOpen] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		if (error) {
			enqueueSnackbar(error, { variant: 'error' });
			dispatch(clearErrors());
		}

		if (success) {
			enqueueSnackbar('Product created successfully', { variant: 'success' });
			dispatch({ type: NEW_PRODUCT_RESET });
			setName('');
			setPrice('');
			setDescription('');
			setCategory('');
			setStock('');
			setImages(Array(4).fill(null));
			setImagePreviews(Array(4).fill(null));
			setValidationErrors({});
		}
	}, [dispatch, error, success]);

	const validateForm = () => {
		const errors = {};
		if (!name) errors.name = 'Product name is required';
		if (!price) errors.price = 'Product price is required';
		if (!description) errors.description = 'Product description is required';
		if (!category) errors.category = 'Product category is required';
		if (!stock) errors.stock = 'Product stock is required';
		if (images.filter((image) => image !== null).length !== 4) errors.images = 'Please select exactly 4 images';
		return errors;
	};

	useEffect(() => {
		const errors = validateForm();
		setValidationErrors(errors);
		setIsFormValid(Object.keys(errors).length === 0);
	}, [name, price, description, category, stock, images]);

	const handleSingleImageChange = (index, file) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				const newImages = [...images];
				const newImagePreviews = [...imagePreviews];
				newImages[index] = reader.result;
				newImagePreviews[index] = reader.result;
				setImages(newImages);
				setImagePreviews(newImagePreviews);
			}
		};

		reader.readAsDataURL(file);
	};

	const handleImageDelete = (index) => {
		const newImages = [...images];
		const newImagePreviews = [...imagePreviews];
		newImages[index] = null;
		newImagePreviews[index] = null;
		setImages(newImages);
		setImagePreviews(newImagePreviews);
	};

	const handleCreateClick = () => {
		if (isFormValid) {
			setOpen(true);
		} else {
			enqueueSnackbar('Please fix the validation errors', { variant: 'error' });
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirmCreate = () => {
		const formData = new FormData();
		formData.set('name', name);
		formData.set('price', price);
		formData.set('description', description);
		formData.set('category', category);
		formData.set('stock', stock);
		images.forEach((image, index) => {
			formData.append(`images[${index}]`, image);
		});

		dispatch(newProduct(formData));
		setOpen(false);
	};

	if (loading) {
		return <Loader3 />;
	}

	return (
		<>
			<PageHeader title="New Product">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/admin/dashboard">
						Admin
					</Link>
					<Link underline="hover" href="/admin/products">
						Products
					</Link>
					<Typography color="text.tertiary">New</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Box display="flex" justifyContent="center">
				<Grid container spacing={3} maxWidth="md">
					<Grid item xs={12}>
						<Stack spacing={2}>
							<Card type="section" sx={{ width: '100%' }}>
								<CardHeader
									title="Product Details"
									subtitle="Includes name, price, category, and stock."
								/>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											value={name}
											onChange={(e) => setName(e.target.value)}
											label="Product Name"
											variant="outlined"
											fullWidth
											sx={textFieldStyles}
											error={!!validationErrors.name}
											helperText={validationErrors.name}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											label="Product Price"
											variant="outlined"
											fullWidth
											sx={textFieldStyles}
											error={!!validationErrors.price}
											helperText={validationErrors.price}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											value={stock}
											onChange={(e) => setStock(e.target.value)}
											label="Product Stock"
											variant="outlined"
											fullWidth
											sx={textFieldStyles}
											error={!!validationErrors.stock}
											helperText={validationErrors.stock}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											label="Product Description"
											variant="outlined"
											fullWidth
											multiline
											rows={4}
											sx={textFieldStyles}
											error={!!validationErrors.description}
											helperText={validationErrors.description}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											value={category}
											onChange={(e) => setCategory(e.target.value)}
											label="Product Category"
											variant="outlined"
											fullWidth
											select
											sx={textFieldStyles}
											error={!!validationErrors.category}
											helperText={validationErrors.category}
										>
											{categories.map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</TextField>
									</Grid>
								</Grid>
							</Card>
							<Card type="section" sx={{ width: '100%' }}>
								<CardHeader title="Product Images" subtitle="Upload exactly 4 images." />
								<CardContent>
									{validationErrors.images && (
										<Typography color="error">{validationErrors.images}</Typography>
									)}
									<Grid container spacing={2}>
										{imagePreviews.map((image, index) => (
											<Grid item xs={index === 0 ? 12 : 4} key={index}>
												<Box
													sx={{
														position: 'relative',
														height: index === 0 ? 'auto' : 140,
														border: '1px dashed gray',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														cursor: 'pointer',
													}}
													onClick={() => document.getElementById(`fileInput${index}`).click()}
												>
													{image ? (
														<Card sx={{ height: '100%' }}>
															<CardMedia
																component="img"
																image={image}
																alt={`Product Image ${index + 1}`}
																sx={{ height: '100%' }}
															/>
															<IconButton
																size="small"
																color="error"
																sx={{ position: 'absolute', top: 5, right: 5 }}
																onClick={(e) => {
																	e.stopPropagation();
																	handleImageDelete(index);
																}}
															>
																<DeleteIcon />
															</IconButton>
														</Card>
													) : (
														<>
															<ImageIcon fontSize="large" />
															<Typography>Select Image</Typography>
														</>
													)}
													<input
														type="file"
														id={`fileInput${index}`}
														style={{ display: 'none' }}
														accept="image/*"
														onChange={(e) =>
															handleSingleImageChange(index, e.target.files[0])
														}
													/>
												</Box>
											</Grid>
										))}
									</Grid>
								</CardContent>
							</Card>
							<Button variant="contained" color="primary" fullWidth onClick={handleCreateClick}>
								Create Product
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirm Create</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to create this product?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined">
						Cancel
					</Button>
					<Button onClick={handleConfirmCreate} variant="contained" color="error">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default NewProductPage;
