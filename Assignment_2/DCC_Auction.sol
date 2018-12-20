pragma solidity ^0.4.24;

contract DCCAuction {
    
    struct voter {
        address voterAddress;
        uint tokenBought;
        uint[] tokenUsedPerCandidate;
    }
    
    mapping (address => voter) public voters;       // 투표자들의 주소
    mapping (bytes32 => uint) public highestVote; // 후보자 경매가
    
    bytes32[] public candidateNames;                // 후보자 배열
    
    uint public totalToken;                         // 토큰 총 개수
    uint public balanceTokens;                      // 남은 토큰 수
    uint public tokenPrice;                         // 토큰 가격 ex) 0.01 ether
    
    constructor(uint _totalToken, uint _tokenPrice) public // Tx 생성시 호출자 (token 총개수 / token 가격)
    {
        totalToken = _totalToken;
        balanceTokens = _totalToken;
        tokenPrice = _tokenPrice;
        
        candidateNames.push("iphone7");
        candidateNames.push("iphone8");
        candidateNames.push("iphoneX");
        candidateNames.push("galaxyS9");
        candidateNames.push("galaxyNote9");
        candidateNames.push("LGG7");
    }
    
    function buy() payable public returns (int) 
    {
        uint tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy <= balanceTokens);
        voters[msg.sender].voterAddress = msg.sender;
        voters[msg.sender].tokenBought += tokensToBuy;
        balanceTokens -= tokensToBuy;
    }
    
    function getHighestVotes() view public returns (uint, uint, uint, uint, uint, uint)
    {
        return (highestVote["iphone7"],
        highestVote["iphone8"],
        highestVote["iphoneX"],
        highestVote["galaxyS9"],
        highestVote["galaxyNote9"],
        highestVote["LGG7"]);
    }
    
    function vote(bytes32 candidateName, uint tokenCountForVote) public
    {
        uint index = getCandidateIndex(candidateName);
        require(index != uint(-1));
        
        require(tokenCountForVote <= voters[msg.sender].tokenBought);
        
        voters[msg.sender].tokenBought -= tokenCountForVote;
        voters[msg.sender].tokenUsedPerCandidate[index] += tokenCountForVote;
        
        if(highestVote[candidateName] < voters[msg.sender].tokenUsedPerCandidate[index])
            highestVote[candidateName] = voters[msg.sender].tokenUsedPerCandidate[index];
    }
    
    function getCandidateIndex(bytes32 candidate) view public returns (uint) // 해당 후보자의 index 반환
    {
        for(uint i=0; i < candidateNames.length; i++)
        {
            if(candidateNames[i] == candidate)
            {
                return i;
            }
        }
        
        return uint(-1); // 후보자가 없는 경우 -1 반환
    }
    
    function getCandidatesInfo() view public returns (bytes32[]) // 후보자 이름들 반환
    {
        return candidateNames;
    }
    
    function getTotalToken() view public returns(uint)
    {
        return totalToken;
    }
    
    function getBalanceTokens() view public returns(uint)
    {
        return balanceTokens;
    }
    
    function getTokenPrice() view public returns(uint)
    {
        return tokenPrice;
    }
    
    function getTokenBought() view public returns(uint)
    {
        return voters[msg.sender].tokenBought;
    }
}