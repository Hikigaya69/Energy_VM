import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = ({
  children,
  className,
  padding = 'md',
  hover = false,
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700',
        paddingClasses[padding],
        hover && 'hover:shadow-md transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={clsx('border-b border-gray-200 dark:border-gray-700 pb-4 mb-4', className)}>
    {children}
  </div>
);

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => (
  <h3 className={clsx('text-lg font-semibold text-gray-900 dark:text-white', className)}>
    {children}
  </h3>
);

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => (
  <div className={clsx('space-y-4', className)}>
    {children}
  </div>
);