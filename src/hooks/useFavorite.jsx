
const useFavorite = () => {
    
    const setFavorite = (repo) => {
        const favs = getFavorites()

        const newFav = { id: repo.id, owner:repo.owner, url:repo.url}
        window.localStorage.setItem('fav', JSON.stringify([...favs, newFav]))
    }
    const getFavorites = () => {
        
        const favRepositories = JSON.parse(window.localStorage.getItem('fav'));
        
        return !!favRepositories ? favRepositories : []
    }
    
    const removeFavorite = (id) => {
        const favs = getFavorites();

        window.localStorage.setItem('fav', JSON.stringify([...favs.filter(repo => repo.id !== id)]))
    }

    return { setFavorite, getFavorites, removeFavorite }
}

export default useFavorite