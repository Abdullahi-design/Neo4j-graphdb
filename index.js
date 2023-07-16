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

app.post('/users', (req, res) => {
  const { 
    name,
    fullName,
    business,
    location,
    connectionName,
    connectionFullName,
    connectionlastContacted,
    howDidYouMeet
   } = req.body;

  // Create a session to interact with the database
  const session = driver.session();

  // Define your query and parameters
  const query = `
  CREATE (person:PERSON {name: $fullName, business: $business, location: $location})
  WITH person
  MATCH (connection:PERSON {name: $connectionFullName})
  CREATE (person)-[:CLIENT {lastContacted: $connectionlastContacted, howDidYouMeet: $howDidYouMeet}]->(connection)
  RETURN person
`;


  const params = {
    name,
    fullName,
    business,
    location,
    connectionName,
    connectionFullName,
    connectionlastContacted,
    howDidYouMeet
  };

  // Run the query
  session
    .run(query, params)
    .then((result) => {
      if (result.records.length > 0) {
        const abdulNode = result.records[0].get('person');
        console.log('Created node:', abdulNode.properties);
        res.status(201).json({ message: 'Node created successfully', node: abdulNode.properties });
      } else {
        console.log('No records returned from the query.');
        res.status(500).json({ error: 'An error occurred while creating the node' });
      }
    })
    .catch((error) => {
      console.error('Error creating node:', error);
      res.status(500).json({ error: 'An error occurred while creating the node' });
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
