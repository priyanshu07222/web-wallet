"use client";

import React, { useState } from 'react'
import bip39 from 'bip39'
import { Solana } from './Solana';
import { Ethereum } from './Ethereum';

export const Hero = () => {
    const [mneumonic, setMneumonic] = useState('');
    const [showSecretPhrase, setShowSecretPhrase] = useState(false);
    const [seedPhrase, setSeedPhrase] = useState<Buffer>()


    const handleMneumonic = async () => {
        if (mneumonic) {
            try {
                const isvalidMneumonic = bip39.validateMnemonic(mneumonic);
                if (isvalidMneumonic) {
                    const seed = await bip39.mnemonicToSeed(mneumonic);
                    setSeedPhrase(seed);
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const mnemonicGen = bip39.generateMnemonic()
            const seed = await bip39.mnemonicToSeed(mnemonicGen);
            setMneumonic(mnemonicGen);
            setSeedPhrase(seed)
            console.log(mnemonicGen, seed.toString())
        }
    }
    return (
        <div className='max-w-screen-xl mx-auto mt-10 px-2 py-8'>
            <h1 className='text-5xl font-bold'>Create a Web Wallet</h1>
            <p className='text-lg pl-2 mt-1 text-gray-800 font-medium'>Choose the blockchain to get started</p>
            <div className='my-8'>
                <p className='text-2xl font-semibold mb-2'>Generate Mneumonic</p>
                {!seedPhrase && <div className='flex items-center justify-between gap-4'>
                    <input onChange={(e) => setMneumonic(e.target.value)} type="text" className='w-4/6 border border-gray-400 outline-none p-2 text-black rounded-lg' placeholder='Enter the Mneumonic(or leave it blank for generating new one)' />
                    <button onClick={handleMneumonic} className='w-1/6 border border-gray-400 hover:border-none font-semibold hover:bg-slate-800 hover:text-white rounded-lg py-2 px-6'>Generate Mneumonic</button>
                </div>}
                {
                    seedPhrase && <div>
                        <div className=' border p-4 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <p className='text-3xl text-gray-800 font-bold'>Your Secret Phrase</p>
                                <p onClick={() => setShowSecretPhrase((prev) => !prev)} className='py-2 px-6 text-gray-700 transition-all duration-300 cursor-pointer font-semibold hover:bg-slate-800 hover:text-white rounded-lg'>{showSecretPhrase ? "Hide" : "Show"} Phrase</p>
                            </div>
                            {showSecretPhrase && <div>
                                {mneumonic}
                            </div>}
                        </div>
                    </div>
                }

                {
                    mneumonic && seedPhrase && <div className='flex justify-between items-center gap-6 my-10'>
                        <Solana seed={seedPhrase} />
                        <Ethereum />
                    </div>
                }
            </div>
        </div>
    )
}
