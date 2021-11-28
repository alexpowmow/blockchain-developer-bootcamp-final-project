

console.log("Test phrase");

totalZoodle = 0;
upgradeTracker = 5;

window.addEventListener('load', function(){
    displayNewMiningPower(upgradeTracker);
    if(typeof window.ethereum !== 'undefined'){
        let mmDetected = document.getElementById('mm-detected');
        mmDetected.innerHTML = "None";
        var web3 = new Web3(window.ethereum);
       
    }else{
        let mmDetected = document.getElementById('mm-detected');
        mmDetected.innerHTML = "MetaMask Not Detected";
       
    }
    
});


var web3 = new Web3(window.ethereum);


mmEnable = document.getElementById('mm-connect');
var accounts;
mmEnable.onclick = async () =>{
    console.log('beep!');
    await ethereum.request({method:'eth_requestAccounts'});
    var mmDetected = document.getElementById('mm-detected');
    accounts = await ethereum.request({ method: 'eth_accounts' })
    mmDetected.innerHTML = accounts[0];
    var metaButton = document.getElementById('mm-connect').className = "isMetaConnected";
    //$(metaButton).removeClass('notMetaConnected');
    let metaButtonText = document.getElementById('mm-connect');
    metaButtonText.innerHTML = "MetaMask Connected";
   
}


const testContractAddress = '0x01bd6231e7F90c0BA5c9d146ABbb669907046c60';
const testContractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getZoodle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getUpgrades",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "zoodleAccrued",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "upgradesAccrued",
        "type": "uint256"
      }
    ],
    "name": "saveProfile",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "purchaseItem1",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "purchaseItem2",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "purchaseItem3",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "purchaseItem4",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
  ];

const testContract = new web3.eth.Contract(testContractAbi, testContractAddress);
testContract.setProvider(window.ethereum);

getZoodle = document.getElementById("getZoodleButton");

    getZoodle.onclick = async() =>{
        var tempCheck;
        newZoodle = await testContract.methods.getZoodle().call({from: accounts[0]});
        tempCheck = parseInt(newZoodle);
        if(tempCheck ==0){
            alert("No Zoodle Found");
        }else{
            loadData();
        }
    // var web3 = new Web3(window.ethereum);
    //var accounts = await ethereum.request({ method: 'eth_accounts' })
    
    }

setZoodle = document.getElementById("setZoodleButton");

    setZoodle.onclick = async() =>{

        //var web3 = new Web3(window.ethereum);
        
        //var accounts = await ethereum.request({ method: 'eth_accounts' })
        await testContract.methods.saveProfile(totalZoodle,upgradeTracker).send({from: accounts[0]});
        console.log(totalZoodle);
    }

axeStrength = document.getElementById("axeStrength");
    axeStrength.onclick = async() =>{
        if(totalZoodle >= 100){
            await testContract.methods.purchaseItem1().send({from: accounts[0]});
            loadData();
        } else{
            alert("Insufficient funds");
        }
        
    }

drillStrength = document.getElementById("drillStrength");
    drillStrength.onclick = async() =>{
        if(totalZoodle >= 1000){
            await testContract.methods.purchaseItem2().send({from: accounts[0]});
            loadData();
        }else{
            alert("Insufficient funds");
        }
    }

housingCapacity = document.getElementById("housingCapacity");
    housingCapacity.onclick = async() =>{
        if(totalZoodle>= 100000){
            await testContract.methods.purchaseItem3().send({from: accounts[0]});
            loadData();
        }else{
            alert("Insufficient funds");
        }
    }

transportTechnology = document.getElementById("transportTechnology");
    transportTechnology.onclick = async() =>{
        if(totalZoodle >= 1000000){
            await testContract.methods.purchaseItem4().send({from: accounts[0]});
            loadData();
        } else{
            alert("Insufficient funds");
        }
    }

clicka = document.getElementById("clicka");
    clicka.onclick = async() =>{
        increaseCount(upgradeTracker);
        displayNewAmount(totalZoodle);
        console.log(totalZoodle);
    }

function increaseCount(increaseAmount){
    totalZoodle += increaseAmount;
}

async function loadData(){
    var newZoodle = totalZoodle;
    var newUpgrade = upgradeTracker;
    newZoodle = await testContract.methods.getZoodle().call({from: accounts[0]});
    totalZoodle = parseInt(newZoodle);
    newUpgrade = await testContract.methods.getUpgrades().call({from: accounts[0]});
    upgradeTracker = parseInt(newUpgrade);
    displayNewAmount(totalZoodle);
    displayNewMiningPower(upgradeTracker)
    console.log(totalZoodle);
    console.log(upgradeTracker);
}

function displayNewAmount(totalZoodle){
    zoodleTracker = document.getElementById("totalCount");
    zoodleTracker.innerHTML = totalZoodle;
}

function displayNewMiningPower(upgradeTracker){
    newMining = document.getElementById("miningPower");
    newMining.innerHTML = upgradeTracker + "<br>";
}
