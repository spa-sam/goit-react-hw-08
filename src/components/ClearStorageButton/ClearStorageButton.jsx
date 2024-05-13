import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStorage, storageCleared } from "../../redux/storageSlice";
import css from "./ClearStorageButton.module.css";

const ClearStorageButton = () => {
  const dispatch = useDispatch();
  const shouldClear = useSelector((state) => state.storage.shouldClear);

  useEffect(() => {
    if (shouldClear) {
      localStorage.clear();
      dispatch(storageCleared());
    }
  }, [shouldClear, dispatch]);

  const handleClick = () => {
    dispatch(clearStorage());
  };

  return (
    <button onClick={handleClick} className={css.clearButton}>
      Clear Storage
    </button>
  );
};

export default ClearStorageButton;
