'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import headerStyle from './navlink.module.css'
export default function Navlink({ children, link }) {
    const path = usePathname();
    return (
        <Link href={link} className={path.startsWith(link) ? headerStyle.active : ''}>{children}</Link>
    )
}
