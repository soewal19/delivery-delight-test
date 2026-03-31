import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md space-y-4">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          {isRouteError ? error.status : 'Oops!'}
        </h1>
        <p className="text-lg text-muted-foreground">
          {isRouteError
            ? error.status === 404
              ? "The page you're looking for doesn't exist."
              : error.statusText
            : 'An unexpected error occurred.'}
        </p>
        <Link to="/">
          <Button size="lg" className="mt-2">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
