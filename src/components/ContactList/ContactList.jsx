import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { fetchContacts } from "../../redux/contacts/operations";
import {
  selectLoading,
  selectError,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";

function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const transitions = useTransition(filteredContacts, {
    keys: (contact) => contact.id,
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-20px)" },
  });

  return (
    <div className={css.contactListContainer}>
      {loading && filteredContacts.length === 0 ? (
        <p>Loading contacts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className={css.contactList}>
          {transitions((style, contact) => (
            <animated.li style={style} key={contact.id}>
              <Contact contact={contact} />
            </animated.li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
