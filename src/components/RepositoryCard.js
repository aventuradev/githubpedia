'use client'
import useFavorite from '@/hooks/useFavorite'
import useUsers from '@/hooks/useUsers'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFork, AiFillHeart } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs'

const RepositoryCard = ({ repo, fromSearch = false }) => {
    const router = useRouter();
    const { setRepository } = useUsers();
    const { getFavorites, setFavorite, removeFavorite } = useFavorite();
    const [favReposIds, setFavReposIds] = useState(getFavorites().map(repo => repo.id));

    const handleFavorite = (repo) => {
        if (favReposIds.includes(repo.id)) {
            setFavReposIds(prevState => ([...prevState.filter(id => id !== repo.id)]))
            removeFavorite(repo.id)

        } else {
            setFavorite(repo);
            setFavReposIds(prevState => ([...prevState, repo.id]))
        }
    }

    const handleSeeDetails = (repo) => {
        setRepository(repo);
        router.push(`/repos/${repo.owner.login}/${repo.name}`);
    }

    return (
        <li className='repo_card' >
            <div className='card_header'>
                <div className='repo_name_container'>
                    <AiFillHeart
                        className='favorite'
                        onClick={() => { handleFavorite(repo) }}
                        style={{ color: favReposIds.includes(repo.id) && 'red' }}
                    />
                    <div onClick={()=>{handleSeeDetails(repo)}}>
                        <p className='repo_name'>{repo.name}</p>
                    </div>
                </div>
                <p className='stared'> <BsStarFill className='icon' /> {repo.stargazers_count}</p>
            </div>
            <div className='card_body' onClick={()=>{handleSeeDetails(repo)}}>
                {
                    repo.language && (
                        <span>{repo.language}</span>
                    )
                }
                <span className='repo_fork'><AiOutlineFork /> {repo.forks}</span>
                <small className='repo_type'>{repo.private ? 'privado' : 'público'}</small>
            </div>
            {
                fromSearch && (

                    <div className='repo_description'>
                        <p>{repo.description}</p>
                    </div>
                )
            }
        </li>
    )
}

export default RepositoryCard