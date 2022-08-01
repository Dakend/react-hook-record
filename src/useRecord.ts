import React from "react";
import {
  IRecord,
  UseRecordGetValue,
  UseRecordGetValues,
  UseRecordProps,
  UseRecordReset,
  UseRecordReturns,
  UseRecordSetValue,
} from "./types";

export const useRecord = <TRecord extends IRecord>(
  props: UseRecordProps<TRecord>
): UseRecordReturns<TRecord> => {
  const [state, dispatch] = React.useReducer<React.Reducer<TRecord, IRecord>>(
    (state, action) => ({ ...state, ...action }),
    props.defaultValues
  );

  const setValue: UseRecordSetValue<TRecord> = React.useCallback(
    (key, value) => dispatch({ [key]: value }),
    []
  );
  const getValue: UseRecordGetValue<TRecord> = React.useCallback(
    (key) => state[key],
    [state]
  );
  const getValues: UseRecordGetValues<TRecord> = React.useCallback(
    () => state,
    [state]
  );
  const reset: UseRecordReset = React.useCallback(
    () => dispatch(props.defaultValues),
    [props.defaultValues]
  );

  return React.useMemo(
    () => ({ setValue, getValue, getValues, reset }),
    [getValues, getValue, reset, setValue]
  );
};
