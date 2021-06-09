import React from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { createMemoryHistory } from "history";
import { Router } from 'react-router';
import { LoginView } from '../../views/AuthViews/LoginView';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act } from 'react-dom/test-utils';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

describe('Login view tests', () => {

  test('should display title', async () => {
    const history = createMemoryHistory();
    const queryClient = new QueryClient();
    let wrapper: RenderResult;
    
    await act(async () => {
      wrapper = render(
        <QueryClientProvider client={queryClient}>
          <Router history={history}>
              <LoginView />
          </Router>
        </QueryClientProvider>
      );
    })

    waitFor(() => {
      const title = wrapper.getAllByText('Iniciar sesión');
      expect(title.length).toBe(1)
    })
  })

})
