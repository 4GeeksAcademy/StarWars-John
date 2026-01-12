import { useLocation, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const VehicleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const vehicle = location.state?.vehicle;

  if (!vehicle) {
    return (
      <div className="container mt-5">
        <h2>Vehicle not found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go back to Home
        </button>
      </div>
    );
  }

  const {
    name,
    model,
    manufacturer,
    length,
    crew,
    passengers,
    cost_in_credits,
    uid
  } = vehicle;

  const isFavorite = store.favorites.some(
    fav => fav.uid === uid && fav.type === "vehicles"
  );

  const imageUrl =
    "https://www.kindpng.com/picc/m/108-1085691_star-wars-spacecraft-transparent-free-png-star-wars.png";

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
          {/* Imagen */}
          <div className="col-md-6">
            <img
              src={imageUrl}
              alt={name}
              className="img-fluid h-100 w-100 object-fit-cover rounded"
            />
          </div>

          <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
            <h1 className="text-danger fw-bold">{name}</h1>

            <p className="text-muted mt-3" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button
              className={`btn align-self-start mt-3 ${
                isFavorite ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={() => {
                if (isFavorite) {
                  dispatch({
                    type: "remove_favorite",
                    payload: { uid, type: "vehicles" },
                  });
                } else {
                  dispatch({
                    type: "add_favorite",
                    payload: { ...vehicle, type: "vehicles" },
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


        <div className="row g-0 bg-danger text-white text-center py-3">
          <div className="col">
            <strong>Model</strong>
            <div>{model}</div>
          </div>
          <div className="col">
            <strong>Manufacturer</strong>
            <div>{manufacturer}</div>
          </div>
          <div className="col">
            <strong>Length</strong>
            <div>{length}</div>
          </div>
          <div className="col">
            <strong>Crew</strong>
            <div>{crew}</div>
          </div>
          <div className="col">
            <strong>Passengers</strong>
            <div>{passengers}</div>
          </div>
          <div className="col">
            <strong>Cost</strong>
            <div>{cost_in_credits}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;