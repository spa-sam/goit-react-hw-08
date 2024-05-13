import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    const normalizedFilter = nameFilter.toLowerCase().trim();
    return normalizedFilter === ""
      ? contacts
      : contacts.filter((contact) =>
          contact.name.toLowerCase().includes(normalizedFilter)
        );
  }
);
