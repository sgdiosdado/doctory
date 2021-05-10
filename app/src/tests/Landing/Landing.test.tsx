import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Landing } from '../../views/Landing/Landing';
import { createMemoryHistory } from "history";
import { Router } from 'react-router';
import { routes } from '../../routes/routes';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

describe('Landing view tests', () => {
  
  test('should display title', () => {
    const history = createMemoryHistory();
    const landingView = render(
      <Router history={history}>
          <Landing />
      </Router>
    );
    expect(landingView.getAllByText('Administra tu historia clínica y compartela con tu doctor').length).toBe(1)
  })
  
  test('should first button redirect to signup', async () => {
    const history = createMemoryHistory();
    const landingView = render(
      <Router history={history}>
          <Landing />
      </Router>
    );
    const cta = await landingView.findAllByText('Unirse');
    fireEvent.click(cta[0]);
    expect(history.location.pathname).toBe(routes.signup.path);
  })

  test('should second button redirect to signup', async () => {
    const history = createMemoryHistory();
    const landingView = render(
      <Router history={history}>
          <Landing />
      </Router>
    );
    const cta = await landingView.findAllByText('Unirse');
    fireEvent.click(cta[1]);
    expect(history.location.pathname).toBe(routes.signup.path);
  })
  
})
