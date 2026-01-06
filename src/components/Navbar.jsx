import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const favoritos = store?.favorites || [];

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <a className="navbar-brand" href="/">StarWars App</a>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favoritos ({favoritos.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {favoritos.length === 0 && (
            <li className="dropdown-item text-muted">No hay favoritos</li>
          )}

          {favoritos.map((fav, index) => (
            <li key={fav.uid} className="d-flex justify-content-between align-items-center px-3">
              <span>{fav.name}</span>
              <button
                className="btn btn-sm"
                onClick={() => dispatch({ type: "remove_favorite", payload: fav.uid })}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

