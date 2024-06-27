import fs from "fs";
import esClient from "../database/elasticsearch.js";

export async function writeToJsonFile(jsonContent, fileName) {
  console.log("Writing to json file");

  fs.writeFile(`./${fileName}.json`, jsonContent, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

export function validateFields(cin, pin) {
  if (cin.length !== 21) {
    return {
      error: `Invalid CIN: ${cin}. CIN should be exactly 21 characters.`,
    };
  }
  if (pin.length !== 6) {
    return {
      error: `Invalid PIN: ${pin}. PIN should be exactly 6 characters.`,
    };
  }
  return null;
}

export async function addToElasticSearch(index, data) {
  try {
    const exisitingDoc = await esClient.search({
      index: "clients",
      query: { match: { cin: data.cin } },
    });

    if (exisitingDoc.hits.hits.length >= 1) {
      console.log("Document already exists in Elasticsearch.");
      return;
    }

    const doc = await esClient.index({ index, document: data });
    console.log("Company added to Elasticsearch:", doc._id);
    return doc;
  } catch (error) {
    console.error("Error adding document to Elasticsearch:", error);
    return null;
  }
}
