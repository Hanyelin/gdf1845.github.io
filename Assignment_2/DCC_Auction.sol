pragma solidity ^0.4.24;

contract DCCAuction {
    
    struct voter {
        address voterAddress;
        uint tokenBought;
        uint[] tokenUsedPerCandidate;
    }
    
    mapping (address => voter) public voters;       // ��ǥ�ڵ��� �ּ�
    mapping (bytes32 => uint) public highestVote; // �ĺ��� ��Ű�
    
    bytes32[] public candidateNames;                // �ĺ��� �迭
    
    uint public totalToken;                         // ��ū �� ����
    uint public balanceTokens;                      // ���� ��ū ��
    uint public tokenPrice;                         // ��ū ���� ex) 0.01 ether
    
    constructor(uint _totalToken, uint _tokenPrice) public // Tx ������ ȣ���� (token �Ѱ��� / token ����)
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
    
    function getCandidateIndex(bytes32 candidate) view public returns (uint) // �ش� �ĺ����� index ��ȯ
    {
        for(uint i=0; i < candidateNames.length; i++)
        {
            if(candidateNames[i] == candidate)
            {
                return i;
            }
        }
        
        return uint(-1); // �ĺ��ڰ� ���� ��� -1 ��ȯ
    }
    
    function getCandidatesInfo() view public returns (bytes32[]) // �ĺ��� �̸��� ��ȯ
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