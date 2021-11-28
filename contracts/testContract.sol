// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TestContract {
  address public owner;
  
  mapping(address => uint) private upgradeTotal;
  mapping(address => uint) private zoodleBalances;
  

  constructor() {
    owner = msg.sender;
  }

  function getZoodle() public view returns(uint256){
    return zoodleBalances[msg.sender];
  }

  function getUpgrades() public view returns(uint256){
    return upgradeTotal[msg.sender];
  }

  function saveProfile(uint256 zoodleAccrued, uint256 upgradesAccrued) public{
    zoodleBalances[msg.sender] = zoodleAccrued;
    upgradeTotal[msg.sender] = upgradesAccrued;
  }

  function purchaseItem1() public{
    require(zoodleBalances[msg.sender] >= 100, "Balance is less than 100");
    zoodleBalances[msg.sender] -= 100;
    upgradeTotal[msg.sender] +=5;
  }

  function purchaseItem2() public{
    require(zoodleBalances[msg.sender] >= 1000, "Balance is less than 1000");
    zoodleBalances[msg.sender] -= 1000;
    upgradeTotal[msg.sender] +=50;
  }

  function purchaseItem3() public{
    require(zoodleBalances[msg.sender] >= 100000, "Balance is less than 100000");
    zoodleBalances[msg.sender] -= 100000;
    upgradeTotal[msg.sender] +=500;
  }

  function purchaseItem4() public{
    require(zoodleBalances[msg.sender] >= 1000000, "Balance is less than 1000000");
    zoodleBalances[msg.sender] -= 1000000;
    upgradeTotal[msg.sender] +=5000;
  }

}
