import React, { useState } from 'react';
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


    const addWallet = () => {
        const path = `m/44'/501'/${solWallet.length}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
        const privateKey = bs58.encode(secret)
        const publicKey = web3.Keypair.fromSecretKey(secret).publicKey.toBase58();
        setSolWallet(prev => [...prev, { privateKey, publicKey }])

    }
    return (
        <div className=' w-1/2'>
            <div className='flex justify-between items-center'>
                <p className='text-2xl font-bold'>Solana Wallet</p>
                <div className='flex items-center gap-8'>
                    <p onClick={addWallet} className='bg-white text-black text-sm px-4 py-2 rounded-lg cursor-pointer'>Add wallet</p>
                    <p className='bg-white text-black text-sm px-4 py-2 rounded-lg cursor-pointer'>delete</p>
                </div>
            </div>
            <div >
                {solWallet.map((wallet, index) => (
                    <div key={index} className='mt-10 border p-8 rounded-lg'>
                        <p>Wallet {index + 1}:</p>
                        <p>{wallet.publicKey}</p>
                        <p className='truncate'>{wallet.privateKey}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
