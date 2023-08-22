import useFavorite from '@/hooks/useFavorite'
import React, { useState } from 'react'
import { AiOutlineFork, AiFillHeart } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs'

const RepositoryCard = ({ repo, fromSearch = false }) => {

    const { getFavorites, setFavorite, removeFavorite } = useFavorite();
    const [favReposIds, setFavReposIds] = useState(getFavorites().map(repo => repo.id));

    const handleFavorite = (repo) => {
        if(favReposIds.includes(repo.id)){
            setFavReposIds(prevState =>([...prevState.filter( id => id !== repo.id)]))
            removeFavorite(repo.id)
            
        }else{
            setFavorite(repo); 
            setFavReposIds(prevState =>([...prevState, repo.id]))
        }
    }

    return (
        <li className='repo_card'>
            <div className='card_header'>
                <div className='repo_name_container'>
                    <AiFillHeart
                        className='favorite'
                        onClick={() => { handleFavorite(repo) }}
                        style={{color: favReposIds.includes(repo.id) && 'red' }}
                    />
                    <p className='repo_name'>{repo.name}</p>
                </div>
                <p className='stared'> <BsStarFill className='icon' /> {repo.stargazers_count}</p>
            </div>
            <div className='card_body'>
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