import { clsx } from 'clsx';

export const Card = ({
  children,
  className,
  padding = 'md',
  hover = false,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-black',
        paddingClasses[padding],
        hover && 'hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={clsx('border-b border-gray-200 dark:border-gray-200 pb-4 mb-4', className)}>
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={clsx('text-lg font-semibold text-gray-200 dark:text-white', className)}>
    {children}
  </h3>
);

export const CardContent = ({ children, className }) => (
  <div className={clsx('space-y-4', className)}>
    {children}
  </div>
);