import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export default function MyAccount() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  // if (typeof window.okxwallet !== 'undefined') {
  //   console.log('OKX is installed!')
  // } else {
  //   console.log('OKX is not installed!')
  // }

  return (
    <div>
      {/* {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />} */}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}
