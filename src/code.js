pragma solidity >= 0.7.0 <0.9.0;

interface IERC20Token {
	function transfer(address, uint256) external returns (bool);
	function approve(address, uint256) external returns (bool);
	function transferFrom(address, address, uint256) external returns (bool);
	function totalSupply() external view returns (uint256);
	function balanceOf(address) external view returns (uint256);
	allowance(address, address) external view returns (uint256);

	event Transfer(address indexed from, address indexed to, uint256 value);
	event Approval(address indexed owner, address index spender, uint256 value);
}

contract Shopping {
	
	struct product {
		address payable owner;
		string memory name;
		string memory imageUrl;
		uint amount;
	}

	address internal admin;
    constructor (){
        admin = 0xE2a0411465fd913502A8390Fe22DC7004AC47A04;
    }

    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    mapping(uint => Card) cards;
    uint cardLength = 0;

    function buyProduct(uint _index)public payable{
        require(
                IERC20Token(cUsdTokenAddress).transferFrom(
                    msg.sender,
                    cards[_index].owner,
                    cards[_index].amount * 3
            ),
            "Transaction could not be performed"
        );
        cards[_index].owner = payable(msg.sender);
    }
}