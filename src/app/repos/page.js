'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';

import useUsers from '@/hooks/useUsers'
import useDebounced from '@/hooks/useDebounced';
import { RiUserSearchLine } from 'react-icons/ri'
import { LiaUserAltSlashSolid } from 'react-icons/lia'

import './repos.css'
const Repositories = () => {
  const router = useRouter()
  const { user, getUser, setUser, repositories, setRepositories, getUserRepositories } = useUsers();

  const [search, setSearch] = useState('');
  const debouncedValue = useDebounced(search, 1500);
  const searchMade = useRef(false);

  const getUserRepos = async () => {
    const res = await getUser(debouncedValue);
    searchMade.current = true;
    if (res.status === 200) {
      await getUserRepositories(debouncedValue)
    }
  }

  useEffect(() => {
    setUser({});
    setRepositories([]);
  }, [])

  useEffect(() => {
    if (debouncedValue.length < 3) return;
    if (!debouncedValue) {
      setUser({});
      setRepositories([]);
      return
    };
    getUserRepos();
  }, [debouncedValue]);


  useEffect(() => {
    if (!!Object.keys(user).length && !!repositories.length) {
      router.push(`/repos/${user.login}`)
    }
  }, [user, repositories])

  return (
    <div className='search_user_repos'>

      <div className='header'>
        <h3>Repositorios de usuarios</h3>
      </div>
      <div className='label'>
        <input
          type='search'
          name='search'
          value={search}
          placeholder='Nombre de usuario'
          onChange={(e) => setSearch(e.target.value)}
        />
        {
          (user?.message !== 'Not Found' || !search) && (
            <>
              <div className='icon'>
                <RiUserSearchLine />
              </div>
              <small>Buscas los repositorios públicos de usuarios escrubiendo su nombre de usuario.</small>
            </>
          )
        }
        {
          user?.message === 'Not Found' && !!search && (
            <>
              <div className='icon'>
                <LiaUserAltSlashSolid />
              </div>
              <small>Usuario no encontrado</small>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Repositories

