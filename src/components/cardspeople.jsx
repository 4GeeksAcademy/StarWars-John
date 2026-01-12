import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const PeopleCard = ({ person }) => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const isFavorite = store.favorites.some(
    fav => fav.uid === person.uid && fav.type === "people"
  );

  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${person.uid}.jpg`;

  return (
    <div className="card ilustration-card">
      <div
        className="imagendiv bg-secondary text-center text-light d-flex align-items-center justify-content-center card-img-top"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className="card-body">
        <h5 className="card-title">{person.name}</h5>

        <p className="card-text mb-1">
          <strong>Gender:</strong> {person.gender}
        </p>
        <p className="card-text mb-1">
          <strong>Hair Color:</strong> {person.hair_color}
        </p>
        <p className="card-text mb-3">
          <strong>Eye Color:</strong> {person.eye_color}
        </p>

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() =>
              navigate(`/character/${person.uid}`, { state: { person } })
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
                  payload: { uid: person.uid, type: "people" }
                });
              } else {
                dispatch({
                  type: "add_favorite",
                  payload: { ...person, type: "people" }
                });
              }
            }}
          >
            <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
          </button>
        </div>
      </div>
    </div>
  );
};
