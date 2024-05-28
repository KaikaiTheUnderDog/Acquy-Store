import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ isAdmin, children, ...rest }) {
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	if (isAuthenticated === false) return <Navigate to="/login" />;

	if (isAdmin === true && user.role !== 'admin') {
		return <Navigate to="/login" />;
	}

	return children;
}

export default ProtectedRoute;
