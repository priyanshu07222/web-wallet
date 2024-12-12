

import React, { useEffect, useState } from 'react';
import nacl from 'tweetnacl';
import { derivePath } from "ed25519-hd-key";
import * as web3 from '@solana/web3.js';
import bs58 from 'bs58';

export const Solana = ({ seed }: { seed: Buffer }) => {
    interface keypairs {
        publicKey: string,
        privateKey: string
    }
    const [solWallet, setSolWallet] = useState<keypairs[]>([]);
    const [showSecretKey, setShowSecretKey] = useState(false);


    const addWallet = () => {
        const path = `m/44'/501'/${solWallet.length}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
        const privateKey = bs58.encode(secret)
        const publicKey = web3.Keypair.fromSecretKey(secret).publicKey.toBase58();
        setSolWallet(prev => [...prev, { privateKey, publicKey }])

    }

    useEffect(() => {
        addWallet();
    }, [])
    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold'>Solana Wallet</p>
                <div className='flex items-center gap-8'>
                    <p onClick={addWallet} className='bg-black text-white text-sm px-4 py-2 rounded-lg cursor-pointer'>Add wallet</p>
                    <p className='bg-red-500 text-white text-sm px-4 py-2 rounded-lg cursor-pointer' onClick={() => setSolWallet([])}>clear wallet</p>
                </div>
            </div>
            <div >
                {solWallet.map((wallet, index) => (
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
