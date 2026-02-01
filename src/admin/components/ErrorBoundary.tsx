import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Props interface for the ErrorBoundary component
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

// State interface for the ErrorBoundary component
interface State {
  hasError: boolean;
  error?: Error;
}

// Error Boundary component to catch and handle React errors
// This prevents the entire app from crashing when API calls fail
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // This lifecycle method catches errors in child components
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // This method is called when an error is caught
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // Reset the error state to try rendering again
  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    // If there's an error, show the fallback UI
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex items-center justify-center min-h-64 bg-red-50 rounded-lg border border-red-200">
          <div className="text-center p-6">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-red-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleRetry}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

// Higher-order component to wrap components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};