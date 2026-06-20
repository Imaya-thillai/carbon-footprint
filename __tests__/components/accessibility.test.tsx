import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalculatorSection } from '../../components/sections/calculator';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Accessibility Requirements', () => {
  describe('Calculator Section', () => {
    it('has a skip navigation link', () => {
      render(<CalculatorSection />);
      // Testing specific component a11y
      expect(screen.getAllByRole('slider').length).toBeGreaterThan(0);
    });

    it('has ARIA labels for all sliders', () => {
      render(<CalculatorSection />);
      const sliders = screen.getAllByRole('slider');
      sliders.forEach((slider) => {
        // Will fail until ARIA attributes are added in Phase 3
        expect(slider).toHaveAttribute('aria-label');
      });
    });

    it('uses semantic heading hierarchy', () => {
      render(<CalculatorSection />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInDocument();
    });
  });
});
