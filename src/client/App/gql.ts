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

export const CREATE_GPX = gql`
  mutation createGpx($content: String!, $title: String) {
    createGpx(content: $content, title: $title) {
      title
      content
      id
    }
  }
`;

export const DELETE_GPX = gql`
  mutation deleteGpx($id: ID!) {
    deleteGpx(id: $id)
  }
`;
