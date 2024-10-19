import { gql } from "@apollo/client";

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($username: String!,$first:Int!, $after: String) {
    user(login: $username) {
      repositories(first: $first, after: $after) { 
        totalCount  
        edges {
          node {
            id
            name
            url
            stargazerCount
            watchers {
              totalCount
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;