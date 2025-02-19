"use client";

import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // Menentukan bahwa children adalah elemen React
}

interface ErrorBoundaryState {
  hasError: boolean; // Menentukan bahwa state memiliki hasError
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }; // Inisialisasi state
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true }; // Perbarui state jika terjadi error
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;