# Code Test Instructions

🚀 Demo
(https://gsynergy-data-grid.netlify.app/)

## Setup and Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/
├── pages/
├── store/
├── utils/
└── models/
```

## Key Requirements

1. Application must use React + TypeScript
2. State management using Redux Toolkit
3. Data visualization with charts
4. Responsive design

## Development Guidelines

- Use TypeScript strictly (no 'any' types)
- Follow component-based architecture
- Implement proper error handling
- Include loading states

## Well-Executed Aspects

### 1. Technical Implementation

- TypeScript integration with proper interfaces
- Redux store organization
- Component reusability
- Error boundaries

### 2. Code Organization

- Clear folder structure
- Separation of concerns
- Type definitions
- Utility functions

## Areas for Improvement (4 Extra Hours)

### 1. Testing

```typescript
// Add Jest configuration
// filepath: jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### 2. Performance

- Implement React.memo for expensive components
- Add code splitting
- Optimize bundle size

### 3. Documentation

- Add JSDoc comments
- Create component documentation
- Add README for each major feature

### 4. Error Handling

```typescript
// filepath: src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Testing Instructions

```bash
# Run tests
npm run test

# Generate coverage report
npm run test:coverage
```
