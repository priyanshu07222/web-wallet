import React from 'react'

export const Navbar = () => {
    return (
        <div className='py-2 max-w-screen-xl mx-auto mt-4'>
            <div className='flex items-center'>
                <img src="/logo.svg" alt="" className='w-16 h-16' />
                <p className='font-extrabold text-xl'>Ollet</p>
            </div>
        </div>
    )
}
