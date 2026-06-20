import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthPage from '../app/auth/page';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('AuthPage', () => {
  it('renders sign in form by default', () => {
    render(<AuthPage />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('toggles to sign up form', () => {
    render(<AuthPage />);
    const toggleBtn = screen.getByText('Sign Up');
    fireEvent.click(toggleBtn);
    expect(screen.getByText('Create Your Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
  });

  it('shows validation errors for empty submission on sign in', async () => {
    render(<AuthPage />);
    const submitBtn = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.submit(submitBtn.closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });
});
