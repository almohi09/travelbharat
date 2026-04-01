/**
 * ErrorBoundary component to catch React errors
 */
import { Component } from 'react';
import { MdError } from 'react-icons/md';
import Button from './Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-6">
          <div className="text-center">
            <MdError size={48} className="mx-auto mb-4 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
            </p>
            <Button
              onClick={this.handleReset}
              variant="primary"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
