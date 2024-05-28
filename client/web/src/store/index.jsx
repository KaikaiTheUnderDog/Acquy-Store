import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import store from './redux/store';

function Provider({ children }) {
	return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

export { useSelector, useDispatch };
export default Provider;
