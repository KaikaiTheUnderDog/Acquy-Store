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
import { updateProduct, clearErrors } from '@/store/redux/actions/adminActions';
import { getProductDetails } from '@/store/redux/actions/productActions';
import { UPDATE_PRODUCT_RESET } from '@/store/redux/constants/adminConstants';
import { enqueueSnackbar } from 'notistack';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

const categories = ['Games', 'Accessories', 'Consoles', 'Merchandises', 'Alternatives'];

const textFieldStyles = {
	label: { color: 'primary.main' },
};

function UpdateProductPage() {
	const dispatch = useDispatch();
	const params = useParams();

	const { product, error } = useSelector((state) => state.productDetails);
	const { isUpdated } = useSelector((state) => state.updateProduct);

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [stock, setStock] = useState('');
	const [images, setImages] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (product && product._id !== params.id) {
			dispatch(getProductDetails(params.id));
		} else {
			setName(product.name);
			setPrice(product.price);
			setDescription(product.description);
			setCategory(product.category);
			setStock(product.stock);
			setImages(product.images);
			setImagePreviews(product.images.map((image) => image.url));
		}

		if (error) {
			enqueueSnackbar(error, { variant: 'error' });
			dispatch(clearErrors());
		}

		if (isUpdated) {
			enqueueSnackbar('Product updated successfully', { variant: 'success' });
			dispatch({ type: UPDATE_PRODUCT_RESET });
			dispatch(getProductDetails(params.id));
		}
	}, [dispatch, error, isUpdated, product, params.id]);

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);

		if (files.length !== 4) {
			enqueueSnackbar('Please select exactly 4 images', { variant: 'error' });
			return;
		}

		const newImages = [];
		const newImagePreviews = [];

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					newImagePreviews.push(reader.result);
					newImages.push({ url: reader.result, public_id: 'new' });
				}
			};

			reader.readAsDataURL(file);
		});

		setImages(newImages);
		setImagePreviews(newImagePreviews);
	};

	const handleSingleImageChange = (index, file) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				const newImages = [...images];
				const newImagePreviews = [...imagePreviews];
				newImages[index] = { url: reader.result, public_id: 'new' };
				newImagePreviews[index] = reader.result;
				setImages(newImages);
				setImagePreviews(newImagePreviews);
			}
		};

		reader.readAsDataURL(file);
	};

	const handleImageDelete = (index) => {
		const newImages = images.filter((_, i) => i !== index);
		const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
		setImages(newImages);
		setImagePreviews(newImagePreviews);
	};

	const handleUpdateClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirmUpdate = () => {
		const formData = new FormData();
		formData.set('name', name);
		formData.set('price', price);
		formData.set('description', description);
		formData.set('category', category);
		formData.set('stock', stock);
		images.forEach((image, index) => {
			formData.append(`images[${index}][url]`, image.url);
			formData.append(`images[${index}][public_id]`, image.public_id);
		});

		dispatch(updateProduct(params.id, formData));
		setOpen(false);
	};

	return (
		<>
			<PageHeader title="Update Product">
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
					<Typography color="text.tertiary">Update</Typography>
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
									<Button
										variant="contained"
										component="label"
										color="primary"
										startIcon={<ImageIcon />}
										sx={{ marginBottom: 2 }}
									>
										Select Images
										<input
											type="file"
											hidden
											accept="image/*"
											multiple
											onChange={handleImageChange}
										/>
									</Button>
									<Grid container spacing={2}>
										{imagePreviews.map((image, index) => (
											<Grid item xs={index === 0 ? 12 : 4} key={index}>
												<Box sx={{ position: 'relative', height: index === 0 ? 'auto' : 140 }}>
													<Card sx={{ height: '100%' }}>
														<CardMedia
															component="img"
															image={image}
															alt={`Product Image ${index + 1}`}
															sx={{ height: '100%' }}
															onClick={() =>
																document.getElementById(`fileInput${index}`).click()
															}
														/>
														<input
															type="file"
															id={`fileInput${index}`}
															style={{ display: 'none' }}
															accept="image/*"
															onChange={(e) =>
																handleSingleImageChange(index, e.target.files[0])
															}
														/>
														<IconButton
															size="small"
															color="error"
															sx={{ position: 'absolute', top: 5, right: 5 }}
															onClick={() => handleImageDelete(index)}
														>
															<DeleteIcon />
														</IconButton>
													</Card>
													<Typography
														variant="caption"
														color="white"
														sx={{
															position: 'absolute',
															top: 5,
															left: 5,
															backgroundColor: 'rgba(0,0,0,0.6)',
															borderRadius: 1,
															padding: '2px 4px',
														}}
													>
														{index === 0 ? 'Main Display Image' : 'Description Image'}
													</Typography>
												</Box>
											</Grid>
										))}
									</Grid>
								</CardContent>
							</Card>
							<Button variant="contained" color="primary" fullWidth onClick={handleUpdateClick}>
								Update Product
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirm Update</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to update this product?</DialogContentText>
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

export default UpdateProductPage;
