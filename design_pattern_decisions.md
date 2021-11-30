Inheritance and Interfaces 
In my contract I import the Ownable contract from OpenZepplin. I use this ownable contract to ensure that some functions can only be called by an owner.


Access Control Design Patterns
As stated above, I implemented the Ownable access control design pattern. One of my functions allows the owner to gift a certain amount of Zoodle (in game currency) to any user of choice. That is why it was necessary I use the Ownable design pattern to ensure that only the creator of the contract can distribute Zoodle. 