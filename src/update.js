const express = require('express');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const app = express();
const port = 8080;

app.use(express.json());

const password = process.env.GENERATED_PASSWORD;
const url = process.env.CONNECTION_URI;

// Create a Neo4j driver instance
const driver = neo4j.driver(`${url}`, neo4j.auth.basic('neo4j', `${password}`));

app.post('/update-connection', (req, res) => {
  const { person1, person2, howDidYouMeet } = req.body;

  // Create a session to interact with the database
  const session = driver.session();

  // Define your query and parameters
  const query = `
    MATCH (p1:PERSON {name: $person1})-[client:CLIENT]->(p2:PERSON {name: $person2})
    SET client.howDidYouMeet = $howDidYouMeet
    RETURN p1, client, p2
  `;
  const params = {
    person1,
    person2,
    howDidYouMeet
  };

  // Run the query
  session
    .run(query, params)
    .then((result) => {
      if (result.records.length > 0) {
        const updatedNodes = {
          person1: result.records[0].get('p1').properties,
          person2: result.records[0].get('p2').properties
        };
        const updatedClient = result.records[0].get('client').properties;
        console.log('Updated connection:', updatedNodes, updatedClient);
        res.status(200).json({ message: 'Connection updated successfully', nodes: updatedNodes, client: updatedClient });
      } else {
        console.log('No records returned from the query.');
        res.status(404).json({ error: 'Connection not found' });
      }
    })
    .catch((error) => {
      console.error('Error updating connection:', error);
      res.status(500).json({ error: 'An error occurred while updating the connection' });
    })
    .finally(() => {
      // Close the session
      session.close();
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
