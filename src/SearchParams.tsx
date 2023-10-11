import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import { useQuery } from "@tanstack/react-query";
import { Animal } from "./APIResponsesTypes";
import { RootState } from "./store";
import { all as setAllSearchParams } from "./searchParamsSlice";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

export type RequestParams = {
  location: string;
  animal: Animal | null;
  breed: string;
};

const SearchParams = () => {
  const adoptedPet = useSelector((state: RootState) => state.adoptedPet.value);
  const requestParams = useSelector((state: RootState) => state.searchParams.value);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: (formData.get("animal")?.toString() as Animal) ?? null,
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          dispatch(setAllSearchParams(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
