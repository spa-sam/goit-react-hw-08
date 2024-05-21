import { useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import Modal from "react-modal";
import { toast } from "react-hot-toast";
import css from "./Contact.module.css";

Modal.setAppElement("#root");

function Contact({ contact }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteContact = () => {
    dispatch(deleteContact(contact.id))
      .then(() => {
        toast.success("Contact deleted successfully");
        setIsModalOpen(false);
      })
      .catch(() => {
        toast.error("Failed to delete contact");
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <button className={css.contactDelete} onClick={openModal}>
        Delete
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className={css.modal}
        overlayClassName={css.modalOverlay}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this contact?</p>
        <div className={css.modalButtons}>
          <button onClick={handleDeleteContact}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Contact;
