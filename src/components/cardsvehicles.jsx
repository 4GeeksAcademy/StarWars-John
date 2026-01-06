import useGlobalReducer from "../hooks/useGlobalReducer";

export const VehicleCard = ({ vehicle }) => {
    const imageUrl =
        "https://www.kindpng.com/picc/m/108-1085691_star-wars-spacecraft-transparent-free-png-star-wars.png";
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.uid === vehicle.uid);

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
                    <strong>Class:</strong> {vehicle.vehicle_class}
                </p>
                <p className="card-text mb-1">
                    <strong>Manufacturer:</strong> {vehicle.manufacturer}
                </p>
                <p className="card-text mb-3">
                    <strong>Length:</strong> {vehicle.length}
                </p>

                <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm">
                        Learn more!
                    </button>
                    <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => {
                            if (isFavorite) {
                                dispatch({ type: "remove_favorite", payload: vehicle.uid });
                            } else {
                                dispatch({ type: "add_favorite", payload: vehicle });
                            }
                        }}
                    >
                        <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>

                </div>
            </div>
        </div>
    );
};
