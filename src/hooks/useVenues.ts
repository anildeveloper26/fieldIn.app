import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";
import type { Venue, VenueDetail, VenueImage } from "@/types";

export interface VenueFilterState {
  sport: string;
  maxDistance: string;
  minPrice: string;
  maxPrice: string;
}

export const EMPTY_VENUE_FILTERS: VenueFilterState = { sport: "", maxDistance: "", minPrice: "", maxPrice: "" };

export function useVenues(filters: VenueFilterState, lat: number, lng: number) {
  const params = new URLSearchParams();
  if (filters.sport) params.set("sport", filters.sport);
  if (filters.maxDistance) params.set("maxDistance", filters.maxDistance);
  if (filters.minPrice) params.set("minPrice", filters.minPrice);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  params.set("lat", String(lat));
  params.set("lng", String(lng));

  return useQuery({
    queryKey: ["venues", filters, lat, lng],
    queryFn: () => apiFetch<{ venues: Venue[] }>(`/venues?${params.toString()}`),
  });
}

/** Single venue with live occupancy + gallery, polled while the drawer is open. */
export function useVenueDetail(venueId: string | null) {
  return useQuery({
    queryKey: ["venue", venueId],
    queryFn: () => apiFetch<{ venue: VenueDetail }>(`/venues/${venueId}`),
    enabled: Boolean(venueId),
    refetchInterval: 30_000,
  });
}

export function useUploadVenueImage(venueId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => {
      const body = new FormData();
      body.append("file", file);
      return apiFetch<{ image: VenueImage }>(`/venues/${venueId}/images`, { method: "POST", body });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["venue", venueId] }),
  });
}
