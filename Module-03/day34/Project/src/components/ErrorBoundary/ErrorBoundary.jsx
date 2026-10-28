import { Component } from "react";
import styles from "./errorBoundary.module.css";

class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  resetErrorBoundary = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (typeof fallback === "function") {
        return fallback({
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        });
      }

      if (fallback) {
        return fallback;
      }

      return (
        <ErrorFallback
          title="Something went wrong"
          message="This part of the application could not be displayed."
          onRetry={this.resetErrorBoundary}
        />
      );
    }

    return children;
  }
}

export function ErrorFallback({ title, message, onRetry }) {
  return (
    <section className={styles.fallback} role="alert">
      <h2>{title}</h2>
      <p>{message}</p>

      {onRetry && (
        <button className={styles.retryButton} type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </section>
  );
}

export default ErrorBoundary;
