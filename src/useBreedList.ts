import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import { Animal } from "./APIResponsesTypes";

// Param `animal` is null when `SearchParams` component is mounted, run query when animal is
// selected by user
export default function useBreedList(animal: Animal | null) {
  const results = useQuery(["breeds", animal as Animal], fetchBreedList, {
    enabled: !!animal,
  });

  return [results?.data?.breeds ?? [], results.status] as [string[], QueryStatus];
}
