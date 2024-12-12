import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

export const Ethereum = ({ seed }: { seed: Buffer }) => {
    interface keypairs {
        publicKey: string,
        privateKey: string
    }
    const [ethWallet, setEthWallet] = useState<keypairs[]>([]);
    const [showSecretKey, setShowSecretKey] = useState(false);


    const addWallet = () => {
        const path = `m/44'/60'/${ethWallet.length}'/0'`;
        // ethers.Wallet.
        const hdNode = ethers.HDNodeWallet.fromSeed(seed)
        const childNode = hdNode.derivePath(path)
        const privateKey = childNode.privateKey;
        const wallet = new ethers.Wallet(privateKey);

        setEthWallet(prev => [...prev, { privateKey, publicKey: wallet.address }])

    }

    useEffect(() => {
        addWallet();
    }, [])
    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold'>Ethereum Wallet</p>
                <div className='flex items-center gap-8 px-4'>
                    <p onClick={addWallet} className='bg-black text-white text-sm px-4 py-2 rounded-lg cursor-pointer'>Add wallet</p>
                    <p className='bg-red-500 text-white text-sm px-4 py-2 rounded-lg cursor-pointer' onClick={() => setEthWallet([])}>clear wallet</p>
                </div>
            </div>
            <div >
                {ethWallet.map((wallet, index) => (
                    <div key={index} className='mt-10 border rounded-lg'>
                        <div className='flex justify-between items-center px-4'>
                            <p className='font-semibold text-xl py-4 '>Wallet {index + 1}:</p>
                            <img src="trash-delete-bin.svg" alt="" className='w-4 h-4 cursor-pointer active:scale-110' />
                        </div>
                        <div className='bg-gray-200 p-4 rounded-lg'>
                            <div className='my-2'>
                                <p className='font-bold'>Public Key</p>
                                <p className='text-gray-900 text-sm'>{wallet.publicKey}</p>
                            </div>
                            <div className='my-2'>
                                <p className='font-bold'>Private Key</p>
                                <div className='flex justify-between items-center gap-8'>
                                    <input type={showSecretKey ? "text" : "password"} className='truncate text-gray-900 text-sm outline-none cursor-none bg-gray-200 w-full' value={wallet.privateKey} onChange={() => { }} />
                                    <img src={showSecretKey ? "/eye.svg" : "eye-slash.svg"} alt="" className='w-4 h-4 cursor-pointer' onClick={() => setShowSecretKey((prev) => !prev)} />
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

