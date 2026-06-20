import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalculatorSection } from '../../components/sections/calculator';

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

describe('CalculatorSection', () => {
  it('renders the calculator section correctly', () => {
    render(<CalculatorSection />);
    expect(screen.getByText(/Calculate Your Carbon/i)).toBeTruthy();
  });

  it('renders all slider inputs', () => {
    render(<CalculatorSection />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(6);
  });

  it('updates values when sliders are moved', () => {
    render(<CalculatorSection />);
    const electricitySlider = screen.getAllByRole('slider')[0];
    
    fireEvent.change(electricitySlider, { target: { value: '200' } });
    
    expect(electricitySlider).toHaveValue('200');
  });

  it('displays the AI Assessment section', () => {
    render(<CalculatorSection />);
    expect(screen.getByText(/AI Assessment/i)).toBeTruthy();
  });
});
