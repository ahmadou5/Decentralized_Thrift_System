import {useState, useEffect} from "react"
import {NavLink} from "react-router-dom"
import "../styles/appHeader.css"
import UserAccount from "./userAccount"
import {useWeb3React} from '@web3-react/core'
import {utils} from "ethers"
import logoWallet from "../assets/logo.png"
const AppHeader = ({handleDisplayWalletModal}) => {
    const {active,account,library, chainId} = useWeb3React()

    const [balance, setBalance] = useState()

    useEffect(() => {
        if (!!account && !!library) {
          let stale = false
    
          library.getBalance(account)
          .then(balance => {
            if (!stale) {
                setBalance(utils.formatEther(balance))
            }
          })
          .catch(() => {
              if (!stale) {
                setBalance(null)
              }
            })
    
          return () => {
            stale = true
            setBalance(undefined)
          }
        }
      }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
    return(
        <header className = "header-container">
            <div className = "logo-container">
                <img src = {logoWallet} alt = "logo" className = "logo" />
            </div>
            <nav className = "navigation">
                <ul>
                    <li>
                        <NavLink exact activeClassName = "active-navigation-link" to = "/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName = "active-navigation-link" to = "/app/swap">Swap</NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName = "active-navigation-link" to = "/app/purses">Purses</NavLink>
                    </li>
                </ul>
            </nav>
            <div className = "user-section">
                {active ? <UserAccount balance = {parseFloat(balance).toFixed(2)} address = {account} /> : <button onClick = {handleDisplayWalletModal}>Connect wallet</button>}
                
            </div>
        </header>
    );
}

export default AppHeader;