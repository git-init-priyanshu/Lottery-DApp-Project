import React, {useState, useEffect} from 'react'

export default function Players({state, address}) {

  const [account, setAccount] = useState('No account connected');
  const [regisPlayers, setRegisPlayers] = useState([]);

  //This function is provided by metamask
  const setAccountListener = (provider) =>{//automatically re renders the accounts when changed
    provider.on("accountsChanged",(accounts)=>{
        setAccount(account[0]);
    })
}

  useEffect(() => {
    const getAccounts = async ()=>{
      const {web3} = state;
      const accounts = await web3.eth.getAccounts();
      setAccountListener(web3.givenProvider);
      setAccount(accounts[0]);
    }
    state.web3 && getAccounts();

  }, [state,state.web3])

  useEffect(() => {
    const getPlayers = async ()=>{
      const {contract} = state;
      const players = await contract.methods.allPlayers().call();
      const regisPlayers = await Promise.all(
        players.map((player)=>{
          return player;
        })
      )
      setRegisPlayers(regisPlayers);
    }
    state.contract && getPlayers();
  }, [state, state.contract])
  
  return (
    <><div className='text-center'>
    <b>Connected Account: </b>{account?account:"Not connected"}
    <br />
    <b>
    Please pay 1 eth on this contract address :</b> {address} 
    
    <br />
    {/* <button className="btn btn-secondary" onClick={()=> winnerFun()}>Click for Winner:</button> */}
    <br />
    <p> <b> Registered Players:</b></p>
    {regisPlayers.length!==0 && regisPlayers.map((name) =>
      <p key = {name}>{name}</p>
    )}
    </div>
    </>
  )
}
