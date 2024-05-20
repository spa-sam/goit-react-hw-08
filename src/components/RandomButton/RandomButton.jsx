import { useDispatch, useSelector } from "react-redux";
import { addRandomContacts } from "../../api";
import { selectToken } from "../../redux/auth/selectors";
import { addContact } from "../../redux/contacts/operations";
import css from "./RandomButton.module.css";

const RandomButton = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const handleAddRandomContacts = async () => {
    try {
      const contacts = await addRandomContacts(token);
      contacts.forEach((contact) => {
        dispatch(addContact(contact));
      });
    } catch (error) {
      console.error("Error adding random contacts:", error);
    }
  };

  return (
    <button className={css.randomButton} onClick={handleAddRandomContacts}>
      Add Random Contacts
    </button>
  );
};

export default RandomButton;
