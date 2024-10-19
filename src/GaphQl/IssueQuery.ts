import { gql } from '@apollo/client';

export const GET_REPO_ISSUES = gql`
  query GetRepositoryIssues($owner: String!, $name: String!, $first: Int!, $after: String) {
    repository(owner: $owner, name: $name) {
        issues(first: $first, after: $after) {
            totalCount  
            edges {
                cursor
                    node {
                    id
                    title
                    body
                    createdAt
                    updatedAt
                    author {
                        login
                    }
                    url
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
