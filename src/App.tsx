import './styles.css'

declare global {
  interface Window {
    ethereum: any
    imToken: any
    tronWeb: any
  }
}

const ethereum = window.ethereum
const imToken = window.imToken

const alert = imToken
  ? function (s: string) {
      imToken.callAPI('native.toastInfo', JSON.stringify(s))
    }
  : window.alert

const alertErr = (err: Error) => {
  alert(err.message)
}

const NETWORK_MAINNET = {
  chainId: '0x1',
}

const NETWORK_xDAI = {
  chainId: '0x64',
}

const wallet_switchEthereumChain_Mainnet = () => {
  return ethereum
    .request({
      method: 'wallet_switchEthereumChain',
      params: [NETWORK_MAINNET],
    })
    .then(() => {
      alert('Switch Ethereum Chain Successful')
    })
    .catch(alertErr)
}
const wallet_switchEthereumChain_xDAI = () => {
  return ethereum
    .request({
      method: 'wallet_switchEthereumChain',
      params: [NETWORK_xDAI],
    })
    .then(() => {
      alert('Switch Ethereum Chain Successful')
    })
    .catch(alertErr)
}

const methods = [
  {
    func: wallet_switchEthereumChain_Mainnet,
    name: 'wallet_switchEthereumChain_Mainnet',
    code: wallet_switchEthereumChain_Mainnet.toString(),
  },
  {
    func: wallet_switchEthereumChain_xDAI,
    name: 'wallet_switchEthereumChain_xDAI',
    code: wallet_switchEthereumChain_xDAI.toString(),
  },
]

export default function App() {
  return (
    <div className="App">
      <h3 id="h1">EIP-3326</h3>
      {methods.map(method => {
        return (
          <section key={method.name}>
            <button onClick={method.func}>{method.name}</button>
            <details>
              <summary>show code</summary>
              <pre>{method.code}</pre>
            </details>
          </section>
        )
      })}
    </div>
  )
}
