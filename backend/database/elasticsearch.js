import { Client, errors } from "@elastic/elasticsearch";
import "dotenv";
// TODO env
const elasticsearchConfig = {
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "password",
  },
}; // Use container name if using Docker Compose

// export async function connectToElasticsearch() {
//   try {
//     const client = new Client(elasticsearchConfig);
//     return client;
//   } catch (error) {
//     console.error("Error connecting to Elasticsearch:", error);
//     throw error; // Re-throw for handling in main script
//   }
// }

const esClient = new Client(elasticsearchConfig);

// ping eslaticsearch
esClient.ping((err) => {
  if (err) {
    console.error("Elasticsearch is down!");
  } else {
    console.log("Elasticsearch is up and running!");
  }
});

function checkConnection() {
  return new Promise(async (resolve) => {
    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;
    while (!isConnected) {
      try {
        await esClient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;
      } catch (_) {}
    }
    resolve(true);
  });
}

export default esClient;
