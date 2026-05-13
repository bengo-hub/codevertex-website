// React 19.2 — ref as a regular prop (no forwardRef)
import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

function Card({ className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn('rounded-2xl border border-border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    />
  );
}
Card.displayName = 'Card';

function CardHeader({ className, ref, ...props }: CardProps) {
  return <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
}
CardHeader.displayName = 'CardHeader';

function CardTitle({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) {
  return (
    <h3
      ref={ref}
      className={cn('text-xl font-bold leading-tight tracking-tight', className)}
      {...props}
    />
  );
}
CardTitle.displayName = 'CardTitle';

function CardDescription({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p ref={ref} className={cn('text-sm text-muted-foreground leading-relaxed', className)} {...props} />
  );
}
CardDescription.displayName = 'CardDescription';

function CardContent({ className, ref, ...props }: CardProps) {
  return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
}
CardContent.displayName = 'CardContent';

function CardFooter({ className, ref, ...props }: CardProps) {
  return <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
