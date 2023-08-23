'use client'
import React, { useEffect, useState } from 'react'

import { AiOutlineEye, AiOutlineFork, AiFillHeart, AiOutlineLink } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs'

import useUsers from '@/hooks/useUsers';
import '../../repos.css'
import useFavorite from '@/hooks/useFavorite';
import { useRouter } from 'next/navigation';

const RepositoryDetails = () => {
    const router = useRouter()
    const { getFavoritesIds, setFavorite, removeFavorite } = useFavorite();
    const [favReposIds, setFavReposIds] = useState(getFavoritesIds());
    const { repository } = useUsers();
    const {
        name,
        full_name,
        private: privateRepo,
        owner,
        forks_count,
        stargazers_count,
        watchers_count,
        language,
        description,
        clone_url,
        id

    } = repository;

    useEffect(() => {
        if (!!Object.keys(repository).length) return;
        router.push('/')
    }, [])

    const handleFavorite = (repo) => {
        if (favReposIds.includes(repo.id)) {
            setFavReposIds(prevState => ([...prevState.filter(id => id !== repo.id)]))
            removeFavorite(repo.id)

        } else {
            setFavorite(repo);
            setFavReposIds(prevState => ([...prevState, repo.id]))
        }
    }

    return (
        <div className='repo_details'>
            {
                !!Object.keys(repository).length && (
                    <>
                        <div className='repo_details_header'>
                            <div className='owner'>
                                <img className='owner_avatar' src={owner.avatar_url} />
                                <p className='owner_name'>{owner.login}</p>
                            </div>
                            <div className='atributes'>
                                <p><AiOutlineEye /> {watchers_count}</p>
                                <p><AiOutlineFork /> {forks_count}</p>
                                <p><BsStarFill /> {stargazers_count}</p>
                                <p onClick={() => { handleFavorite(repository) }}>
                                    <AiFillHeart className='heart' color={favReposIds.includes(id) ? 'red' : ''} />
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className='repo_details_body'>
                            <div className='name_type_lenguage'>
                                <div className='name'>
                                    <h1>{name}</h1>
                                    <small>{full_name}</small>
                                </div>
                                <div className='type_language'>
                                    <p className='repo_visibility'>{privateRepo ? 'Privado' : 'Público'}</p>
                                    <p>{language}</p>
                                </div>
                            </div>
                            <div className='description'>
                                <p className='about'>Sobre este repositorio:</p>
                                <p className='repo_description'>{description}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='repo_details_footer'>
                            <div className='url'>
                                <AiOutlineLink />
                                <a href={clone_url} target='blank'>Clonar repositorio</a>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default RepositoryDetails