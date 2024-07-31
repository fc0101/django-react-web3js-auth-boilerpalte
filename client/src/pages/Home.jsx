import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';
import { ethers } from "ethers";

export default function Home() {
    const { user } = useAuth();
    const [balance, setBalance] = useState(0);
    const getUser = useUser()
    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getBalance()
    }, [user])

    const getBalance = async () => {
        try {
          const provider = new ethers.providers.InfuraProvider('mainnet', 'f0844cd0d2ac492db07d29e6324943ad');
          const balanceWei = await provider.getBalance(user.wallet_address);
          console.log(user.wallet_address);
          const balanceEther = ethers.utils.formatEther(balanceWei);
          setBalance(balanceEther);
        } catch (err) {
          setBalance(0);
        }
      };


    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? 'List user Ethereum balance: '+ balance : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}
