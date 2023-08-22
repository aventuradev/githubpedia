'use client'
import React, { useEffect } from 'react'


import '../users.css'
import useUsers from '@/hooks/useUsers'
import RepositoriesList from '@/components/RepositoriesList'
import Link from 'next/link'
import UserProfileInfo from '@/components/UserProfileInfo'

const User = ({ params }) => {

  const { username } = params;

  const { user, getUser, repositories, getUserRepositories, loading } = useUsers();

  useEffect(() => {
    getUser(username)
    getUserRepositories(username)
  }, [])

  if (loading) return <></>
  return (
    <div className='user_profile'>
      <UserProfileInfo user={user} />

      <section className='user_repos'>
        <div className='repos_list_title'>
          <h3>Repositorios populares</h3>
          <Link href={`/repos/${user.login}`}>
            <small>Ver todos</small>
          </Link>
        </div>
        {
          repositories.length > 0 && (
            <RepositoriesList repositories={repositories} />
          )
        }

      </section>

    </div>
  )
}

export default User