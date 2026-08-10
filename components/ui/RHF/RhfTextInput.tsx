import { cloneElement, useId } from 'react';
import clsx from 'clsx';
// import { MoonLoader } from 'react-spinners';
import { useController, useFormContext, type FieldValues, type Path } from 'react-hook-form';

// import { InfoCircleIcon } from '../../assets/icons';
// import { isNotEmptyString } from '../../lib/helpers';

type Props<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'
> & {
  name: Path<T>;
  label: string;
  loading?: boolean;
  icon?: React.ReactElement<{
    className?: string;
  }>;
};

export function RhfTextInput<T extends FieldValues>({
  name,
  label,
  icon,
  className,
  loading,
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
  const inputId = props.id ?? `txt-${reactId}`;
  const placeholder = props.placeholder ?? ' ';
  const isLtr = props.dir === 'ltr';
  const withIcon = !!icon || loading;

  return (
    <div>
      <div className={clsx('relative', className)}>
        <input
          {...props}
          {...field}
          id={inputId}
          value={field.value ?? ''}
          placeholder={placeholder}
          autoComplete={props.autoComplete ?? 'on'}
          aria-label={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={clsx(
            'w-full h-14.25 pt-0.5 border border-brown-40 transition-all peer placeholder:tracking-normal! placeholder:opacity-0 placeholder:text-brown-300',
            'rounded-full hover:border-brown-60 focus:border-primary placeholder:transition focus:placeholder:opacity-100 bg-brown-0 disabled:cursor-not-allowed',
            'sm:text-base! text-sm',
            {
              'sm:pl-7 pl-5': isLtr && !withIcon,
              'sm:pr-7 pr-5': !isLtr && !withIcon,
              'sm:pl-14 pl-12': isLtr && withIcon,
              'sm:pr-14 pr-12': !isLtr && withIcon,
              'sm:pl-7! pl-5!': isLtr && loading,
              'border-red-600!': !!error,
            },
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
              'text-red-600!': !!error,
              'right-7! peer-focus:right-7! peer-placeholder-shown:right-15!': !!icon,
            },
          )}
        >
          {label}
        </label>

        {withIcon && (
          <div
            className={clsx(
              'absolute top-1/2 -translate-y-1/2 sm:right-7 right-5 text-brown-100 pointer-events-none',
              {
                'right-5!': loading,
              },
            )}
          >
            {loading ? (
              // <MoonLoader size={18} />
              <p>loading</p>
            ) : (
              icon &&
              cloneElement(icon, {
                className: 'w-[22px]',
              })
            )}
          </div>
        )}
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
