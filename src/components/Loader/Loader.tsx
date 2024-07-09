import { Circles } from "react-loader-spinner";
import style from "./Loader.module.css";

const Loader:React.FC = () => {
  return (
    <div className={style.loader}>
      <Circles color="#00BFFF" height={40} width={40} />
    </div>
  );
};

export default Loader;
