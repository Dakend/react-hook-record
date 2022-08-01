export type IRecord = Record<string, unknown>;

export type Key<TRecord extends IRecord> = keyof TRecord & string;

export type Value<
  TRecord extends IRecord,
  TKey extends Key<TRecord>
> = TRecord[TKey];

export type UseRecordSetValue<TRecord extends IRecord> = <
  TKey extends Key<TRecord>
>(
  key: TKey,
  value: Value<TRecord, TKey>
) => void;

export type UseRecordGetValues<TRecord extends IRecord> = () => TRecord;

export type UseRecordGetValue<TRecord extends IRecord> = <
  TKey extends Key<TRecord>
>(
  key: TKey
) => Value<TRecord, TKey>;

export type UseRecordReset = () => void;

export type UseRecordProps<TRecord extends IRecord> = {
  defaultValues: TRecord;
};

export type UseRecordReturns<TRecord extends IRecord> = {
  setValue: UseRecordSetValue<TRecord>;
  getValue: UseRecordGetValue<TRecord>;
  getValues: UseRecordGetValues<TRecord>;
  reset: UseRecordReset;
};
