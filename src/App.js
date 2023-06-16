import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { getCartItems } from "./redux/features/cart/cartSlice";
import { useEffect } from "react";

function App() {
  const { cartItems, isLoading, error } = useSelector(
    (store) => store.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoding) {
    return <h1>Loading...</h1>;
  }
  if (!isLoading && error) {
    return <h1>Threre was an error!</h1>;
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
