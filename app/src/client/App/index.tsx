import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { GpxModel } from "../../lambda/models/gpx";
import { Builder } from "xml2js";

export const GET_GPXS = gql`
  query gpxs {
    gpxs {
      content
    }
  }
`;

const builder = new Builder();

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
            <pre>{builder.buildObject(JSON.parse(content))}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
