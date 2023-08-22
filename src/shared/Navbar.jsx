'use client'
import React from 'react';
import Link from 'next/link'
import '../app/globals.css'
import { usePathname, useRouter } from 'next/navigation';
import useUsers from '@/hooks/useUsers';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const {setUser, setRepositories} = useUsers();
    const routes = [
        {
            label: "Usuarios",
            route: (pathname === '/' || pathname === '/users') ? '#' : '/users'
        },
        {
            label: "Repositorios",
            route: pathname === '/repos' ? '#' : '/repos'
        },
    ]

    const handleNavigate = (route) => {
        setUser({});
        setRepositories([]);
        router.push(route);
    }
    
    return (
        <nav className='navbar'>
            <Link href={(pathname === '/' || pathname === '/users') ? '#' : '/users'}>
                <h1 className='app_title'>Githubpedia</h1>
            </Link>
            <ul>
                {
                    routes.map(({ route, label }) => (
                        <li key={route} onClick={()=>handleNavigate(route)}>
                            {label}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Navbar