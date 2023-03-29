import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface NaviItemProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active: boolean;
  children: ReactNode;
}

const NaviItem = ({ active, children, ...rest }: NaviItemProps) => {
  const { className, ...props } = rest;

  return (
    <button
      className={clsx(
        'rounded-md flex',
        'px-4 py-2 cursor-pointer',
        'transition-all',
        'select-none',
        active && 'bg-white dark:bg-black',
        active || 'hover:bg-gray-200 dark:hover:bg-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default NaviItem;
