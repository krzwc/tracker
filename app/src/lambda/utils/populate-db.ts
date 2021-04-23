import { models } from "../models";
import * as fs from "fs";
import { Parser } from "xml2js";

export const populateDB = async () => {
  const parser = new Parser();
  fs.readFile(__dirname + "/run.gpx", function (err, data) {
    console.log(data);
    parser.parseString(data, async function (err, result) {
      try {
        const gpx = new models.Gpx({
          content: JSON.stringify(result),
          title: "Example",
        });

        await gpx.save();
      } catch (e) {
        console.error(e);
      }
    });
  });
};
