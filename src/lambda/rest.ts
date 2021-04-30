import * as converter from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import { Builder } from "xml2js";
import fetch from "node-fetch";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

const GET_GPX = `
  query getGpx($id: ID!) {
    gpx(id: $id) {
      title
      content
      id
    }
  }
`;

/* const parseGpx = (gpxString: string): string => {
  const gpxAsObj = new Builder().buildObject(JSON.parse(gpxString));
  const parsedGPX = new DOMParser().parseFromString(gpxAsObj);
  return JSON.stringify(converter.gpx(parsedGPX));
}; */

export const handler = async function (
  event: APIGatewayProxyEvent,
  context: Context
) {
  const { id } = event.queryStringParameters;

  const fetchResult = await fetch(
    "http://localhost:3000/.netlify/functions/graphql",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: GET_GPX, variables: { id } }),
    }
  );
  const responseJson = await fetchResult.json();

  return {
    statusCode: 200,
    body: responseJson.data.gpx.content,
  };
};
