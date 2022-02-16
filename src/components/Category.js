import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "../styledComponents/Carousel";
import Button from "../styledComponents/Button";
import Container from "../styledComponents/Container";
import Grid from "../styledComponents/Grid";
import StructureLoader from "../styledComponents/StructureLoader";
import StockFilter from "../styledComponents/StockFilter";
import SubTitle from "../styledComponents/SubTitle";
import DeleteSpan from "../styledComponents/DeleteSpan";
import DisplayInPageError from "../styledComponents/DisplayInPageError";
import cartImg from "../utils/icons/cart.svg";
import { removeFromCart, addToCart } from "../store/actions/cartActions";
import { getCurrentPrice, isInCart } from "../utils/helper";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: null };
  }

  demoAsyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  };
  componentDidMount() {
    this.demoAsyncCall().then(() => this.setState({ loading: false }));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.categoryName !== this.props.categoryName) {
      this.setState({ error: null, loading: true });
      this.demoAsyncCall().then(() => this.setState({ loading: false }));
    }
  }
  handleAddRemoveCart = async (e, productId) => {
    const { dispatch, cart } = this.props;
    e.preventDefault();
    e.target.disabled = true;
    this.state.error && this.setState({ error: null });
    isInCart(cart, productId)
      ? dispatch(removeFromCart(productId))
      : addToCart(dispatch, productId, null).then((res) => {
          if (res.message) {
            this.setState({ error: res.message });
            setTimeout(
              () => window.scrollTo({ top: 0, behavior: "smooth" }),
              500
            );
          }
        });

    e.target.disabled = false;
  };
  render() {
    const { category, userCurrency, cart } = this.props;
    const { loading, error } = this.state;
    return (
      <Container>
        <h1 style={{ textTransform: "capitalize" }}>{category?.name}</h1>
        {error && (
          <DisplayInPageError>Something Went Wrong: {error}</DisplayInPageError>
        )}

        <Grid parent direction="col" gap="3rem">
          {category.products.map((product) => (
            <Grid item cols={4} key={product.id} className="category-card">
              {loading ? (
                <StructureLoader type="category" />
              ) : (
                <>
                  {!product.inStock && <StockFilter />}
                  <Link to={`/product/${product.id}`}>
                    <Grid parent direction="row" gap="10px">
                      <Grid
                        item
                        rows={9}
                        className="category-item"
                        style={{ position: "relative" }}
                      >
                        <Carousel
                          links="dots"
                          imgArray={product.gallery}
                          product={product.name}
                        />
                        {product.inStock && (
                          <Button
                            primary={!isInCart(cart, product.id)}
                            warning={isInCart(cart, product.id)}
                            className="circle-btn"
                            onClick={(e) =>
                              this.handleAddRemoveCart(e, product.id)
                            }
                          >
                            <img
                              src={cartImg}
                              alt="cart"
                              style={{ width: "1.5rem" }}
                            />
                            {isInCart(cart, product.id) && <DeleteSpan />}
                          </Button>
                        )}
                      </Grid>

                      <Grid item rows={3}>
                        <h4>{product.name}</h4>
                        <SubTitle>
                          {userCurrency.symbol}
                          {getCurrentPrice(product, userCurrency)}
                        </SubTitle>
                      </Grid>
                    </Grid>
                  </Link>
                </>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ categories, userCurrency, cart }, props) {
  const { categoryName } = props;
  const name = categoryName ? categoryName : "all";
  const category = categories.find((category) => name === category.name);
  return { category, userCurrency, cart };
}
export default connect(mapStateToProps)(Category);
