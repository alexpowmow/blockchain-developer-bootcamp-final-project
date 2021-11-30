// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A contract for managing user profiles for the blockchain based game Zoodle Clicker
/// @author Alexander R. D'Alessandro
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
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
     price:100000,
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

  event ZoodleGifted(address recipient, uint256 giftAmount);
  event ItemPurchase(address purchaser, uint256 price);
  event BadgeClaimed(address owner, uint256 badgeId, State status, uint256 price);

  modifier isUnowned(uint id){
    require(badges[id].status == State.Unowned && badges[id].badgeOwner == address(0), "Badge is owned");
    _;
  }

  /// @notice Used by the contract owner to gift an amount of zoodle to a user
  /// @dev used onlyOwner to make sure function is only accessed by owner
  /// @param recipient adress to recieve Zoodle
  /// @param giftAmount amount of Zoodle to be gifted
  function giftZoodle(address recipient, uint256 giftAmount) public onlyOwner{
    zoodleBalances[recipient] = giftAmount;
    emit ZoodleGifted(recipient, giftAmount);
  }
  
  /// @notice Used to retrieve the zoodle balance of a user
  /// @return the balance of a user
  function getZoodle() public view returns(uint256){
    assert(zoodleBalances[msg.sender] >=0);
    return zoodleBalances[msg.sender];
  }

  /// @notice Used to retrieve badge data
  /// @dev Can be used upon frontend load to populate badge data
  /// @param id the id of the badge that we want to retrieve data for
  /// @return a badge object

  function getBadge(uint256 id) public view returns(Badge memory){
    return badges[id];
  }

  /// @notice Used to retrieve the mining power of a specific user
  /// @dev Can be used upon frontend to load mining power
  /// @return the mining power of the user
  function getUpgrades() public view returns(uint256){
    return upgradeTotal[msg.sender];
  }

  /// @notice Used to save a users progress on the frontend
  /// @param zoodleAccrued the amount of zoodle the user mined on frontend
  /// @param upgradesAccrued the amount of mining power the user accrued on the frontend
  function saveProfile(uint256 zoodleAccrued, uint256 upgradesAccrued) public{
    zoodleBalances[msg.sender] = zoodleAccrued;
    upgradeTotal[msg.sender] = upgradesAccrued;
  }
  
  /// @notice Used to purchase item1 in the shop
  /// @dev require is used to make sure the user looking to purchase item has enough zoodle accumulated
  function purchaseItem1() public{
    require(zoodleBalances[msg.sender] >= 100, "Balance is less than 100");
    zoodleBalances[msg.sender] -= 100;
    upgradeTotal[msg.sender] +=5;
    emit ItemPurchase(msg.sender, 100);
  }

  /// @notice Used to purchase item2 in the shop
  /// @dev require is used to make sure the user looking to purchase item has enough zoodle accumulated
  function purchaseItem2() public{
    require(zoodleBalances[msg.sender] >= 1000, "Balance is less than 1000");
    zoodleBalances[msg.sender] -= 1000;
    upgradeTotal[msg.sender] +=50;
     emit ItemPurchase(msg.sender, 1000);
  }

  /// @notice Used to purchase item3 in the shop
  /// @dev require is used to make sure the user looking to purchase item has enough zoodle accumulated
  function purchaseItem3() public{
    require(zoodleBalances[msg.sender] >= 100000, "Balance is less than 100000");
    zoodleBalances[msg.sender] -= 100000;
    upgradeTotal[msg.sender] +=500;
     emit ItemPurchase(msg.sender, 100000);
  }

  /// @notice Used to purchase item4 in the shop
  /// @dev require is used to make sure the user looking to purchase item has enough zoodle accumulated
  function purchaseItem4() public{
    require(zoodleBalances[msg.sender] >= 1000000, "Balance is less than 1000000");
    zoodleBalances[msg.sender] -= 1000000;
    upgradeTotal[msg.sender] +=5000;
    emit ItemPurchase(msg.sender, 1000000);
  }

  /// @notice Used to claim a badge
  /// @dev require is used to make sure the user looking to claim the badge has enough Zoodle
  /// @param id the id of the badge that the user is looking to claim
  function claimBadge(uint256 id) public isUnowned(id){
    require(zoodleBalances[msg.sender] >= badges[id].price);
    badges[id].status = State.Owned;
    badges[id].badgeOwner = msg.sender;
    emit BadgeClaimed(msg.sender, id, badges[id].status,badges[id].price);
  }

}
