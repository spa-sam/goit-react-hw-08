import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Too Short!")
    .max(50, "Must be less than 50 characters"),
  number: Yup.string()
    .required("Required")
    .min(3, "Too Short!")
    .max(50, "Must be less than 50 characters")
    .matches(/^[0-9-]+$/, "Must be only digits and dashes"),
});

function ContactForm() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addContact(values))
          .then(() => {
            toast.success("Contact added successfully");
            resetForm();
          })
          .catch(() => {
            toast.error("Failed to add contact");
          });
      }}
    >
      <Form className={css.contactForm}>
        <label htmlFor="name" className={css.labelForm}>
          Name
        </label>
        <Field name="name" type="text" id="name" className={css.inputField} />
        <ErrorMessage name="name" component="div" className={css.errorText} />

        <label htmlFor="number" className={css.labelForm}>
          Number
        </label>
        <Field
          name="number"
          type="text"
          id="number"
          className={css.inputField}
        />
        <ErrorMessage name="number" component="div" className={css.errorText} />

        <button type="submit" className={css.addContact}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
