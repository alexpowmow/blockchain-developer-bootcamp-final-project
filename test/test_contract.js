const TestContract = artifacts.require("TestContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TestContract", function (accounts) {
  it("should assert true", async function () {
    await TestContract.deployed();
    return assert.isTrue(true);
  });

  it("Check that badges have correct price", async () =>{
    const ssInstance = await TestContract.deployed();
    const badge0 = await ssInstance.getBadge(0);
    const badge1 = await ssInstance.getBadge(1); 
    const badge2 = await ssInstance.getBadge(2);
    assert.equal(badge0[1], 100, "Initial value is not set to 100");
    assert.equal(badge1[1], 100000, "Initial value is not set to 100000");
    assert.equal(badge2[1], 1000000, "Initial value is not set to 1000000");
  });

  describe("Functionality", () => {
    it("Should save users Zoodle and Mining power", async () =>{
      
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(150000, 50);

      const miningPower = await ssInstance.getUpgrades();
      const totalZoodle = await ssInstance.getZoodle();

      assert.equal(totalZoodle, 150000, `Total Zoodle not properly stored` );
      assert.equal(miningPower, 50, `Mining Power not properly stored`);
    });

  });


  describe("Zoodle Airdrop", () => {

    it("Should reject malicious user", async () =>{
      const [owner, badJoe] = accounts;
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(150000, 50,{from: badJoe});
      try{
        await ssInstance.giftZoodle(badJoe, 550000, {from: badJoe});
      }catch(err){
      }
      
      const totalZoodle = await ssInstance.getZoodle({from: badJoe});

      assert.equal(totalZoodle, 150000, `Zoodle was airdropped` );
     
    });

    it("Should airdrop a certain amount of zoodle to specified address", async () =>{
      const [owner, badJoe] = accounts;
      const ssInstance = await TestContract.deployed();
      await ssInstance.giftZoodle(badJoe, 550000, {from: owner});

      
      const totalZoodle = await ssInstance.getZoodle({from: badJoe});

      assert.equal(totalZoodle, 550000, `Zoodle not airdropped` );
     
    });

  });

  describe("Purchasing Items", () => {

    it("Should reject purchase of Item due to insufficient funds" , async () =>{
      
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(99, 50);
      try{
        await ssInstance.purchaseItem1();
      } catch(err){
      }
      

      const miningPower = await ssInstance.getUpgrades();
      const totalZoodle = await ssInstance.getZoodle();

      assert.equal(totalZoodle, 99, `Total Zoodle not properly deducted` );
      assert.equal(miningPower, 50, `Mining Power not properly increased`);
    });

    it("Should decrease total zoodle by 100 and increase mining power by 5", async () =>{
      
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(1500000, 50);
      await ssInstance.purchaseItem1();

      const miningPower = await ssInstance.getUpgrades();
      const totalZoodle = await ssInstance.getZoodle();

      assert.equal(totalZoodle, 1499900, `Total Zoodle not properly deducted` );
      assert.equal(miningPower, 55, `Mining Power not properly increased`);
    });

    it("Should decrease total zoodle by 1000 and increase mining power by 50", async () =>{
      
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(1500000, 50);
      await ssInstance.purchaseItem2();

      const miningPower = await ssInstance.getUpgrades();
      const totalZoodle = await ssInstance.getZoodle();

      assert.equal(totalZoodle, 1499000, `Total Zoodle not properly deducted` );
      assert.equal(miningPower, 100, `Mining Power not properly increased`);
    });

    it("Should decrease total zoodle by 100000 and increase mining power by 500", async () =>{
      
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(1500000, 50);
      await ssInstance.purchaseItem3();

      const miningPower = await ssInstance.getUpgrades();
      const totalZoodle = await ssInstance.getZoodle();

      assert.equal(totalZoodle, 1400000, `Total Zoodle not properly deducted` );
      assert.equal(miningPower, 550, `Mining Power not properly increased`);
    });


    it("Should decrease total zoodle by 1000000 and increase mining power by 5000", async () =>{
      
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(1500000, 50);
      await ssInstance.purchaseItem4();

      const miningPower = await ssInstance.getUpgrades();
      const totalZoodle = await ssInstance.getZoodle();

      assert.equal(totalZoodle, 500000, `Total Zoodle not properly deducted` );
      assert.equal(miningPower, 5050, `Mining Power not properly increased`);
    });
  });

  describe("Badge Claims", () => {
    it("Should reject badge claim", async () =>{
      
      const ssInstance = await TestContract.deployed();
      await ssInstance.saveProfile(999999, 50);

      const miningPower = await ssInstance.getUpgrades();
      const totalZoodle = await ssInstance.getZoodle();

      try{
       await ssInstance.claimBadge(2);
      }catch(err){
      
      }

      const badge2 = await ssInstance.getBadge(2);
      const state = badge2[2]

      assert.equal(state, 1, `Badge not properly claimed` );
    });

  it("Should claim badge and change state to owned" , async () =>{
      
    const ssInstance = await TestContract.deployed();
    await ssInstance.saveProfile(999999, 50);

    const miningPower = await ssInstance.getUpgrades();
    const totalZoodle = await ssInstance.getZoodle();

    
    await ssInstance.claimBadge(1);
    

    const badge1 = await ssInstance.getBadge(1);
    const state = badge1[2]

    assert.equal(state, 0, `Badge not properly claimed` );
  });
});




});
