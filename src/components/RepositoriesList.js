import React from 'react'
import RepositoryCard from './RepositoryCard'

const RepositoriesList = ({repositories}) => {
    return (
        <ul className='repo_list'>
            {repositories.toSorted((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 8).map(repo => (
                <RepositoryCard key={repo.name} repo={repo} />
            ))}
        </ul>
    )
}

export default RepositoriesList