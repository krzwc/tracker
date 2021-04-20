import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { GpxModel } from "../../lambda/models/gpx";

export const GET_GPXS = gql`
  query gpxs {
    gpxs {
      content
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(GET_GPXS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <>
        <h3>Something went wrong!</h3>
        <div>{error.message}</div>
      </>
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      <ul>
        {data?.gpxs.map(({ content }: GpxModel, index: number) => (
          <li key={index}>
            <pre>{content}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
