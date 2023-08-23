'use client'
import React, { useEffect, useState } from 'react'

import useUsers from '@/hooks/useUsers'
import RepositoriesList from '@/components/RepositoriesList';
import '../repos.css'
import useDebounced from '@/hooks/useDebounced';
import Loading from '@/shared/Loading';

const Repositories = () => {
  const { user, repositories } = useUsers();
  const [filteredRepos, setFilteredRepos] = useState(repositories);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');
  const debouncedValue = useDebounced(search, 700);
  // Manejo de filtrado de repositiorios
  useEffect(() => {
    setFilteredRepos(
      repositories.filter(repo =>
        repo.name.trim().toLowerCase().includes(search.trim().toLowerCase())
      ))
  }, [debouncedValue]);

  // Manejo de petición para scroll infinito
  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoading(false)
      }, 1000);
    };

  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='repo_search'>
      <div className='header'>
        <h3>Repositorios públicos de {user.login}</h3>
        <input
          type='search'
          name='search'
          value={search}
          placeholder='Buscar repositorio'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <RepositoriesList repositories={filteredRepos} fromSearch={true} page={page} />
      {
        loading && (
          <Loading />
        )
      }
    </div>
  )
}

export default Repositories