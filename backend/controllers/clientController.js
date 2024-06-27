import { CompanyDetails } from "../database/mysql.js";

// List all clients
const listClients = async (req, res) => {
  const clients = await CompanyDetails.findAll();
  res.json(clients);
  // test error
  //   throw new Error("something went wrong");
};

// Create a new client
const createClient = async (req, res) => {
  const { name, cin, status, address, email, directors } = req.body;
  try {
    const newClient = await CompanyDetails.create({
      name,
      cin,
      status,
      address,
      email,
      directors,
    });
    res.json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle potential validation errors
  }
};

// Get a single client by ID
const getClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const client = await CompanyDetails.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ error: "CompanyDetails not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a client
const updateClient = async (req, res) => {
  const clientId = req.params.id;
  const { name, cin, status, address, email, directors } = req.body;
  try {
    const [updatedCount] = await CompanyDetails.update(
      { name, status, address, email, directors },
      { where: { id: clientId } }
    );
    if (updatedCount === 0) {
      return res.status(404).json({ error: "CompanyDetails not found" });
    }
    const updatedClient = await CompanyDetails.findByPk(clientId);
    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle potential validation errors
  }
};

// Delete a client
const deleteClient = async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedCount = await CompanyDetails.destroy({
      where: { id: clientId },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ error: "CompanyDetails not found" });
    }
    res.json({ message: "CompanyDetails deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createClient, deleteClient, getClient, listClients, updateClient };
