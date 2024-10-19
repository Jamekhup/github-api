import { gql } from "@apollo/client";

export const CREATE_ISSUE = gql`
  mutation CreateIssue($repoId: ID!, $title: String!, $body: String!) {
    createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {
      issue {
        id
        title
        body
        url
      }
    }
  }
`;
