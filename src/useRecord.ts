import { Reducer, useCallback, useMemo, useReducer } from "react";
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
  const [state, dispatch] = useReducer<Reducer<TRecord, IRecord>>(
    (state, action) => ({ ...state, ...action }),
    props.defaultValues
  );

  const setValue: UseRecordSetValue<TRecord> = useCallback(
    (key, value) => dispatch({ [key]: value }),
    []
  );

  const getValue: UseRecordGetValue<TRecord> = useCallback(
    (key) => state[key],
    []
  );

  const getValues: UseRecordGetValues<TRecord> = useCallback(() => state, []);

  const reset: UseRecordReset = useCallback(
    () => dispatch(props.defaultValues),
    []
  );

  return useMemo(
    () => ({ setValue, getValue, getValues, reset }),
    [props.defaultValues, state]
  );
};
