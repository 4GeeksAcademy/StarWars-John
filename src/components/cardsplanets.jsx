import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetCard = ({ planet }) => {
    const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/planets/${planet.uid}.jpg`;
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === planet.uid);
   
    return (
        <div className="card ilustration-card">
            <div
                className="imagendiv bg-secondary text-center text-light d-flex align-items-center justify-content-center card-img-top"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            ></div>
            <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
                <p className="card-text mb-1">
                    <strong>Climate:</strong> {planet.climate}
                </p>
                <p className="card-text mb-1">
                    <strong>Terrain:</strong> {planet.terrain}
                </p>
                <p className="card-text mb-1">
                    <strong>Population:</strong> {planet.population}
                </p>
                <p className="card-text mb-1">
                    <strong>Diameter:</strong> {planet.diameter}
                </p>
                <p className="card-text mb-3">
                    <strong>Gravity:</strong> {planet.gravity}
                </p>

                <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm">Learn more!</button>
                    <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => {
                            if (isFavorite) {
                                dispatch({ type: "remove_favorite", payload: planet.uid });
                            } else {
                                dispatch({ type: "add_favorite", payload: planet });
                            }
                        }}>
                        <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>

                </div>
            </div>
        </div>
    );
};
