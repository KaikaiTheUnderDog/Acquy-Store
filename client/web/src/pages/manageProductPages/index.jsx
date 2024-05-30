import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Link, Typography, Button, TextField } from '@mui/material';
import PageHeader from '@/components/pageHeader';
import ProductTable from './dataTables';

function ManageProductPage() {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<>
			<PageHeader title="Manage Products">
				<Breadcrumbs aria-label="breadcrumb" sx={{ textTransform: 'uppercase' }}>
					<Link underline="hover" href="/admin/dashboard">
						Admin
					</Link>
					<Typography color="text.tertiary">Products</Typography>
				</Breadcrumbs>
			</PageHeader>

			<Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
				<TextField
					label="Search Products"
					variant="outlined"
					value={searchQuery}
					onChange={handleSearchChange}
				/>
				<Button variant="contained" color="primary" onClick={() => navigate('/admin/products/new')}>
					New Product
				</Button>
			</Box>

			<ProductTable searchQuery={searchQuery} />
		</>
	);
}

export default ManageProductPage;
