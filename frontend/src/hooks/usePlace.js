import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { placesAPI } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for fetching all places with filters
 */
export function usePlaces(filters = {}) {
  return useQuery({
    queryKey: ['places', filters],
    queryFn: () => placesAPI.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });
}

/**
 * Custom hook for fetching a single place by ID or slug
 */
export function usePlace(id) {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => placesAPI.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching all states
 */
export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: () => placesAPI.getStates(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 48 * 60 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching a single state
 */
export function useState(stateId) {
  return useQuery({
    queryKey: ['state', stateId],
    queryFn: () => placesAPI.getState(stateId),
    enabled: !!stateId,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching all cities
 */
export function useCities(stateId) {
  return useQuery({
    queryKey: ['cities', stateId],
    queryFn: () => placesAPI.getCities(stateId),
    enabled: !!stateId,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => placesAPI.getCategories(),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
  });
}

/**
 * Custom hook for searching places
 */
export function useSearch(query) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => placesAPI.search(query),
    enabled: query.length > 2,
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 6 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching featured places
 */
export function useFeaturedPlaces() {
  return useQuery({
    queryKey: ['featured-places'],
    queryFn: () => placesAPI.getFeaturedPlaces(),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching popular places
 */
export function usePopularPlaces(limit = 8) {
  return useQuery({
    queryKey: ['popular-places', limit],
    queryFn: () => placesAPI.getPopularPlaces(limit),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}

/**
 * Custom hook for creating a place (admin)
 */
export function useCreatePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => placesAPI.createPlace(data),
    onSuccess: (data) => {
      toast.success('Place created successfully!');
      queryClient.invalidateQueries({ queryKey: ['places'] });
      return data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create place');
    },
  });
}

/**
 * Custom hook for updating a place (admin)
 */
export function useUpdatePlace(placeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => placesAPI.updatePlace(placeId, data),
    onSuccess: (data) => {
      toast.success('Place updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['place', placeId] });
      queryClient.invalidateQueries({ queryKey: ['places'] });
      return data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update place');
    },
  });
}

/**
 * Custom hook for deleting a place (admin)
 */
export function useDeletePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (placeId) => placesAPI.deletePlace(placeId),
    onSuccess: () => {
      toast.success('Place deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete place');
    },
  });
}

/**
 * Custom hook for fetching nearby places
 */
export function useNearbyPlaces(placeId, radius = 10) {
  return useQuery({
    queryKey: ['nearby-places', placeId, radius],
    queryFn: () => placesAPI.getNearbyPlaces(placeId, radius),
    enabled: !!placeId,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}

/**
 * Custom hook for fetching related places
 */
export function useRelatedPlaces(placeId, category) {
  return useQuery({
    queryKey: ['related-places', placeId, category],
    queryFn: () => placesAPI.getRelatedPlaces(placeId, category),
    enabled: !!placeId,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
}
