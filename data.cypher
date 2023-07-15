CREATE 
(john:PERSON {name:"John Doe", business: "CEO of Google", location: "Nigeria"}),
(anna:PERSON {name:"Anna Doe", business: "CCO of Google", location: "Nigeria"}),
(joseph:PERSON {name:"Joseph Doe", business: "CTO of Google", location: "Nigeria"}),
(step:PERSON {name:"Step Doe", business: "Co-founder of Google", location: "Nigeria"}),
(alice:PERSON {name:"Alice Doe", business: "CFO of Google", location: "Nigeria"})

CREATE
(john)-[:CLIENT {lastContacted: "12 Jan 2023"}]->(anna),
(john)-[:CLIENT {lastContacted: "12 Feb 2023"}]->(joseph),
(anna)-[:CLIENT {lastContacted: "12 Jan 2023"}]->(john),
(anna)-[:CLIENT {lastContacted: "12 Mar 2023"}]->(alice),
(anna)-[:CLIENT {lastContacted: "12 Aug 2023"}]->(step),
(joseph)-[:CLIENT {lastContacted: "12 Mar 2023"}]->(step),
(joseph)-[:CLIENT {lastContacted: "12 Mar 2023"}]->(anna),
(joseph)-[:CLIENT {lastContacted: "12 Mar 2023"}]->(alice),
(joseph)-[:CLIENT {lastContacted: "12 Feb 2023"}]->(john),
(step)-[:CLIENT {lastContacted: "12 Jan 2023"}]->(alice),
(alice)-[:CLIENT {lastContacted: "12 Mar 2023"}]->(anna),
(alice)-[:CLIENT {lastContacted: "12 Jan 2023"}]->(step)