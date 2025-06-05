import React, { Component, ErrorInfo } from 'react';
import { useNotificationStore } from '../../store/notificationStore';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebhookErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Webhook Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return null; // Silently handle webhook errors
    }

    return this.props.children;
  }
}
