import { QueryFunction } from "@tanstack/react-query";
import { Animal, PetAPIResponse } from "../types/APIResponsesTypes";
import { RequestParams } from "../components/SearchParams";

const fetchSearch: QueryFunction<PetAPIResponse, ["search", RequestParams]> = async ({
  queryKey,
}) => {
  const { location, breed } = queryKey[1];
  const animal = queryKey[1].animal || ""; // if no animal is provided, fall back to empty string
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
  );

  if (!res.ok) {
    throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);
  }

  return res.json();
};

export default fetchSearch;
