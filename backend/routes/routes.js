import { Router } from "express";
import {
  createClient,
  deleteClient,
  getClient,
  listClients,
  updateClient,
} from "../controllers/clientController.js";
import asyncHandler from "express-async-handler";
import esClient from "../database/elasticsearch.js";

import {
  searchClients as esSearchClients,
  createClient as esCreateClinet,
  showClient as esShowClient,
  deleteClient as esDeleteClient,
  updateClient as esUpdateClient,
  listClients as esListClient,
} from "../controllers/esClientController.js";

const router = Router();

// db apis
router.get("/clients", asyncHandler(listClients));
router.post("/clients", asyncHandler(createClient));

router.get("/clients/:id", asyncHandler(getClient));
router.put("/clients/:id", asyncHandler(updateClient));
router.delete("/clients/:id", asyncHandler(deleteClient));

// router.get("/clients/search", searchClients);

// elasticsearch test apis
router.get(
  "/es/ping",
  asyncHandler(async function (req, res) {
    const response = await esClient.ping();
    console.log("ElasticSearch running");
    res.send(response);
  })
);

router.post("/es/create", async (req, res) => {
  const result = await esClient.index({
    index: "posts",
    document: {
      title: "hello",
      author: "hello",
      content: "hello",
    },
  });

  res.send(result);
});

router.get(
  "/es/posts",
  asyncHandler(async (req, res) => {
    const result = await esClient.search({
      index: "posts",
      query: { match_all: {} },
    });

    res.send(result);
  })
);
router.delete("/es/posts", async (res, req) => {
  const result = await esClient.indices.delete({
    index: "posts",
  });
  res.send(result);
});

// ElasticSearch Client apis

// clients?q=[term]	Search for a client (based on id/ name/ CIN/ email)
router.route("/es/clients/search").get(esSearchClients);

router.route("/es/clients/").get(esListClient).post(esCreateClinet);

router
  .route("/es/clients/:id")
  .get(esShowClient)
  .put(esUpdateClient)
  .delete(esDeleteClient);

export default router;
