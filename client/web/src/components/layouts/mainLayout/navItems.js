import { v4 as uuid } from 'uuid';

// Icons
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';

/**
 * @example
 * {
 *	id: number,
 *	type: "group" | "item",
 *	title: string,
 *	Icon: NodeElement
 *	menuChildren?: {title: string, href: string}[]
 *  menuMinWidth?: number
 * }
 */

const NAV_LINKS_CONFIG = [
	{
		id: uuid(),
		type: 'item',
		title: 'Dashboard',
		Icon: BarChartOutlinedIcon,
		href: '/admin/dashboard',
	},
	{ id: uuid(), type: 'item', title: 'Orders', Icon: InventoryOutlinedIcon, href: '/admin/orders' },
	{ id: uuid(), type: 'item', title: 'Products', Icon: LabelOutlinedIcon, href: '/admin/products' },
];

export default NAV_LINKS_CONFIG;
