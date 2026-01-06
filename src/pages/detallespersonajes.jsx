import { useLocation, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const CharacterDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const person = location.state?.person;

  const {
    name,
    gender,
    hair_color,
    eye_color,
    height,
    mass,
    birth_year,
    skin_color
  } = person;

  const isFavorite = store.favorites.some(fav => fav.uid === person.uid);

  return (
<div className="container mt-5">
  <button
    className="btn btn-link mb-3 text-decoration-none"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>

  <div className="card shadow-sm border-0">

    {/* TOP SECTION */}
    <div className="row g-0 align-items-stretch">

      {/* IMAGE - LEFT */}
      <div className="col-md-6">
        <img
          src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people/${person.uid}.jpg`}
          className="img-fluid h-100 w-100 object-fit-cover"
          alt={name}
        />
      </div>

      {/* TEXT - RIGHT */}
      <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
        <h1 className="text-danger fw-bold">{name}</h1>

        <p className="text-muted mt-3" style={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Curabitur pretium
          tincidunt lacus. Nulla gravida orci a odio.
        </p>

        <button
          className={`btn align-self-start mt-3 ${
            isFavorite ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => {
            if (isFavorite) {
              dispatch({ type: "remove_favorite", payload: person.uid });
            } else {
              dispatch({ type: "add_favorite", payload: person });
            }
          }}
        >
          <i
            className={
              isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"
            }
          ></i>{" "}
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>

    {/* BOTTOM RED INFO BAR */}
    <div className="row g-0 bg-danger text-white text-center py-3">
      <div className="col">
        <strong>Height</strong>
        <div>{height}</div>
      </div>
      <div className="col">
        <strong>Gender</strong>
        <div>{gender}</div>
      </div>
      <div className="col">
        <strong>Eye Color</strong>
        <div>{eye_color}</div>
      </div>
      <div className="col">
        <strong>Birth Year</strong>
        <div>{birth_year}</div>
      </div>
      <div className="col">
        <strong>Skin Color</strong>
        <div>{skin_color}</div>
      </div>
    </div>
  </div>
</div>
  )}
export default CharacterDetail;