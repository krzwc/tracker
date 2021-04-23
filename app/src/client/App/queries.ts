import gql from "graphql-tag";

export const GET_GPXS = gql`
  query gpxs {
    gpxs {
      content
      title
    }
  }
`;
