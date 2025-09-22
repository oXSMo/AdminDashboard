import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // The state contains a flag to know if an error occurred.
    this.state = { hasError: false };
  }

  // Use this to update state and trigger a fallback UI render.
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // Use this to perform side effects like logging the error.
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    // Example: logErrorToMyService(error, errorInfo);
  }

  render() {
    // If an error was caught, render the fallback UI.
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try refreshing the page.</h1>;
    }

    // If there's no error, render the children as normal.
    return this.props.children;
  }
}

export default ErrorBoundary;