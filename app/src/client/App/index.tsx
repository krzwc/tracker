import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import type { PostModel } from "../../lambda/models/post";

export const GET_POSTS = gql`
  query posts {
    posts {
      title
      content
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(GET_POSTS);
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
        {data?.posts.map(({ title, content }: PostModel, index: number) => (
          <li key={index}>
            <h3>{title}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
