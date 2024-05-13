import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { fetchContacts } from "../../redux/contactsOps";
import {
  selectLoading,
  selectError,
  // selectFilteredContacts,
} from "../../redux/contactsSlice";
import { selectFilteredContacts } from "../../redux/selectors";

function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // useEffect(() => {
  //   if (filteredContacts.length === 0) {
  //     dispatch(fetchContacts());
  //   }
  // }, [dispatch, filteredContacts]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contactListContainer}>
      {loading && filteredContacts.length === 0 ? (
        <p>Loading contacts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <TransitionGroup component="div" className={css.contactList}>
          {filteredContacts.map((contact) => (
            <CSSTransition key={contact.id} timeout={300} classNames={css}>
              <Contact contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
}

export default ContactList;
