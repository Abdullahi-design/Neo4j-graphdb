*Run the entire graph*
MATCH (n:PERSON)
RETURN (n)

*lIMIT*
MATCH (n:PLAYER) 
RETURN n LIMIT 25;

*DELETE*
MATCH (abdul:PERSON {name: 'Abdul Sani'})
DETACH DELETE abdul

*UPDATE AN EDGE*
MATCH (abdul:PERSON {name: 'Abdul Sani'})-[client:CLIENT]->(john:PERSON {name: 'John Doe'})
SET client.howDidYouMeet = 'linkedin'
RETURN abdul, client, john
