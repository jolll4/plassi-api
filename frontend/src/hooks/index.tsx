import { useSelector, useDispatch } from "react-redux";
import { store } from "../App";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<typeof store.getState>();
