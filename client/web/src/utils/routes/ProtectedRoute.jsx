import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ isAdmin, children, ...rest }) {
	const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

	if (loading) return <div>Loading...</div>;

	if (!isAuthenticated) return <Navigate to="/login" />;

	if (isAdmin && user.role !== 'admin') {
		return <Navigate to="/login" />;
	}

	return children || <Outlet />;
}

export default ProtectedRoute;
