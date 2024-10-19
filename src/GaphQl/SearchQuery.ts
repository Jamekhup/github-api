import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query SearchUsers($query: String!) {
    search(query: $query, type: USER, first: 10) {
      edges {
        node {
          ... on User {
            id
            login
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
