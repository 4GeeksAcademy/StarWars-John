import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const PlanetCard = ({ planet }) => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const isFavorite = store.favorites.some(
    fav => fav.uid === planet.uid && fav.type === "planets"
  );

  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/planets/${planet.uid}.jpg`;

  return (
    <div className="card ilustration-card">
      <div className="imagendiv">
        <img
          src={imageUrl}
          alt={planet.name}
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")
          }
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{planet.name}</h5>

        <p className="card-text mb-1">
          <strong>Climate:</strong> {planet.climate}
        </p>
        <p className="card-text mb-1">
          <strong>Terrain:</strong> {planet.terrain}
        </p>
        <p className="card-text mb-3">
          <strong>Population:</strong> {planet.population}
        </p>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() =>
              navigate(`/planet/${planet.uid}`, { state: { planet } })
            }
          >
            Learn more!
          </button>

          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() => {
              if (isFavorite) {
                dispatch({
                  type: "remove_favorite",
                  payload: { uid: planet.uid, type: "planets" }
                });
              } else {
                dispatch({
                  type: "add_favorite",
                  payload: { ...planet, type: "planets" }
                });
              }
            }}
          >
            <i
              className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};