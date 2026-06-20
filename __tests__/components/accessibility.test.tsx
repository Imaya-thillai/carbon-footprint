import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CalculatorSection } from '../../components/sections/calculator';

expect.extend(toHaveNoViolations);

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

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
    it('has no accessibility violations (jest-axe)', async () => {
      const { container } = render(<CalculatorSection />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has ARIA labels for all sliders', () => {
      render(<CalculatorSection />);
      const sliders = screen.getAllByRole('slider');
      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute('aria-label');
      });
    });

    it('uses semantic heading hierarchy', () => {
      render(<CalculatorSection />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });
});
