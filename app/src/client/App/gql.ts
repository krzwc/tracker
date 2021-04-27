import gql from "graphql-tag";

export const GET_GPXS = gql`
  query gpxs {
    gpxs {
      content
      title
      id
    }
  }
`;

export const CREATE_GPXS = gql`
  mutation createGpx($content: String!, $title: String) {
    createGpx(content: $content, title: $title) {
      title
      content
      id
    }
  }
`;
