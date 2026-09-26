import { Component } from "react";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Mesob House rendering error:", error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.page}>
          <section className={styles.card} role="alert">
            <span className={styles.eyebrow}>MESOB HOUSE · SYSTEM ERROR</span>

            <h1>Something went wrong</h1>

            <p>
              We couldn&apos;t display this part of Mesob House right now.
              Please try again or return to the home page.
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={this.handleRetry}
              >
                <FiRefreshCw aria-hidden="true" />
                Try Again
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={this.handleGoHome}
              >
                <FiArrowLeft aria-hidden="true" />
                Return to Home
              </button>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
