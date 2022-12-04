import React, {useState, useEffect} from 'react'

export default function Manager({state}) {
    const [account, setAccount] = useState('');
    const [contractBalance, setContractBalance] = useState(0);
    const [winner, setWinner] = useState('No winner yet');

    //This function is provided by metamask
    const setAccountListener = (provider) =>{//automatically re renders the accounts when changed
        provider.on("accountsChanged",(accounts)=>{
            setAccount(account[0]);
        })
    }
    useEffect(() => {
      const getAccount = async()=>{
        const {web3} = state;

        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setAccountListener(web3.givenProvider);
        setAccount(accounts[0]);
      }
      state.web3 && getAccount();//we only run getAccount() when we have web3 instance
    }, [state,state.web3])

    const contractBalanceFun = async() => {
        const {contract} = state;

        try{
            const balance = await contract.methods.balance().call({from: account});
            setContractBalance(balance);
        }catch(err){
            setContractBalance("You are not the manager");
        }
    }

    const winnerFun = async ()=>{
        const {contract} = state;

        try{
            await contract.methods.pickWinner().send({from: account});
            const lotteryWinner = await contract.methods.winner().call();
            setWinner(lotteryWinner);
        }catch(err){
            if(err.message.includes("You are not the manager")){
                setWinner("You are not the mananger");
            }
            else if(err.message.includs("Players are < 3")){
                setWinner("Players are < 3")
            }
            else{
                setWinner("No winner yet"); 
            }
        }
    }
    
  return (
    <><div className='text-center'>
    <b>Connected Account: </b>{account?account:"Not connected"}
    <br />
    <b>Winner:</b> {winner} 
    <br />
    <button className="btn btn-secondary" onClick={()=> winnerFun()}>Click for Winner:</button>
    <br />
    <b>Contract Balance:</b> {contractBalance} ETH
    <br />
    <button className="btn btn-secondary" onClick={()=> contractBalanceFun()}>Get contract Balance</button>
    </div>
    </>

  )
}
