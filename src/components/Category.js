import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "../styledComponents/Carousel";
import Button from "../styledComponents/Button";
import Container from "../styledComponents/Container";
import Grid from "../styledComponents/Grid";
import StructureLoader from "../styledComponents/StructureLoader";
import DeleteSpan from "../styledComponents/DeleteSpan";
import cartImg from "../utils/icons/cart.svg";
import { removeFromCart, addToCart } from "../store/actions/cartActions";
import {
  getCurrentPrice,
  findInCart,
  setDefaultAttributes,
} from "../utils/helper";
import { getCategoryByTitle } from "../utils/fetchApi";
import BallsLoader from "../styledComponents/BallsLoader";
import {
  CapitalizeHeader,
  DisplayError,
  DisplayInPageError,
  ProductHeader,
  StockFilterText,
  SubTitle,
} from "../styledComponents/General.styled";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      loading: true,
      AddToCartError: null,
      fetchError: null,
      productsLoading: true,
    };
  }

  demoAsyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  };
  /* edit for resubmission
     13.Please don't fetch all data at once.
    Filter products by category for PLP using graphql query. <=Done */

  handleGetCategory = async (categoryName) => {
    this.setState({ loading: true });
    getCategoryByTitle(categoryName)
      .then((res) => {
        res.data.category
          ? this.setState({ category: res.data.category, loading: false })
          : this.setState({
              fetchError: "Something went wrong please try again later.",
            });
      })
      .then(() =>
        this.demoAsyncCall().then(() =>
          this.setState({ productsLoading: false })
        )
      )
      .catch((err) => {
        this.setState({ fetchError: err.message });
      });
  };
  componentDidMount() {
    this.handleGetCategory(this.props.name);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.categoryName !== this.props.categoryName) {
      this.setState({
        AddToCartError: null,
        fetchError: null,
        loading: true,
        productsLoading: true,
      });
      this.handleGetCategory(this.props.categoryName);
    }
  }
  handleAddToCart = (e, product) => {
    const { dispatch } = this.props;
    e.preventDefault();
    e.target.disabled = true;
    this.state.AddToCartError && this.setState({ AddToCartError: null });
    if (product.inStock) {
      dispatch(addToCart(product, setDefaultAttributes(product.attributes)));
    } else {
      this.setState({ AddToCartError: "sorry this product is out of stock" });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 500);
    }

    e.target.disabled = false;
  };
  handleRemoveFromCart = (e, product) => {
    e.preventDefault();
    const { dispatch, cart } = this.props;
    dispatch(
      removeFromCart(
        findInCart(cart, product.id, setDefaultAttributes(product.attributes))
          .id
      )
    );
  };
  render() {
    const { userCurrency, cart } = this.props;
    const { category, loading, AddToCartError, fetchError, productsLoading } =
      this.state;
    return (
      <Container>
        {fetchError ? (
          <DisplayError>{fetchError}</DisplayError>
        ) : loading ? (
          <BallsLoader />
        ) : (
          <>
            <CapitalizeHeader>{category?.name}</CapitalizeHeader>
            {AddToCartError && (
              <DisplayInPageError>
                Something Went Wrong: {AddToCartError}
              </DisplayInPageError>
            )}

            <Grid parent direction="col" gap="3rem">
              {category.products.map((product) => (
                <Grid item cols={4} key={product.id} className="category-card">
                  {productsLoading ? (
                    <StructureLoader type="category" />
                  ) : (
                    <>
                      <Link
                        to={{
                          pathname: `/product/${product.id}`,
                          state: { product },
                        }}
                      >
                        <Grid
                          parent
                          direction="row"
                          gap="10px"
                          className={
                            !product.inStock ? "out-stock" : "in-stock"
                          }
                        >
                          {/* edit for resubmission
                      5.It should be possible to navigate to an out-of-stock
                      product page. */}
                          {!product.inStock && (
                            <StockFilterText>Out Of Stock</StockFilterText>
                          )}
                          <Grid item rows={9} className="category-item">
                            <Carousel
                              links="dots"
                              imgArray={product.gallery}
                              product={product.name}
                            />
                            {!findInCart(
                              cart,
                              product.id,
                              setDefaultAttributes(product.attributes)
                            ) ? (
                              product.inStock && (
                                <Button
                                  primary
                                  className="circle-btn"
                                  onClick={(e) =>
                                    this.handleAddToCart(e, product)
                                  }
                                >
                                  <img
                                    src={cartImg}
                                    alt="cart"
                                    className="cart-icon"
                                  />
                                </Button>
                              )
                            ) : (
                              <Button
                                warning
                                className="circle-btn"
                                onClick={(e) =>
                                  this.handleRemoveFromCart(e, product)
                                }
                              >
                                <img
                                  src={cartImg}
                                  alt="cart"
                                  className="cart-icon"
                                />
                                <DeleteSpan />
                              </Button>
                            )}
                          </Grid>
                          <Grid item rows={3}>
                            {/* edit for resubmission
                          1.The product brand is missing on PLP. <=Done */}
                            <ProductHeader className="category-product-header">
                              <h4 className="brand"> {product.brand}</h4>
                              <SubTitle className="product-name">
                                {product.name}
                              </SubTitle>
                            </ProductHeader>
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
          </>
        )}
      </Container>
    );
  }
}

function mapStateToProps({ userCurrency, cart }, props) {
  const { categoryName } = props;
  const name = categoryName ? categoryName : "all";
  return { name, userCurrency, cart };
}
export default connect(mapStateToProps)(Category);
