import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer, productDetailsReducer, newReviewReducer, productReducer, newProductReducer } from "./reducers/productReducer";
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer }  from "./reducers/authReducer"; 
import { cartReducer } from "./reducers/cartReducer";
import { newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, orderReducer} from "./reducers/orderReducer";
import { FlashsalesReducer } from "./reducers/flashsaleReducer";

const reducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    newProduct: newProductReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder: myOrdersReducer,
    orderDetail: orderDetailsReducer,
    newReview: newReviewReducer,
    allOder: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    allFlashsales: FlashsalesReducer,
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store