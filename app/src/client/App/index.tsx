import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { XmlModel } from "../../lambda/models/xml";

export const GET_XMLS = gql`
  query xmls {
    xmls {
      content
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(GET_XMLS);
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
        {data?.xmls.map(({ content }: XmlModel, index: number) => (
          <li key={index}>
            <pre>{content}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
