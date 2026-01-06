import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, {useEffect} from "react";
import { PeopleCard } from "../components/cardspeople.jsx";
import { PlanetCard } from "../components/cardsplanets.jsx";
import { VehicleCard } from "../components/cardsvehicles.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

async function get_people() {
  try {
    const response = await fetch("https://www.swapi.tech/api/people?page=1&limit=5");
    const data = await response.json();
    const people = [];
    for (const person of data.results) {
      const detailResponse = await fetch(`https://www.swapi.tech/api/people/${person.uid}`);
      const detailData = await detailResponse.json();
      const props = detailData.result.properties;
      people.push({
        uid: person.uid,
        name: props.name,
        gender: props.gender,
        hair_color: props.hair_color,
        eye_color: props.eye_color,
        height: props.height,
        skin_color: props.skin_color,
        birth_year: props.birth_year
      });
    }
    dispatch({
      type: "get_people",
      payload: people
    });

  } catch (error) {
    console.log("error al encontrar el personaje", error);
  }
}

async function get_planets() {
  try {
    const response = await fetch("https://www.swapi.tech/api/planets?page=1&limit=5");
    const data = await response.json();

    const planets = [];

    for (const planet of data.results) {
      const detailResponse = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`);
      const detailData = await detailResponse.json();
      const props = detailData.result.properties;

      planets.push({
        uid: planet.uid,
        name: props.name,
        climate: props.climate,
        terrain: props.terrain,
        population: props.population,
        diameter: props.diameter,
        gravity: props.gravity
      });
    }

    dispatch({
      type: "get_planets",
      payload: planets
    });

  } catch (error) {
    console.log("error al encontrar el planeta", error);
  }
}
async function get_vehicles() {
  try {
	const response = await fetch("https://www.swapi.tech/api/vehicles?page=1&limit=5");
	const data = await response.json();
	const vehicles = [];

	for (const vehicle of data.results) {
	  const detailResponse = await fetch(`https://www.swapi.tech/api/vehicles/${vehicle.uid}`);
	  const detailData = await detailResponse.json();
	  const props = detailData.result.properties;
	  
	  vehicles.push({
		uid: vehicle.uid,
		name: props.name,
		model: props.model,
		manufacturer: props.manufacturer,
		cost_in_credits: props.cost_in_credits,
		length: props.length,
		crew: props.crew,
		passengers: props.passengers
	  });
	}

	dispatch({
	  type: "get_vehicles",
	  payload: vehicles
	});

  } catch (error) {
	console.log("error al encontrar el vehículo", error);
  }
}

useEffect(() => {
	get_people()
	get_planets()
	get_vehicles()
}, [])


	return (
		<div>
	<h1 className="mx-3" >Characters</h1>
    <div className="d-flex gap-3 overflow-auto">
  {store.people.length > 0 &&
    store.people.map(person => (
      <PeopleCard key={person.uid} person={person} />
    ))
  }
</div>
<h1 className="mx-3 mt-4" >Planets</h1>
	<div className="d-flex gap-3 overflow-auto">
  {store.planets.length > 0 &&
    store.planets.map(planet => (
	  <PlanetCard key={planet.uid} planet={planet} />
	))
  }
  </div>
  <h1 className="mx-3 mt-4" >Vehicles</h1>
	<div className="d-flex gap-3 overflow-auto mb-4">
  {store.vehicles.length > 0 &&
	store.vehicles.map(vehicle => (
	  <VehicleCard key={vehicle.uid} vehicle={vehicle} />
	))
  }
  </div>
</div>
  );
};