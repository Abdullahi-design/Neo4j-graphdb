const neo4j = require('neo4j-driver');
require('dotenv').config()

const password = process.env.GENERATED_PASSWORD;
const url = process.env.CONNECTION_URI;

// Create a Neo4j driver instance
const driver = neo4j.driver(`${url}`, neo4j.auth.basic('neo4j', `${password}`));

// Create a session to interact with the database
const session = driver.session();

// Define your query and parameters
const query = `
  CREATE (abdul:PERSON {name: $name, business: $business, location: $location})
  WITH abdul
  MATCH (john:PERSON {name: 'John Doe'}), (step:PERSON {name: 'Step Doe'})
  CREATE (abdul)-[:CLIENT {lastContacted: $johnLastContacted}]->(john),
    (abdul)-[:CLIENT {lastContacted: $stepLastContacted}]->(step)
  RETURN abdul
`;
const params = {
  name: 'Abdul Sani',
  business: 'Dev at Google',
  location: 'Nigeria',
  johnLastContacted: '12 Oct 2023',
  stepLastContacted: '12 Nov 2023'
};


// Run the query
session.run(query, params)
  .then(result => {
    if (result.records.length > 0) {
      const abdulNode = result.records[0].get('abdul');
      console.log('Created node:', abdulNode.properties);
    } else {
      console.log('No records returned from the query.');
    }

    // Close the session and driver
    session.close();
    driver.close();
  })
  .catch(error => {
    console.error('Error creating node:', error);
    // Close the session and driver in case of error
    session.close();
    driver.close();
  });