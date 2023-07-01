'use client'

import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
    const isUserLoggedIn = true

    const [providers, setProviders] = useState(null)

    useEffect(()=>{
        const setProviders = async ()=>{
            const response = await getProviders()
            setProviders(response)
        }
        setProviders()
    },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link className='flex gap-2 flex-center' href=''>
            <Image src='assets/images/logo.svg' alt='promptopia logo' width='30' height='30' className='object-contain' />
            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
            {isUserLoggedIn ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>Create Post</Link>
                    <button onClick={signOut} className='outline_btn'>Sign Out</button>
                    <Link href='/profile'>
                        <Image src='assets/images/logo.svg' width={37} height={37} />
                    </Link>
                </div>
            ) : (<div>
                {providers && Object.values(providers).map(provider => (
                    <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn' >
                        Sign In
                    </button>
                ))}
            </div>)}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex'>
            {isUserLoggedIn ? (<div>
                <Image src='/assets/images/logo.svg' onClick={()=>{}} width={37} height={37} className='rounded-full' />
            </div>) : (<div>
                {providers && Object.values(providers).map(provider => (
                    <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn' >
                        Sign In
                    </button>
                ))}
            </div>)}
        </div>

    </nav>
  )
}

export default Nav