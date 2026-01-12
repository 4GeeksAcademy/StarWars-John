import { useLocation, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const PlanetDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const planet = location.state?.planet;

  if (!planet) {
    return (
      <div className="container mt-5">
        <h2>Planet not found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go back to Home
        </button>
      </div>
    );
  }

  const {
    name,
    climate,
    diameter,
    gravity,
    orbital_period,
    population,
    rotation_period,
    surface_water,
    terrain,
    uid
  } = planet;

  const isFavorite = store.favorites.some(
    fav => fav.uid === uid && fav.type === "planets"
  );

  const imageUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/planets/${uid}.jpg`;

  return (
    <div className="container mt-5">
      <button
        className="btn btn-link mb-3 text-decoration-none"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card shadow-sm border-0">
        <div className="row g-0 align-items-stretch">
         
          <div className="col-md-6">
            <img
              src={imageUrl}
              alt={name}
              className="img-fluid h-100 w-100 object-fit-cover rounded"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
          </div>

      
          <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
            <h1 className="text-danger fw-bold">{name}</h1>

            <p className="text-muted mt-3" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>

           
            <button
              className={`btn align-self-start mt-3 ${
                isFavorite ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={() => {
                if (isFavorite) {
                  dispatch({
                    type: "remove_favorite",
                    payload: { uid, type: "planets" }
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
              ></i>{" "}
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>

        {/* Detalles del planeta */}
        <div className="row g-0 bg-danger text-white text-center py-3">
          <div className="col">
            <strong>Climate</strong>
            <div>{climate}</div>
          </div>
          <div className="col">
            <strong>Diameter</strong>
            <div>{diameter}</div>
          </div>
          <div className="col">
            <strong>Gravity</strong>
            <div>{gravity}</div>
          </div>
          <div className="col">
            <strong>Orbital Period</strong>
            <div>{orbital_period}</div>
          </div>
          <div className="col">
            <strong>Population</strong>
            <div>{population}</div>
          </div>
          <div className="col">
            <strong>Rotation Period</strong>
            <div>{rotation_period}</div>
          </div>
          <div className="col">
            <strong>Surface Water</strong>
            <div>{surface_water}</div>
          </div>
          <div className="col">
            <strong>Terrain</strong>
            <div>{terrain}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;