import React from "react";
import toast from "react-hot-toast";
import { ChildrenProps } from "../../types/props";

class ErrorBoundary extends React.Component<
  ChildrenProps,
  { hasError: boolean; error?: unknown }
> {
  constructor(props: ChildrenProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
    if (error instanceof Error) {
      toast.error(error.message);
    } else if (typeof error === "string") {
      toast.error(error);
    }
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return !hasError && children;
  }
}

export default ErrorBoundary;
