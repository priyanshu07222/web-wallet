import React from 'react'

export const Ethereum = () => {
    return (
        <div className=' w-full'>
            <div className='flex justify-between '>
                <p className='font-bold text-2xl'>Ethereum Wallet</p>
                <div className='flex items-center gap-8'>
                    <p className='bg-white text-black text-sm px-4 py-2 rounded-lg cursor-pointer'>Add wallet</p>
                    <p className='bg-white text-black text-sm px-4 py-2 rounded-lg cursor-pointer'>delete</p>
                </div>
            </div>
            <div className='mt-10 border p-8 rounded-lg'>
                <p>Wallet1</p>
            </div>
        </div>
    )
}
