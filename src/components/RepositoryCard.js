import React from 'react'
import { AiOutlineFork } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs'

const RepositoryCard = ({repo}) => {
    return (
        <li className='repo_card'>
            <div className='card_header'>
                <p className='repo_name'>{repo.name}</p>
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
        </li>
    )
}

export default RepositoryCard