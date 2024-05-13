import { FaPhone, FaUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import css from "./Contact.module.css";

function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={css.contact}>
      <div className={css.contactInfo}>
        <div className={css.contactItem}>
          <FaUser className={css.contactIcon} />
          <p className={css.contactName}>{contact.name}</p>
        </div>
        <div className={css.contactItem}>
          <FaPhone className={css.contactIcon} />
          <p className={css.contactNumber}>{contact.number}</p>
        </div>
      </div>
      <button className={css.contactDelete} onClick={handleDeleteContact}>
        Delete
      </button>
    </div>
  );
}

export default Contact;
