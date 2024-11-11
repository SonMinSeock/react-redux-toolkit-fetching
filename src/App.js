import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notifiaction from "./components/UI/Notifiaction";

import { fetchCartData, sendCartData } from "./store/actions/cart-actions";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.uiSlice.cartIsVisible);
  const cart = useSelector((state) => state.cartSlice);
  const notification = useSelector((state) => state.uiSlice.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notifiaction status={notification.status} title={notification.title} message={notification.message} />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
