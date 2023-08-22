'use client'
import React, { useEffect, useState } from 'react'


import '../users.css'
import useUsers from '@/hooks/useUsers'
import RepositoriesList from '@/components/RepositoriesList'
import Link from 'next/link'
import UserProfileInfo from '@/components/UserProfileInfo'
import Loading from '@/shared/Loading'
import { useRouter } from 'next/navigation'

const User = ({ params }) => {
  const router = useRouter();
  const { username } = params;
  
  const { users, repositories, getUserRepositories, loading, setUser } = useUsers();
  const [user] = useState(users.find(u => u.login === username) || {});
  
  useEffect(() => {
    if(!Object.keys(user).length) router.push('/');
    getUserRepositories(username);
    return () => setUser(user);
  }, [])

  return (
    <div className='user_profile'>
      <UserProfileInfo user={user} />

      <section className='user_repos'>
        {
          loading ? (
            <Loading />
          ) : (
            <>
              <div className='repos_list_title'>
                <h3>Repositorios populares</h3>
                <Link href={`/repos/`}>
                  <small>Ver todos</small>
                </Link>
              </div>
              <RepositoriesList repositories={repositories} />
            </>
          )
        }

      </section>

    </div>
  )
}

export default User