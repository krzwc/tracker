import * as converter from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import { Builder } from "xml2js";
import fetch from "node-fetch";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

const GET_GPXS = `
  query gpxs {
    gpxs {
      content
      title
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
  const fetchResult = await fetch(
    "http://localhost:3000/.netlify/functions/graphql",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: GET_GPXS }),
    }
  );
  const responseJson = await fetchResult.json();

  return {
    statusCode: 200,
    body: responseJson.data.gpxs[0].content,
  };
};
