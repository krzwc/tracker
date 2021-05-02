import fetch from 'node-fetch';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { URL } from './config';

const GET_GPX = `
  query getGpx($id: ID!) {
    gpx(id: $id) {
      title
      content
      id
    }
  }
`;

export const handler = async function (event: APIGatewayProxyEvent) {
  const { id } = event.queryStringParameters;

  const fetchResult = await fetch(`${URL}/.netlify/functions/graphql`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: GET_GPX, variables: { id } }),
  });
  const responseJson = await fetchResult.json();

  return {
    statusCode: 200,
    body: responseJson.data.gpx.content,
  };
};
