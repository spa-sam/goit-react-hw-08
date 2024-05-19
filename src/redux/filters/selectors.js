import { createSelector } from "@reduxjs/toolkit";

export const selectFilters = (state) => state.filters;

export const selectNameFilter = createSelector(
  selectFilters,
  (filters) => filters.name
);
