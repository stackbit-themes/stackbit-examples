import { createContext } from 'react';

export type TestingContextType = {
    testMode: boolean;
    setTestMode: (testMode: boolean) => void;
};

export const TestingContext = createContext<TestingContextType>({ testMode: false, setTestMode: (testMode: boolean) => {} });
