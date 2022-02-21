import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "../styledComponents/Grid";
import Container from "../styledComponents/Container";
import Gallery from "../styledComponents/Gallery";
import Button from "../styledComponents/Button";
import AttributesSelectors from "./AttributesSelectors";
import {
  addToCart,
  removeFromCart,
  setProductQuantity,
} from "../store/actions/cartActions";
import { getProductById } from "../utils/fetchApi";
import StructureLoader from "../styledComponents/StructureLoader";
import { findInCart, setDefaultAttributes } from "../utils/helper";
import { sanitize } from "dompurify";
import {
  DescriptionContainer,
  DisplayError,
  DisplayInPageError,
  SubTitle,
} from "../styledComponents/General.styled";
import { withRouter } from "react-router-dom";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      activePhoto: props.product?.gallery[0],
      userAttributes: {},
      loading: true,
      error: null,
      addToCartError: null,
    };
  }

  setUserAttributes = (attrName, value) => {
    this.setState((prevState) => ({
      userAttributes: {
        ...prevState.userAttributes,
        [attrName]: value,
      },
    }));
  };
  handleAddToCart = (e) => {
    /*  edit for resubmission
   6.It should be possible to add the same product to the cart 
      with different attributes.
	 7.A product with the same attributes should stack in the cart,
      while a product with different attributes should 	appear as separate cart items.*/

    const { dispatch } = this.props;
    const { product, userAttributes } = this.state;
    e.preventDefault();
    this.setState({ addToCartError: null });
    e.target.disabled = true;
    product.inStock
      ? dispatch(addToCart(product, userAttributes))
      : this.setState({ addToCartError: "sorry this product is out of stock" });
    e.target.disabled = false;
  };

  handleGetProduct = () => {
    const { id, location } = this.props;
    this.setState({ loading: true });

    /* edit for resubmission
     14.Please don't fetch category products on PDP. 
     ** I think this point means when navigating from category page,
        send product with Link dont fetch and get product by id<=Done
     */
    location.state?.product
      ? this.setState({
          product: location.state.product,
          userAttributes: setDefaultAttributes(
            location.state.product.attributes
          ),
          loading: false,
        })
      : // get product by id params if not navigating from category or cart
        getProductById(id)
          .then((res) =>
            res.data.product
              ? this.setState({ product: res.data.product, loading: false })
              : this.setState({
                  error: "Something went wrong please try again later.",
                })
          )
          .then(
            () =>
              this.state.product &&
              this.setState((state) => ({
                userAttributes: setDefaultAttributes(state.product.attributes),
              }))
          )
          .catch((error) => this.setState({ error: error.message }));
  };

  componentDidMount() {
    this.handleGetProduct();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ error: null, addToCartError: null });
      this.handleGetProduct();
    }
  }

  render() {
    console.log(this.props.location.state?.product);
    const { product, userAttributes, loading, error, addToCartError } =
      this.state;
    const { dispatch, cart, id } = this.props;
    const inCart = findInCart(cart, id, userAttributes);
    return (
      <Container>
        {error ? (
          <DisplayError>{error}</DisplayError>
        ) : loading ? (
          <StructureLoader type="product" />
        ) : (
          <Grid parent direction="col" alignItems="start">
            <Grid item cols="4">
              <Gallery productName={product.name} imgArray={product.gallery} />
            </Grid>

            <Grid item cols="3"></Grid>

            <Grid item cols="5" className="details">
              <Container>
                <AttributesSelectors
                  product={product}
                  userAttributes={userAttributes}
                  setAttributes={this.setUserAttributes}
                />
                {addToCartError && (
                  <DisplayInPageError>
                    Something Went Wrong: {addToCartError}
                  </DisplayInPageError>
                )}

                {inCart && (
                  <Grid parent direction="col" justifyItems="center">
                    <Grid item cols="3">
                      <Button
                        onClick={() =>
                          dispatch(
                            setProductQuantity(inCart.id, inCart.quantity + 1)
                          )
                        }
                      >
                        +
                      </Button>
                    </Grid>
                    <Grid item cols="6">
                      <SubTitle>{inCart.quantity}</SubTitle>
                    </Grid>
                    <Grid item cols="3">
                      <Button
                        onClick={() => {
                          if (inCart.quantity > 1)
                            dispatch(
                              setProductQuantity(inCart.id, inCart.quantity - 1)
                            );
                        }}
                      >
                        -
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {!inCart ? (
                  <Button
                    fullWidth
                    primary
                    noBorder
                    disabled={!product.inStock}
                    onClick={(e) => this.handleAddToCart(e)}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    warning
                    noBorder
                    disabled={!product.inStock}
                    onClick={() =>
                      this.props.dispatch(removeFromCart(inCart.id))
                    }
                  >
                    Remove From Cart
                  </Button>
                )}

                {/* edit for resubmission
                  10.dangerouslySetInnerHTML is dangerous. Please try to find a safer way. <=Done
                  used dompurify library as sanitizer */}
                <DescriptionContainer
                  dangerouslySetInnerHTML={{
                    __html: sanitize(product.description),
                  }}
                />
                {/* dangerous=>
                 <DescriptionContainer
                  dangerouslySetInnerHTML={{ __html: product.description }}
                /> */}
              </Container>
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}

function mapStateToProps({ cart }, dispatch) {
  return { dispatch, cart };
}

export default withRouter(connect(mapStateToProps)(Product));
