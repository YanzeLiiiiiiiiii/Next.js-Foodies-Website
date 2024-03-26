'use client'
//Commen nevigation bar component
import Link from 'next/link'
import Img from 'next/image'
import Navlink from './navlink'
import logoImg from '@/assets/logo.png'
import headerStyle from './main-header.module.css'
import MainHeaderBackground from './main-header-background'

export default function mainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={headerStyle.header}>
                <Link href='/' className={headerStyle.logo}>
                    <Img src={logoImg} alt='A plate of food' priority />
                </Link>
                <nav className={headerStyle.nav} >
                    <ul>
                        <li>
                            <Navlink link='/meals'>Browse Meals</Navlink>

                        </li>
                        <li>
                            <Navlink link='/community'>Foodies Community</Navlink>
                        </li>
                    </ul>
                </nav>
            </header >
        </>
    )
} 
