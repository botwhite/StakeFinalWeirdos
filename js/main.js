const NETWORK_ID = 137
var NFT_PRICE = null
var PRESALE_PRICE = null
var MAX_SUPPLY = null
var MAX_PRESALE_SUPPLY = null
var contract
var accounts
var web3
var spend;
var balance
var tokenbalance
var available
var mynft;
var currentAddr = null;
var balanceNFT
var IsAproba;
var IsAproba2;
var stake;
var TokenUser = 0;
var misNftsID = [];
var misNftsID2 = [];
var iddeltango;
let balanceStake;
let balanceStake2;
var TotalMinado;
var TotalMinado2;
var tokenContract;
var contract2
var totalstaked;
const NftsAddress = '0xAf5d3183de674004bCD656aFA2dACD3B31EB9696'
const NftsAddress2 = '0x6b01FEF520818A439d281cf7b03EE2e1e0A32c4A'
const stakeAddress = '0x783f9ABCfb2467389C10b20bD3751b0F610dDdF7'
const tokenAddress = '0xC586a4A0dB0bC1169d490b8FBF0633cC06d0f0d3' // mainnet busd

const NftsABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_initBaseURI","type":"string"},{"internalType":"string","name":"_initNotRevealedUri","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressMintedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseExtension","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftPerAddressLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notRevealedUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"onlyWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseExtension","type":"string"}],"name":"setBaseExtension","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_limit","type":"uint256"}],"name":"setNftPerAddressLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_notRevealedURI","type":"string"}],"name":"setNotRevealedURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setOnlyWhitelisted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newmaxMintAmount","type":"uint256"}],"name":"setmaxMintAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_users","type":"address[]"}],"name":"whitelistUsers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"whitelistedAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]
const NftsABI2 = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"string","name":"_initBaseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseExtension","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notRevealedUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reveal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseExtension","type":"string"}],"name":"setBaseExtension","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_newBaseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCost","type":"uint256"}],"name":"setCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_notRevealedURI","type":"string"}],"name":"setNotRevealedURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newmaxMintAmount","type":"uint256"}],"name":"setmaxMintAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]
const tokenAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const stakeABI = [{"inputs":[{"internalType":"contract IERC721","name":"_nftToken","type":"address"},{"internalType":"contract IERC721","name":"_nftToken2","type":"address"},{"internalType":"contract IERC20","name":"_erc20Token","type":"address"},{"internalType":"address","name":"_daoAdmin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"NftStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"NftUnStaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stakeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fromBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toBlock","type":"uint256"}],"name":"StakePayout","type":"event"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"ClaimTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"ClaimTokens2","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Nft1","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"stakedFromBlock","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Nft2","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"stakedFromBlock","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_mount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_mount2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"daoAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"erc20Token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCurrentStakeEarned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getCurrentStakeEarned2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStakeContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStakeNftBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStakeNftBalance2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"add","type":"address"}],"name":"myNfts","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"add","type":"address"}],"name":"myNfts2","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftToken","outputs":[{"internalType":"contract IERC721","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nftToken2","outputs":[{"internalType":"contract IERC721","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"playerNfts1","outputs":[{"internalType":"uint256","name":"mount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"playerNfts2","outputs":[{"internalType":"uint256","name":"mount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reclaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"stakeNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"stakeNFT2","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokensPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensPerBlock2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"unStakeNFT","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenId","type":"uint256[]"}],"name":"unStakeNFT2","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokensPerBlock","type":"uint256"},{"internalType":"uint256","name":"_tokensPerBlock2","type":"uint256"}],"name":"updateStakingReward","outputs":[],"stateMutability":"nonpayable","type":"function"}]

window.addEventListener('load', connectWallet)



function metamaskReloadCallback() {
  window.ethereum.on('accountsChanged', (accounts) => {
    document.getElementById("web3_message").textContent = "Accounts changed, realoading...";
    window.location.reload()
  })
  window.ethereum.on('networkChanged', (accounts) => {
    document.getElementById("web3_message").textContent = "Network changed, realoading...";
    window.location.reload()
  })
}

const getAccounts = async () => {
  metamaskReloadCallback()
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" })
    resolve(web3)
  } catch (error) {
    console.log(error)
  }
}

const getWeb3 = async () => {
  return new Promise((resolve, reject) => {
    if (document.readyState == "complete") {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        resolve(web3)
      } else {
        reject("must install MetaMask")
        document.getElementById("web3_message").textContent = "Error: Please install Metamask";
      }
    } else {
      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum)
          resolve(web3)
        } else {
          reject("must install MetaMask")
          document.getElementById("web3_message").textContent = "Error: Please install Metamask";
        }
      });
    }
  });
};

function handleRevertError(message) {
  alert(message)
}

async function getRevertReason(txHash) {
  const tx = await web3.eth.getTransaction(txHash)
  await web3.eth
    .call(tx, tx.blockNumber)
    .then((result) => {
      throw Error("unlikely to happen")
    })
    .catch((revertReason) => {
      var str = "" + revertReason
      json_reason = JSON.parse(str.substring(str.indexOf("{")))
      handleRevertError(json_reason.message)
    });
}

const getContract = async (web3) => {
  // const response = await fetch("./contracts/MinerGlobal.json");
  //const data = await response.json();

  const netId = await web3.eth.net.getId();
  //const deployedNetwork = data.networks[netId];
  tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
  contract = new web3.eth.Contract(NftsABI, NftsAddress);
  contract2 = new web3.eth.Contract(NftsABI2, NftsAddress2);
  stake = new web3.eth.Contract(stakeABI, stakeAddress);
  
  return contract
}

async function connectWallet() {
  getAccounts()
}

async function loadAccount() {

  accounts = await web3.eth.getAccounts()
  balance = await contract.methods.balanceOf(accounts[0]).call()
var  balance2 = await contract2.methods.balanceOf(accounts[0]).call()
  balanceStake = await stake.methods.myNfts(accounts[0]).call()
  balanceStake2 = await stake.methods.myNfts2(accounts[0]).call()
  totalstaked = await stake.methods.getStakeNftBalance().call()
  var totalstaked2 = await stake.methods.getStakeNftBalance2().call()
 
  //balanceNFT = await contract.methods.tokensOfOwner(accounts[0]).call()
  for(var i = 0; i < balance; i++){
    misNftsID[i] = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call();
  }
  for(var i = 0; i < balance2; i++){
    misNftsID2[i] = await contract2.methods.tokenOfOwnerByIndex(accounts[0], i).call();
  }
  //console.log(misNftsID)

  //es aprovado
  if(balance2 <= 0 && balanceStake2.length <= 0){
    $("#aprobar2").hide();
    $(".StakeSpecial").hide();
   
 

  }

  if(balance2 <= 0 && balanceStake2.length <= 0){
    $("#aprobarMN").hide();
    $(".StakeSpecialM").hide();
   
 

  }


  IsAproba = await contract.methods.isApprovedForAll(accounts[0], stakeAddress).call()
  if (IsAproba) {
    $("#aprobar").hide();
  }
   IsAproba2 = await contract2.methods.isApprovedForAll(accounts[0], stakeAddress).call()
  if (IsAproba2) {
    $("#aprobar2").hide();
  }
  IsAproba = await contract.methods.isApprovedForAll(accounts[0], stakeAddress).call()
  if (IsAproba) {
    $("#aprobarM").hide();
  }
  IsAproba2 = await contract2.methods.isApprovedForAll(accounts[0], stakeAddress).call()
  if (IsAproba2) {
    $("#aprobarMN").hide();
  }
  //console.log(IsAproba)

  for (let e = 0; e < misNftsID2.length; e++) {
    imgURL = "https://safe-nft-metadata-provider-3nbhr.ondigitalocean.app/metadata/" + misNftsID2[e] +".json"
    axios.get(imgURL)
      .then((response) => {
        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
        console.log(nftsMis)
        const nftdiv = document.getElementById("carousel-img1") 
        const insertarnft = document.createElement("div")
        insertarnft.classList.add("column")
        insertarnft.classList.add("is-one-quarter-desktop")
        insertarnft.classList.add("is-half-tablet")
       
        insertarnft.innerHTML=` 
        
        <div class="card is-loaded">
        <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
          <img src=${nftsMis}" alt="Psychopomp" />
        </div>
        <div class="card-description">
          <h2>Weirdo Special #${misNftsID2[e]}</h2>
          <a onclick="Stake2(${misNftsID2[e]}, 0)" class="boton azul">Stake</a >
          
        </div>
      </div>
        `; 


        nftdiv.appendChild(insertarnft) 
      })
      .catch(function (error) {
        // funci??n para capturar el error
        console.log(error);
      })
  }

  for (let e = 0; e < misNftsID2.length; e++) {
    imgURL = "https://safe-nft-metadata-provider-3nbhr.ondigitalocean.app/metadata/" + misNftsID2[e] +".json"
    axios.get(imgURL)
      .then((response) => {
        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
      
        const nftdiv = document.getElementById("carousel-img1-M") 
        const insertarnft = document.createElement("div")
        insertarnft.classList.add("column")
        insertarnft.classList.add("is-one-quarter-desktop")
        insertarnft.classList.add("is-half-tablet")
       
        insertarnft.innerHTML=` 
        
        <div class="card is-loaded">
        <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
          <img src=${nftsMis}" alt="Psychopomp" />
        </div>
        <div class="card-description">
          <h2>Weirdo Special #${misNftsID2[e]}</h2>
          <a onclick="Stake2(${misNftsID2[e]}, 0)" class="boton azul">Stake</a >
          
        </div>
      </div>
        `; 


        nftdiv.appendChild(insertarnft) 
      })
      .catch(function (error) {
        // funci??n para capturar el error
        console.log(error);
      })
  }


  for (let e = 0; e < misNftsID.length; e++) {
    imgURL = "https://uw-app-k5iwr.ondigitalocean.app/metadata/" + misNftsID[e] +".json"
    axios.get(imgURL)
      .then((response) => {
        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
        //console.log(nftsMis)
        const nftdiv = document.getElementById("carousel-img1") 
        const insertarnft = document.createElement("div")
        insertarnft.classList.add("column")
        insertarnft.classList.add("is-one-quarter-desktop")
        insertarnft.classList.add("is-half-tablet")
       
        insertarnft.innerHTML=` 
        
        <div class="card is-loaded">
        <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
          <img src=${nftsMis}" alt="Psychopomp" />
        </div>
        <div class="card-description">
          <h2>Weirdo #${misNftsID[e]}</h2>
          <a onclick="Stake(${misNftsID[e]}, 0)" class="boton azul">Stake</a >
          
        </div>
      </div>
        `; 


        nftdiv.appendChild(insertarnft) 
      })
      .catch(function (error) {
        // funci??n para capturar el error
        console.log(error);
      })
  }
//nfts 2

 

  for (let e = 0; e < misNftsID.length; e++) {
    imgURL = "https://uw-app-k5iwr.ondigitalocean.app/metadata/" + misNftsID[e] +".json"
    axios.get(imgURL)
      .then((response) => {
        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
        //console.log(nftsMis)
        const nftdiv = document.getElementById("carousel-img1-M") 
        const insertarnft = document.createElement("div")
        insertarnft.classList.add("column")
        insertarnft.classList.add("is-one-quarter-desktop")
        insertarnft.classList.add("is-half-tablet")
       
        insertarnft.innerHTML=` 
        
        <div class="card is-loaded">
        <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
          <img src=${nftsMis}" alt="Psychopomp" />
        </div>
        <div class="card-description">
          <h2>Weirdo #${misNftsID[e]}</h2>
          <a onclick="Stake(${misNftsID[e]})" class="boton azul">Stake</a >
          
        </div>
      </div>
        `; 

        nftdiv.appendChild(insertarnft) 
      })
      .catch(function (error) {
        // funci??n para capturar el error
        console.log(error);
      })
  }

 

  for (let e = 0; e < balanceStake.length; e++) {
    imgURL = "https://uw-app-k5iwr.ondigitalocean.app/metadata/" + balanceStake[e] +".json"
    axios.get(imgURL)
      .then((response) => {
   // console.log(imgURL)

        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
   
        stake.methods.getCurrentStakeEarned(balanceStake[e]).call().then(userBalance => {
          TotalMinado = web3.utils.fromWei(userBalance);
          TokenUser  = parseFloat(TokenUser) + parseFloat(TotalMinado) ;

          TotalMinado = parseFloat(TotalMinado).toFixed(3)
           
           const nftdiv = document.getElementById("carousel-img2-M") 
           const insertarnft = document.createElement("div")
           insertarnft.classList.add("column")
           insertarnft.classList.add("is-one-quarter-desktop")
           insertarnft.classList.add("is-half-tablet")
      
           insertarnft.innerHTML = ` 
           <div class="card is-loaded">
           <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
             <img src=${nftsMis}" alt="Psychopomp" />
           </div>
           <div class="card-description">
             <h2>Weirdo #${balanceStake[e]}</h2>
             <p>Total Mined ${TotalMinado}</p>
             <a onclick="UnStake(${balanceStake[e]})" class="boton azul">UnStake</a >
             
           </div>
         </div> 
       ` 
           nftdiv.appendChild(insertarnft) 
         })
         .catch(function (error) {
           // funci??n para capturar el error
           console.log(error);
         })

        }).catch((err) => {
          console.log(err)
        }); 
  }


  for (let e = 0; e < balanceStake.length; e++) {
    imgURL = "https://uw-app-k5iwr.ondigitalocean.app/metadata/" + balanceStake[e] +".json"
    axios.get(imgURL)
      .then((response) => {
    //console.log(imgURL)

        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
   
        stake.methods.getCurrentStakeEarned(balanceStake[e]).call().then(userBalance => {
          TotalMinado = web3.utils.fromWei(userBalance);
          /*  TokenUser  = parseFloat(TokenUser) + parseFloat(TotalMinado) ;*/

           TotalMinado = parseFloat(TotalMinado).toFixed(3)
           document.getElementById("Your_Reward").textContent = TokenUser.toFixed(2);
           document.getElementById("Your_Reward_M").textContent = TokenUser.toFixed(2);
          
           const nftdiv = document.getElementById("carousel-img2") 
           const insertarnft = document.createElement("div")
           insertarnft.classList.add("column")
           insertarnft.classList.add("is-one-quarter-desktop")
           insertarnft.classList.add("is-half-tablet")
      
           insertarnft.innerHTML = ` 
           <div class="card is-loaded">
           <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
             <img src=${nftsMis}" alt="Psychopomp" />
           </div>
           <div class="card-description">
             <h2>Weirdo #${balanceStake[e]}</h2>
             <p>Total Mined ${TotalMinado}</p>
             <a onclick="UnStake(${balanceStake[e]})" class="boton azul">UnStake</a >
             
           </div>
         </div> 
       ` 
           nftdiv.appendChild(insertarnft) 
         })
         .catch(function (error) {
           // funci??n para capturar el error
           console.log(error);
         })

        }).catch((err) => {
          console.log(err)
        }); 
  }


  for (let e = 0; e < balanceStake2.length; e++) {
    imgURL = "https://safe-nft-metadata-provider-3nbhr.ondigitalocean.app/metadata/" + balanceStake2[e] +".json"
    axios.get(imgURL)
      .then((response) => {
    //console.log(imgURL)
        
        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
   
        stake.methods.getCurrentStakeEarned2(balanceStake2[e]).call().then(userBalance2 => {
          
          var TotalMinado2 = web3.utils.fromWei(userBalance2);
          
          TokenUser  = parseFloat(TokenUser) + (parseFloat(TotalMinado2) * 10);
          TotalMinado2 = parseFloat(TotalMinado2*10).toFixed(3)

        

          document.getElementById("Your_Reward").textContent = TokenUser.toFixed(2);
          document.getElementById("Your_Reward_M").textContent = TokenUser.toFixed(2);
           const nftdiv = document.getElementById("carousel-img3") 
           const insertarnft = document.createElement("div")
           insertarnft.classList.add("column")
           insertarnft.classList.add("is-one-quarter-desktop")
           insertarnft.classList.add("is-half-tablet")
      
           insertarnft.innerHTML = ` 
           <div class="card is-loaded">
           <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
             <img src=${nftsMis}" alt="Psychopomp" />
           </div>
           <div class="card-description">
             <h2>Special Weirdo #${balanceStake2[e]}</h2>
             <p>Total Mined ${TotalMinado2}</p>
             <a onclick="UnStake2(${balanceStake2[e]})" class="boton azul">UnStake</a >
             
           </div>
         </div> 
       ` 
           nftdiv.appendChild(insertarnft) 
         })
         .catch(function (error) {
           // funci??n para capturar el error
           console.log(error);
         })

        }).catch((err) => {
          console.log(err)
        }); 
  }
  for (let e = 0; e < balanceStake2.length; e++) {
    imgURL = "https://safe-nft-metadata-provider-3nbhr.ondigitalocean.app/metadata/" + balanceStake2[e] +".json"
    axios.get(imgURL)
      .then((response) => {
    //console.log(imgURL)
        
        // funci??n que se ejecutar?? al recibir una respuesta
        var nftsMis = response.data.image
   
        stake.methods.getCurrentStakeEarned2(balanceStake2[e]).call().then(userBalance2 => {
          
          var TotalMinado2 = web3.utils.fromWei(userBalance2);
        
          TotalMinado2 = parseFloat(TotalMinado2*10).toFixed(3)
          
          document.getElementById("Your_Reward").textContent = TokenUser.toFixed(2);
          document.getElementById("Your_Reward_M").textContent = TokenUser.toFixed(2);
           const nftdiv = document.getElementById("carousel-img3-M") 
           const insertarnft = document.createElement("div")
           insertarnft.classList.add("column")
           insertarnft.classList.add("is-one-quarter-desktop")
           insertarnft.classList.add("is-half-tablet")
      
           insertarnft.innerHTML = ` 
           <div class="card is-loaded">
           <div class="card-image is-loaded"  style="background-image: url(${nftsMis})" data-image-full="${nftsMis}">
             <img src=${nftsMis}" alt="Psychopomp" />
           </div>
           <div class="card-description">
             <h2>Special Weirdo #${balanceStake2[e]}</h2>
             <p>Total Mined ${TotalMinado2}</p>
             <a onclick="UnStake2(${balanceStake2[e]})" class="boton azul">UnStake</a >
             
           </div>
         </div> 
       ` 
           nftdiv.appendChild(insertarnft) 
         })
         .catch(function (error) {
           // funci??n para capturar el error
           console.log(error);
         })

        }).catch((err) => {
          console.log(err)
        }); 
  }

  tokenContract.methods.balanceOf(accounts[0]).call().then(userBalance => {
    let amt = web3.utils.fromWei(userBalance);

  }).catch((err) => {
    console.log(err)
  });

  tokenContract.methods.allowance(accounts[0], NftsAddress).call().then(result => {
    spend = web3.utils.fromWei(result)
    if (spend > 0) {
      // alert(spend)
    }
  }).catch((err) => {
    console.log(err)
  }); 


  currentAddr = accounts[0]
  var connectedAddr = currentAddr[0] + 
  currentAddr[1] + 
  currentAddr[2] + 
  currentAddr[3] + 
  currentAddr[4] + '...' +
  currentAddr[currentAddr.length-5] + 
  currentAddr[currentAddr.length-4] + 
  currentAddr[currentAddr.length-3] + 
  currentAddr[currentAddr.length-2] + 
  currentAddr[currentAddr.length-1]

    console.log(connectedAddr)
    document.getElementById("Your_Weirdos").textContent = parseFloat(balance) + parseFloat(balance2);
    document.getElementById("Staked").textContent = parseFloat(balanceStake.length)  + parseFloat(balanceStake2.length) ;
    document.getElementById("Total_Stake").textContent =  parseFloat(totalstaked) + parseFloat(totalstaked2);
    document.getElementById("connected").textContent = connectedAddr;
    document.getElementById("connected2").textContent = connectedAddr;


    document.getElementById("Your_Weirdos_M").textContent = parseFloat(balance) + parseFloat(balance2);
    document.getElementById("Staked_M").textContent = parseFloat(balanceStake.length)  + parseFloat(balanceStake2.length);
    document.getElementById("Total_Stake_M").textContent = parseFloat(totalstaked) + parseFloat(totalstaked2);
    
  }


async function loadDapp() {

  var awaitWeb3 = async function () {
    web3 = await getWeb3()
    web3.eth.net.getId((err, netId) => {
      if (netId == NETWORK_ID) {
        $("#nft-en-stake").hide();
        $("#nftspecials").hide();
        $("#nftspecialsM").hide();
        $("#StakeAllSpecial").hide();
        $("#StakeAllSpecialM").hide();
        $("#nft-en-stake-M").hide();
        $("#ClaimSpecials").hide();
        $("#ClaimSpecialsM").hide();


        var awaitContract = async function () {
          contract = await getContract(web3);
       
          total_mint = await contract.methods.totalSupply().call()
          
          web3.eth.getAccounts(function (err, accounts) {
            if (err != null)
              console.error("An error occurred: " + err);
            else if (accounts.length == 0)
              console.log("User is not logged in to MetaMask");
            else {
              loadAccount()
            }
          });
        };
        awaitContract();
      } else {
        //document.getElementById("web3_message").textContent = "Please connect to Binance smart chain";
      }
    });
  };
  awaitWeb3();
}

loadDapp()





//APROVAR
const NftApro = async () => {
  const result = await contract.methods.setApprovalForAll(stakeAddress, true)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .catch((revertReason) => {

    });
}

const NftApro2 = async () => {
  const result = await contract2.methods.setApprovalForAll(stakeAddress, true)
    .send({ from: accounts[0], gas: 0, value: 0 })
    .catch((revertReason) => {

    });
}

//staker all
const StakeALL = async () => {

  stake.methods.stakeNFT(misNftsID).send({ from: accounts[0] }).then(result => {
  loadDapp() 
  }).catch((err) => {
    console.log(err)
  });


}
const StakeALL2 = async () => {

  stake.methods.stakeNFT2(misNftsID2).send({ from: accounts[0] }).then(result => {
  loadDapp() 
  }).catch((err) => {
    console.log(err)
  });


}

//staker 
const Stake = async (_idnfts) => {


  stake.methods.stakeNFT([_idnfts]).send({ from: accounts[0] }).then(result => {
    loadDapp()

  }).catch((err) => {
    console.log(err)
  });


}
const Stake2 = async (_idnfts) => {


  stake.methods.stakeNFT2([_idnfts]).send({ from: accounts[0] }).then(result => {
    loadDapp()

  }).catch((err) => {
    console.log(err)
  });


}

//Unstaker all
const UnStakeALL = async () => {
console.log(balanceStake)
  
  stake.methods.unStakeNFT(balanceStake).send({ from: accounts[0] }).then(result => {
    loadDapp()

  }).catch((err) => {
    console.log(err)
  });


}


const UnStakeALL2 = async () => {
 
  stake.methods.unStakeNFT2(balanceStake2).send({ from: accounts[0] }).then(result => {
    loadDapp()

  }).catch((err) => {
    console.log(err)
  });


}
const Claim = async () => {
 
  stake.methods.ClaimTokens(balanceStake).send({ from: accounts[0] }).then(result => {
  loadDapp() 
  }).catch((err) => {
    console.log(err)
  });


}

const Claim2 = async () => {
  
  stake.methods.ClaimTokens2(balanceStake2).send({ from: accounts[0] }).then(result => {
  loadDapp() 
  }).catch((err) => {
    console.log(err)
  });


}



//Unstaker 
const UnStake = async (_idnfts) => {


  stake.methods.unStakeNFT([_idnfts]).send({ from: accounts[0] }).then(result => {
    loadDapp()

  }).catch((err) => {
    console.log(err)
  });


}
//Unstaker 
const UnStake2 = async (_idnfts) => {


  stake.methods.unStakeNFT2([_idnfts]).send({ from: accounts[0] }).then(result => {
    loadDapp()

  }).catch((err) => {
    console.log(err)
  });


}

function NoStake(){ 
  $("#InStake").removeClass( "is-active");
  $("#nft-en-stake-specials").removeClass( "is-active");
  $("#NoStake").addClass("is-active");
  $("#nft-en-stake").hide();
  $("#nft-no-stake").show();
  $("#nftspecials").hide();
  $("#StakeAllSpecial").hide();
  $("#StakeAllnormal").show();
  $("#ClaimSpecials").hide();
  $("#ClaimNormal").show();

 

}
function InStake(){ 
  $("#NoStake").removeClass( "is-active");
  $("#nft-en-stake-specials").removeClass( "is-active");

  $("#InStake").addClass("is-active");
  $("#nft-no-stake").hide();
  $("#nft-en-stake ").show(); 
  $("#nftspecials").hide();
  $("#StakeAllSpecial").hide();
  $("#StakeAllnormal").show();
  $("#ClaimSpecials").hide();
  $("#ClaimNormal").show();



}
function InStakeSpecials(){ 
  $("#NoStake").removeClass( "is-active");
  $("#InStake").removeClass( "is-active");
  $("#nft-en-stake-specials").addClass("is-active");
  $("#nft-no-stake").hide();
  $("#nft-en-stake").hide();
  $("#nftspecials").show(); 
  $("#StakeAllSpecial").show();
  $("#StakeAllnormal").hide();
  $("#ClaimNormal").hide();
  $("#ClaimSpecials").show();

}


function NoStakeM(){ 
  $("#InStakeM").removeClass( "is-active");
  $("#nft-en-stake-specialsM").removeClass( "is-active");
  $("#NoStakeM").addClass("is-active");
  $("#nft-en-stake-M").hide();
  $("#nftspecialsM").hide();
  $("#nft-no-stake-M").show();
  $("#ClaimSpecialsM").hide();
  $("#ClaimNormalM").show();

  $("#StakeAllSpecialM").hide();
  $("#StakeAllnormalM").show();
}
function InStakeM(){ 
  $("#NoStakeM").removeClass( "is-active");
  $("#nft-en-stake-specialsM").removeClass( "is-active");
  $("#InStakeM").addClass("is-active");
  $("#nft-no-stake-M").hide();
  $("#nftspecialsM").hide();
  $("#nft-en-stake-M").show(); 
  $("#ClaimSpecialsM").hide();
  $("#ClaimNormalM").show();
  
  $("#StakeAllSpecialM").hide();
  $("#StakeAllnormalM").show();

}
function StakeSpecialM(){ 
  $("#NoStakeM").removeClass( "is-active");
  $("#InStakeM").removeClass( "is-active");

  $("#nft-en-stake-specialsM").addClass("is-active");
  $("#nft-no-stake-M").hide();
  $("#nft-en-stake-M").hide();
  $("#nftspecialsM").show(); 
  $("#ClaimSpecialsM").show();
  $("#ClaimNormalM").hide();

  
  $("#StakeAllSpecialM").show();
  $("#StakeAllnormalM").hide();

}



var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

