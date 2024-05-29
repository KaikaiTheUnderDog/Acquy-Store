import { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ScrollToTopOnRouteChange from '@hocs/withScrollTopOnRouteChange';
import withLazyLoadably from '@hocs/withLazyLoadably';

import MinimalLayout from '@/components/layouts/minimalLayout';
import MainLayout from '@/components/layouts/mainLayout';

import Page404 from '@/pages/errorPages/404';
import ProtectedRoute from './ProtectedRoute';
import store from '../../store/redux/store';
import { loadUser } from '../../store/redux/actions/userActions';
import UpdateOrderPage from '@/pages/updateOrderPages';
import UpdateProductPage from '@/pages/updateProductPages';
import { Loader1 } from '@/components/loader';
import NewProductPage from '@/pages/newProductPages';

const LoginPage = withLazyLoadably(lazy(() => import('@/pages/loginPages/login')));

const DashboardPage = withLazyLoadably(lazy(() => import('@/pages/dashboardPage')));
const ManageOrderPage = withLazyLoadably(lazy(() => import('@/pages/manageOrderPages')));
const ManageProductPage = withLazyLoadably(lazy(() => import('@/pages/manageProductPages')));

const Page403 = withLazyLoadably(lazy(() => import('@/pages/errorPages/403')));
const Page500 = withLazyLoadably(lazy(() => import('@/pages/errorPages/500')));
const Page503 = withLazyLoadably(lazy(() => import('@/pages/errorPages/503')));
const Page505 = withLazyLoadably(lazy(() => import('@/pages/errorPages/505')));

function Router() {
	const dispatch = useDispatch();

	const { isAuthenticated } = useSelector((state) => state.theme);

	useEffect(() => {
		console.log(isAuthenticated);
		if (isAuthenticated) dispatch(loadUser());
	}, []);

	return (
		<BrowserRouter basename="/ryzel">
			<ScrollToTopOnRouteChange>
				<Routes>
					<Route path="/" element={<MinimalLayout />}>
						<Route path="login" element={<LoginPage />} />
					</Route>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Navigate to="/admin/dashboard" />} />
						<Route path="admin/">
							<Route
								path="dashboard"
								element={
									<ProtectedRoute isAdmin>
										<DashboardPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="orders"
								element={
									<ProtectedRoute isAdmin>
										<ManageOrderPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="products"
								element={
									<ProtectedRoute isAdmin>
										<ManageProductPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="products/new"
								element={
									<ProtectedRoute isAdmin>
										<NewProductPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="order/:id"
								element={
									<ProtectedRoute isAdmin>
										<UpdateOrderPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="product/:id"
								element={
									<ProtectedRoute isAdmin>
										<UpdateProductPage />
									</ProtectedRoute>
								}
							/>
						</Route>
						<Route path="error/">
							<Route path="404" element={<Page404 />} />
							<Route path="403" element={<Page403 />} />
							<Route path="500" element={<Page500 />} />
							<Route path="503" element={<Page503 />} />
							<Route path="505" element={<Page505 />} />
						</Route>
					</Route>

					<Route path="*" element={<Page404 />} />
				</Routes>
			</ScrollToTopOnRouteChange>
		</BrowserRouter>
	);
}

export default Router;
