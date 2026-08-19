import { useId } from 'react';
import clsx from 'clsx';
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form';
// import { isNotEmptyString } from '../../lib/helpers';
// import { InfoCircleIcon } from '../../assets/icons';
// import { MoonLoader } from 'react-spinners';

type Props<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'type'
> & {
  name: Path<T>;
  label: string;
  loading?: boolean;
};

function formatNumber(value: number | string | undefined) {
  if (value === undefined || value === '') {
    return '';
  }

  return Number(value).toLocaleString();
}

function parseNumber(value: string) {
  const cleaned = value.replace(/,/g, '');

  if (cleaned === '') {
    return undefined;
  }

  const number = Number(cleaned);

  return Number.isNaN(number) ? undefined : number;
}

export function RhfNumberInput<T extends FieldValues>({
  name,
  label,
  className,
  loading = false,
  ...props
}: Props<T>) {
  const { control } = useFormContext<T>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const reactId = useId();
  const inputId = props.id ?? `number-${reactId}`;
  const placeholder = props.placeholder ?? ' ';

  return (
    <div>
      <div className={clsx('relative', className)}>
        <input
          {...props}
          id={inputId}
          inputMode="numeric"
          value={formatNumber(field.value)}
          onChange={(e) => {
            let value = e.target.value;

            value = value.replace(/\D/g, '');

            field.onChange(parseNumber(value));
          }}
          placeholder={placeholder}
          dir="ltr"
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={clsx(
            'w-full h-14.25 pt-0.5 border border-brown-40 transition-all peer placeholder:tracking-normal! placeholder:opacity-0 placeholder:text-brown-300',
            'rounded-full hover:border-brown-60 focus:border-primary placeholder:transition focus:placeholder:opacity-100 bg-brown-0 disabled:cursor-not-allowed',
            'sm:text-base! text-sm sm:pl-7 pl-5',
            { 'border-red-600!': error },
          )}
        />

        <label
          htmlFor={inputId}
          className={clsx(
            'absolute pointer-events-none transition-all -top-1.5 px-2 translate-y-0 text-xs font-medium text-brown-300 right-5 peer-focus:right-5',
            'peer-focus:-top-1.5 peer-focus:px-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium peer-focus:text-brown-900 bg-brown-0',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm rounded-b-lg',
            'peer-placeholder-shown:px-0 peer-placeholder-shown:right-7 peer-placeholder-shown:font-normal',
            {
              'text-red-600!': error,
            },
          )}
        >
          {label}
        </label>

        <div
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 sm:right-7 right-5 text-brown-100 pointer-events-none',
            {
              'right-5!': loading,
            },
          )}
        >
          {/* {loading && <MoonLoader size={18} />} */}
        </div>
      </div>

      {error?.message && (
        <div className="mt-1.5 text-red-600 text-xs flex items-center gap-2.5">
          {/* <InfoCircleIcon className="h-4.5" /> */}
          <p>{error!.message}</p>
        </div>
      )}
      {/* {isNotEmptyString(error?.message) && (
        <div className="mt-1.5 text-red-600 text-xs flex items-center gap-2.5">
          <InfoCircleIcon className="h-4.5" />
          <p>{error!.message}</p>
        </div>
      )} */}
    </div>
  );
}
