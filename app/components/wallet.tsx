'use client'

import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import './wallet.css'
import WalletOptions from './wallet-options'

const Wallet = () => {
  const [visible, setVisible] = useState(false)

  // 第一个钱包的地址
  const [address, setAddress] = useState<string>('')

  const [isConnected, setIsConnected] = useState(false)

  // 第一次加载时, 判断是否连接了两个钱包之一, 优先展示 okx
  // okx 通过 getAccounts 判断, [] 或 ['地址']
  const initOption = async (): Promise<void> => {
    if (typeof window.okxwallet !== 'undefined') {
      const okxAccounts = await window.okxwallet.bitcoin.getAccounts()

      const unisatAccounts = await window.unisat.getAccounts()

      if (okxAccounts.length === 0 && unisatAccounts.length === 0) {
        setIsConnected(false)
      } else {
        setIsConnected(true)

        if (okxAccounts.length !== 0) {
          setAddress(okxAccounts[0])
        } else {
          setAddress(unisatAccounts[0])
        }
      }
    } else {
      console.log('OKX is not installed!')
    }
  }

  const connectSuccess = (address: string): void => {
    setAddress(address)
    setVisible(false)
    setIsConnected(true)
  }

  useEffect(() => {
    initOption()
  }, [])

  return (
    <div>
      <header className="wallet-header">
        <h1>作业2</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div>{address}</div>
          {isConnected ? (
            <Button
              onClick={() => {
                if (typeof window.okxwallet !== 'undefined') {
                  window.okxwallet.disconnect()
                  window.unisat.initialize()
                  setIsConnected(false)
                  setAddress('')
                }
              }}>
              断开连接
            </Button>
          ) : (
            <Button type="primary" onClick={() => setVisible(true)}>
              连接
            </Button>
          )}
          <Modal
            title="请选择您的钱包"
            open={visible}
            width={300}
            cancelText="关闭"
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={() => setVisible(false)}>
            <WalletOptions onConnectSuccess={connectSuccess} />
          </Modal>
        </div>
      </header>
      <main className="wallet-main">
        {isConnected ? '连接成功' : '请连接您的钱包'}
      </main>
    </div>
  )
}

export default Wallet
