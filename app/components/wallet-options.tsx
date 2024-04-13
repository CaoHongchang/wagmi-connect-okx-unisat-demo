import { Button } from 'antd'
import * as React from 'react'
import { useState } from 'react'

/**
 * 1.连接时, loading
 * 2.连接完成, 关闭弹窗, 刷新地址, 更新按钮
 */

interface IProps {
  onConnectSuccess: (address: string) => void
}

export default function WalletOptions({ onConnectSuccess }: IProps) {
  const [loading, setLoading] = useState(false)

  const connectWallet = async (
    func: () => Promise<string[]>
  ): Promise<void> => {
    setLoading(true)
    try {
      const res = await func()
      setLoading(false)
      onConnectSuccess(res[0])
    } catch (error) {
      setLoading(false)
    }
  }

  const connectOkxBitcoin = async (): Promise<string[]> => {
    let accounts: string[] = []
    if (typeof window.okxwallet !== 'undefined') {
      try {
        accounts = await window.okxwallet.bitcoin.requestAccounts()
      } catch (error) {
        throw error
      }
    } else {
      console.log('OKX is not installed!')
    }
    return accounts
  }

  const connectUnisat = async (): Promise<string[]> => {
    let accounts: string[] = []
    if (typeof window.unisat !== 'undefined') {
      try {
        accounts = await window.unisat.requestAccounts()
      } catch (error) {
        throw error
      }
    } else {
      console.log('Unisat is not installed!')
    }
    return accounts
  }

  return (
    <div
      style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
      }}>
      <Button
        style={{ width: '100%' }}
        type="primary"
        loading={loading}
        onClick={() => connectWallet(connectOkxBitcoin)}>
        okx-bitcoin
      </Button>

      <Button
        style={{ width: '100%' }}
        loading={loading}
        type="primary"
        onClick={() => connectWallet(connectUnisat)}>
        unisat
      </Button>
    </div>
  )
}
