import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { GpxModel } from "../../lambda/models/gpx";

import { Map } from "../Map";

export const GET_GPXS = gql`
  query gpxs {
    gpxs {
      content
      title
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery<{ gpxs: GpxModel[] }>(GET_GPXS);
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
      {/* <ul>
        {data?.gpxs.map(({ content, title }, index: number) => (
          <li key={index}>
            <h3>{title}</h3>
            <pre>{builder.buildObject(JSON.parse(content))}</pre>
          </li>
        ))}
      </ul> */}
      {data && <Map gpx={data.gpxs[0].content} />}
    </div>
  );
}
