import { Button } from "@nextui-org/button";
import { useCart } from "./CartContext";
import { Image, Itemtitle } from "./ViewCart.styled";

const ViewCart: React.FC = () => {
  const { removeFromCart } = useCart();
  const handleRemoveFromCart = (item: any) => {
    removeFromCart(item);
    console.log("Item removed from cart");
  };
  const { cartItems } = useCart();
  return cartItems.length > 0 ? (
    cartItems.map((item, index) => (
      <tr key={index}>
        <td width={140} className="align-top">
          <img src={item.image} alt={item.title} />
        </td>
        <td>
          <Itemtitle>{item.title}</Itemtitle>
          <Itemtitle>{item.collection}</Itemtitle>
        </td>
        <td>
          <input
            type="number"
            className="table-checkout-quantity-input form-control form-control-sm text-center"
          ></input>
        </td>
        <td>
          <Itemtitle>USD ${item.price}</Itemtitle>
        </td>
        <td>
          <Button
            color="primary"
            variant="solid"
            onClick={() => handleRemoveFromCart(item)}
          >
            Remove
          </Button>
        </td>
      </tr>
    ))
  ) : (
    <>
      <h1>Your cart is empty</h1>
      <p>You have not added any cart items yet.</p>
      <a href="">Continue shopping</a>
    </>
  );
};

export default ViewCart;
