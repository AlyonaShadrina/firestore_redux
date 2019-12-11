import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('some fake test', async () => {
    const { queryByRole } = render(<App />);

    expect(queryByRole('button')).toBeNull();
});
