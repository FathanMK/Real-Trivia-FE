import { useDispatch } from "react-redux";
import { TAppDispatch } from "../interfaces/TAppDispatch";

const useAppDispatch = useDispatch.withTypes<TAppDispatch>()

export default useAppDispatch