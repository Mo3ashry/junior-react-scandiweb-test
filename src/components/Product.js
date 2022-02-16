import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "../styledComponents/Grid";
import Container from "../styledComponents/Container";
import Gallery from "../styledComponents/Gallery";
import Button from "../styledComponents/Button";
import AttributesSelectors from "./AttributesSelectors";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { getProductById } from "../utils/fetchApi";
import StructureLoader from "../styledComponents/StructureLoader";
import { isInCart, setDefaultAttributes } from "../utils/helper";
import DescriptionContainer from "../styledComponents/DescriptionContainer";
import DisplayError from "../styledComponents/DisplayError";
import DisplayInPageError from "../styledComponents/DisplayInPageError";

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
  handleAddRemoveCart = (e) => {
    const { dispatch, cart } = this.props;
    const { product, userAttributes } = this.state;
    e.preventDefault();
    this.setState({ addToCartError: null });
    e.target.disabled = true;
    isInCart(cart, product.id)
      ? dispatch(removeFromCart(product.id))
      : addToCart(dispatch, product.id, userAttributes).then((res) => {
          res.message && this.setState({ addToCartError: res.message });
        });
    e.target.disabled = false;
  };

  handleGetProduct = () => {
    const { cart, id } = this.props;

    this.setState({ loading: true });
    getProductById(id)
      .then((res) =>
        res.data.product
          ? this.setState({ product: res.data.product, loading: false })
          : this.setState({
              error: "Something went wrong please try again later.",
            })
      )
      .then(() =>
        this.state.product
          ? isInCart(cart, id)
            ? this.setState({
                userAttributes: cart.find((item) => item.id === id)
                  .userAttributes,
              })
            : this.setState((state) => ({
                userAttributes: setDefaultAttributes(state.product.attributes),
              }))
          : ""
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
    const { product, userAttributes, loading, error, addToCartError } =
      this.state;
    const { cart, id } = this.props;
    const inCart = isInCart(cart, id);
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

                <Button
                  fullWidth
                  primary={!inCart}
                  warning={inCart}
                  noBorder
                  disabled={!product.inStock}
                  onClick={(e) => this.handleAddRemoveCart(e)}
                >
                  {inCart ? "remove from cart" : "Add to cart"}
                </Button>

                <DescriptionContainer
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
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

export default connect(mapStateToProps)(Product);
