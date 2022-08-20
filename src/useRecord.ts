import { Reducer, useMemo, useReducer } from "react";
import {
  GetValue,
  GetValues,
  IRecord,
  Reset,
  SetValue,
  UseRecordProps,
  UseRecordReturns,
} from "./types";

export const useRecord = <TRecord extends IRecord>(
  props: UseRecordProps<TRecord>
): UseRecordReturns<TRecord> => {
  const [state, dispatch] = useReducer<Reducer<TRecord, IRecord>>(
    (state, action) => ({ ...state, ...action }),
    props.defaultValues
  );
  return useMemo(
    () => ({
      setValue: setValue(dispatch),
      getValue: getValue(state),
      getValues: getValues(state),
      reset: reset(dispatch, props.defaultValues),
    }),
    [props.defaultValues, state]
  );
};

const setValue: SetValue = (dispatch) => (key, value) =>
  dispatch({ [key]: value });
const getValue: GetValue = (state) => (key) => state[key];
const getValues: GetValues = (state) => () => state;
const reset: Reset = (dispatch, defaultValues) => () => dispatch(defaultValues);
