import { gql } from "@apollo/client";
import { apolloClient } from "../index";

const getAllCategoriesQuery = gql`
  {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
const getCurrenciesQuery = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
const getCategoryQuery = (title) => gql`{
    category(input:{title:"${title}"}){
         name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
    }
`;
const getProductQuery = (id) => gql`
  {
    product(id:"${id}") {
      id
      name
      inStock
      gallery
      description
      category
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
export const getAllCategories = async () => {
  return await apolloClient.query({
    query: getAllCategoriesQuery,
  });
};
export const getCurrencies = async () => {
  return await apolloClient.query({
    query: getCurrenciesQuery,
  });
};
export const getCategoryByTitle = async (title) => {
  return await apolloClient.query({
    query: getCategoryQuery(title),
  });
};
export const getProductById = async (id) => {
  return await apolloClient.query({
    query: getProductQuery(id),
  });
};
