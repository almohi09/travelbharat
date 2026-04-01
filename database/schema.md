# TravelBharat Database Schema

## Tables
- `states`: master table for Indian states.
- `cities`: city records linked to states.
- `places`: tourism places linked to states and optional cities.

## Relationships
- `cities.state_id -> states.id`
- `places.state_id -> states.id`
- `places.city_id -> cities.id` (nullable)

## Notes
- Slugs are unique and used by frontend routing.
- `created_at` and `updated_at` timestamps are included for all core tables.
