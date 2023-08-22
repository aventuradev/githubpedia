import React from 'react'
import RepositoryCard from './RepositoryCard'

const RepositoriesList = ({ repositories, fromSearch = false, page }) => {
    const reposToShow = fromSearch ? (10 * page) : 8
    return (
        <ul className='repo_list'>
            {repositories.toSorted((a, b) => b.stargazers_count - a.stargazers_count).slice(0, reposToShow).map(repo => (
                <RepositoryCard key={repo.name} repo={repo} />
            ))}
        </ul>
    )
}

export default RepositoriesList