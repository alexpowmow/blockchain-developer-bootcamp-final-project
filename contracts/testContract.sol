// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract TestContract is Ownable{
  
  
  mapping(address => uint) private upgradeTotal;
  mapping(address => uint) private zoodleBalances;

  enum State{Owned, Unowned}

  struct Badge {
    uint id;
    uint price;
    State status;
    address badgeOwner;
  }

  // mapping(uint => Badge) private badgeList;
  Badge[] private badges;

  constructor() {
   badges.push(Badge({
     id:0,
     price:100,
     status: State.Unowned,
    badgeOwner: address(0)
   }));

   badges.push(Badge({
     id:1,
     price:10000,
     status: State.Unowned,
    badgeOwner: address(0)
   }));

   badges.push(Badge({
     id:2,
     price:1000000,
     status: State.Unowned,
    badgeOwner: address(0)
   }));
  }

  modifier isUnowned(uint id){
    require(badges[id].status == State.Unowned && badges[id].badgeOwner == address(0), "Badge is owned");
    _;
  }

  function giftZoodle(address recipient, uint256 giftAmount) public onlyOwner{
    zoodleBalances[recipient] = giftAmount;
  }
  
  function getZoodle() public view returns(uint256){
    return zoodleBalances[msg.sender];
  }
  function getBadge(uint256 id) public view returns(Badge memory){
    return badges[id];
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

  function claimBadge(uint256 id) public isUnowned(id){
    require(zoodleBalances[msg.sender] >= badges[id].price);
    badges[id].status = State.Owned;
    badges[id].badgeOwner = msg.sender;
  }

}
