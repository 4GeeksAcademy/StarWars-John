import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const VehicleCard = ({ vehicle }) => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const isFavorite = store.favorites.some(
    fav => fav.uid === vehicle.uid && fav.type === "vehicles"
  );

  const imageUrl =
    "https://www.kindpng.com/picc/m/108-1085691_star-wars-spacecraft-transparent-free-png-star-wars.png";

  return (
    <div className="card ilustration-card">
      <div
        className="card-img-top"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
        }}
      ></div>

      <div className="card-body">
        <h5 className="card-title">{vehicle.name}</h5>

        <p className="card-text mb-1">
          <strong>Model:</strong> {vehicle.model}
        </p>
        <p className="card-text mb-1">
          <strong>Manufacturer:</strong> {vehicle.manufacturer}
        </p>
        <p className="card-text mb-3">
          <strong>Length:</strong> {vehicle.length}
        </p>

        <div className="d-flex justify-content-between">
       
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() =>
              navigate(`/vehicle/${vehicle.uid}`, { state: { vehicle } })
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
                  payload: { uid: vehicle.uid, type: "vehicles" },
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
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};
