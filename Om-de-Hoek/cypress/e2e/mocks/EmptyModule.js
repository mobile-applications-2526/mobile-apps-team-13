// cypress/e2e/mocks/EmptyModule.js

// Export a default component that does nothing
const EmptyComponent = () => null;

// Export named exports that might be imported
export const CountryPicker = EmptyComponent;
export const useAsync = () => ({ loading: false, error: null, result: null });

// Default export
export default EmptyComponent;