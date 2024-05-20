import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import css from "./SearchBox.module.css";

function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleChangeFilter = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label htmlFor="search" className={css.label}>
        Find contacts by name
      </label>
      <input
        id="search"
        type="text"
        className={css.input}
        value={filter}
        onChange={handleChangeFilter}
      />
    </div>
  );
}

export default SearchBox;
