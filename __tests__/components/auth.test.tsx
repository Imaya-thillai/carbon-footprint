import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthPage from '../../app/auth/page';

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

describe('AuthPage', () => {
  it('renders sign in form by default', () => {
    render(<AuthPage />);
    expect(screen.getByRole('heading', { name: /Welcome Back/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeTruthy();
  });

  it('toggles to sign up form', () => {
    render(<AuthPage />);
    const toggleButton = screen.getByRole('button', { name: /Sign Up/i });
    fireEvent.click(toggleButton);
    
    expect(screen.getByRole('heading', { name: /Create Your Account/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeTruthy();
    expect(screen.getByLabelText(/Full Name/i)).toBeTruthy();
  });

  it('allows input in email and password fields', () => {
    render(<AuthPage />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
