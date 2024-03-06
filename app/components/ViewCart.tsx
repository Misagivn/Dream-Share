/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/button";
import { useCart } from "./CartContext";
import {
  Cartpreview,
  Cartsummary,
  Col5,
  Col7,
  H1,
  H2,
  Image,
  Itemcollection,
  Itemprice,
  Itemtitle,
  Wrapper,
} from "./ViewCart.styled";

const ViewCart: React.FC = () => {
  const { removeFromCart } = useCart();
  const { updateQuantity } = useCart();
  const handleRemoveFromCart = (item: any) => {
    removeFromCart(item);
    console.log("Item removed from cart");
  };
  const { cartItems } = useCart();
  return (
    <>
      {cartItems.length > 0 ? (
        <Wrapper>
          <div>
            <Col7>
              <H2 style={{width: "715px"}}>Cart</H2>
              <h2
                style={{
                  border: "2px solid #303034",
                  padding: "7px 7px 7px 20px",
                  width: "715px",
                }}
              >
                PRODUCTS
              </h2>
            </Col7>
            {cartItems.map((item, index) => (
              <Col7 key={index}>
                <table style={{ border: "1px solid #303034", width: "715px" }}>
                  <td
                    width={140}
                    className="align-top"
                    style={{ padding: "7px 7px 7px 20px" }}
                  >
                    <img src={item.image} alt={item.title} />
                  </td>
                  <td style={{ width: "35%", padding: "0px 7px" }}>
                    <Itemtitle>{item.title}</Itemtitle>
                    <Itemcollection>{item.collection}</Itemcollection>
                  </td>
                  <td
                    style={{
                      width: "10%",
                      padding: "0px 7px",
                      verticalAlign: "middle",
                    }}
                  >
                    <input
                      type="number"
                      className="table-checkout-quantity-input form-control form-control-sm text-center"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item, Number(e.target.value))
                      }
                      style={{
                        width: "50px",
                        padding: ".35rem .7rem",
                        color: "#eeeef1",
                        background: "#101014",
                        border: "solid #505054",
                        borderWidth: "1px",
                        borderRadius: "3px",
                      }}
                    ></input>
                  </td>
                  <td
                    style={{
                      width: "20%",
                      padding: "0px 7px",
                      verticalAlign: "middle",
                    }}
                  >
                    <Itemprice>
                      USD $
                      {(
                        Math.round(item.price * item.quantity * 100) / 100
                      ).toFixed(2)}
                    </Itemprice>
                  </td>
                  <td style={{ padding: "0px 11px", verticalAlign: "middle" }}>
                    <Button
                      color="primary"
                      variant="solid"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove
                    </Button>
                  </td>
                </table>
              </Col7>
            ))}
          </div>
          <div>
            <Col5>
              <H2 style={{ width: "530px" }}>Order Summary</H2>
              <table
                style={{
                  width: "530px",
                  border: "1px solid #303034",
                  borderRight: "1px solid #303034",
                }}
              >
                <tr>
                  <td
                    style={{
                      width: "60%",
                      padding: "7px 7px 7px 24px",
                      borderRight: "1px solid #303034",
                    }}
                  >
                    ITEMS
                  </td>
                  <td
                    style={{
                      width: "15%",
                      padding: "7px",
                      borderRight: "1px solid #303034",
                      textAlign: "center",
                    }}
                  >
                    QTY.
                  </td>
                  <td
                    style={{ width: "25%", padding: "7px", textAlign: "end" }}
                  >
                    PRICE
                  </td>
                </tr>
              </table>
            </Col5>
            {cartItems.map((item, index) => (
              <Col5 key={index}>
                <table
                  style={{
                    width: "530px",
                    border: "1px solid #303034",
                    borderRight: "1px solid #303034",
                  }}
                >
                  <tr>
                    <td
                      style={{
                        width: "60%",
                        padding: "7px 7px 7px 24px",
                        borderRight: "1px solid #303034",
                      }}
                    >
                      {item.title}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        padding: "7px",
                        borderRight: "1px solid #303034",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        width: "35%",
                        padding: "7px",
                        borderRight: "1px solid #303034",
                        textAlign: "end",
                      }}
                    >
                      USD $
                      {(
                        Math.round(item.price * item.quantity * 100) / 100
                      ).toFixed(2)}
                    </td>
                  </tr>
                </table>
              </Col5>
            ))}
            <table
              style={{
                width: "530px",
                border: "1px solid #303034",
              }}
            >
              <tr>
                <td style={{ padding: "7px", width: "50%" }}>SUBTOTAL</td>
                <td style={{ padding: "7px", width: "50%", textAlign: "end" }}>
                  USD $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderTop: "1px solid #303034" }}>
                <td style={{ padding: "7px", width: "50%" }}>TAXES</td>
                <td style={{ padding: "7px", width: "50%", textAlign: "end" }}>
                  USD $
                  {cartItems
                    .reduce(
                      (total, item) =>
                        (total + item.price * item.quantity) * 0.08,
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderTop: "1px solid #303034" }}>
                <td
                  style={{
                    padding: "7px",
                    width: "60%",
                    fontWeight: "800",
                    borderRight: "1px solid #303034",
                  }}
                >
                  TOTAL
                </td>
                <td
                  style={{
                    padding: "7px",
                    width: "40%",
                    textAlign: "end",
                    fontWeight: "800",
                  }}
                >
                  USD $
                  {cartItems
                    .reduce(
                      (total, item) =>
                        (total + item.price * item.quantity) * 0.08 +
                        (total + item.price * item.quantity),
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
            </table>
          </div>
        </Wrapper>
      ) : (
        <>
          <h1>Your cart is empty</h1>
          <p>You have not added any cart items yet.</p>
          <a href="/">Continue shopping</a>
        </>
      )}
    </>
  );
};

export default ViewCart;
