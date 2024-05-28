import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageHeader from '@/components/pageHeader';
import OrderTable from './dataTables';

function ManageOrderPage() {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<>
			<PageHeader title="Manage Orders">
				<Breadcrumbs
					aria-label="breadcrumb"
					sx={{
						textTransform: 'uppercase',
					}}
				>
					<Link underline="hover" href="/admin/dashboard">
						Admin
					</Link>
					<Typography color="text.tertiary">Orders</Typography>
				</Breadcrumbs>
			</PageHeader>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
				<Box>{/* Additional space for future elements if needed */}</Box>
				<TextField
					variant="outlined"
					placeholder="Search Order by ID"
					value={searchQuery}
					onChange={handleSearchChange}
					style={{ backgroundColor: '#FFFFFF', width: '300px' }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<OrderTable props={{ dense: true }} searchQuery={searchQuery} />
		</>
	);
}

export default ManageOrderPage;
