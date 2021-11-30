Using Specific Compiler Pragma 
For my contracts I have specified a range for the solidity compiler to run in. By doing this I am restricting newer versions of solidity compilers to run my contracts. I am doing this to reduce issues that may arise in a newr solidity compiler that I have not tested with before.

Proper Use of Require, Assert and Revert 
In my contract I use requires to make sure that function parameters are above a certain amount. For example, when a user goes to purchase an item I require that their balance is greater than the price of an object. Additionally, I used assert to make sure that a users balance is never below 0. There should never be a case where someones value falls below 0. 


Use Modifiers Only for Validation 
I have one modifier in my contract. This modifier is used to check the state of my badge object. If someone wants to claim a badge, it must be unowned. That is why I use the isUnowned modifier on the claimBadge function to ensure that the badge is unowned before someone attempts to claim it. 