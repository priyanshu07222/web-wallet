"use client";

import React, { useState } from 'react'
import bip39 from 'bip39'
import { Solana } from './Solana';
import { Ethereum } from './Ethereum';

export const Hero = () => {
    const [mneumonic, setMneumonic] = useState('');
    const [showSecretPhrase, setShowSecretPhrase] = useState(false);


    const handleMneumonic = async () => {
        if (mneumonic) {
            try {
                const seed = await bip39.mnemonicToSeed(mneumonic);
            } catch (error) {
                console.log(error)
            }
        } else {
            const mnemonicGen = bip39.generateMnemonic()
            const seed = await bip39.mnemonicToSeed(mnemonicGen);
            setMneumonic(mnemonicGen);
            console.log(mnemonicGen, seed.toString())
        }
    }
    return (
        <div className='max-w-screen-xl mx-auto py-8'>
            <h1 className='text-4xl font-bold'>Create a Web Wallet</h1>
            <p className='text-xl font-medium'>Choose the blockchain to get started</p>
            <div className='my-8'>
                <p className='text-2xl font-semibold mb-2'>Generate Mneumonic</p>
                {!mneumonic && <div className='flex items-center justify-between gap-4'>
                    <input onChange={(e) => setMneumonic(e.target.value)} type="text" className='w-4/6 outline-none p-2 text-black rounded-lg' placeholder='Enter the Mneumonic(or leave it blank for generating new one)' />
                    <button onClick={handleMneumonic} className='w-1/6 bg-slate-50 text-black rounded-lg py-2 px-6'>Generate Mneumonic</button>
                </div>}
                {
                    mneumonic && <div>
                        <div className=' border p-4 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <p className='text-3xl font-bold'>Your Secret Phrase</p>
                                <p onClick={() => setShowSecretPhrase((prev) => !prev)} className='py-2 px-6 cursor-pointer font-semibold hover:bg-slate-600 rounded-lg'>{showSecretPhrase ? "Hide" : "Show"} Phrase</p>
                            </div>
                            {showSecretPhrase && <div>
                                {mneumonic}
                            </div>}
                        </div>
                    </div>
                }

                {
                    mneumonic && <div className='flex justify-between items-center gap-6 my-10'>
                        <Solana />
                        <Ethereum />
                    </div>
                }
            </div>
        </div>
    )
}
