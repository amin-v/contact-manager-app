import { createContext } from "react";

export const ContactContext = createContext({
    Loading: false,
    setLoading: () => {},
    setContacts: () => {},
    contacts: [],
    filteredContacts: [],
    setFilteredContacts: () => {},
    contactQuery: {},
    goups: [],
    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
});