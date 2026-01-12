export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    people: [],
    planets: [],
    vehicles: [],
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "add_task": {
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map(todo =>
          todo.id === id
            ? { ...todo, background: color }
            : todo
        )
      };
    }

    case "get_people":
      return {
        ...store,
        people: action.payload
      };

    case "get_planets":
      return {
        ...store,
        planets: action.payload
      };

    case "get_vehicles":
      return {
        ...store,
        vehicles: action.payload
      };

    case "add_favorite":
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          fav =>
            !(fav.uid === action.payload.uid &&
              fav.type === action.payload.type)
        )
      };

    default:
      return store;
  }
}
