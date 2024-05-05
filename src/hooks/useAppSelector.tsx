import { useSelector } from "react-redux";
import { TRootState } from "../interfaces/TRootState";

const useAppSelector =  useSelector.withTypes<TRootState>()

export default useAppSelector