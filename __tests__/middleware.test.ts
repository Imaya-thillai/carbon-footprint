/**
 * @jest-environment node
 */
import { middleware } from '../middleware';
import { NextRequest } from 'next/server';

describe('Middleware Security Headers', () => {
  it('adds security headers to responses', () => {
    const req = new NextRequest('http://localhost:3000/');
    const res = middleware(req);
    
    // Test that the required security headers are set
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('X-Frame-Options')).toBe('SAMEORIGIN');
    expect(res.headers.get('X-XSS-Protection')).toBe('1; mode=block');
    expect(res.headers.get('Strict-Transport-Security')).toBe('max-age=63072000; includeSubDomains; preload');
    expect(res.headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=(), payment=()');
    
    const csp = res.headers.get('Content-Security-Policy');
    expect(csp).toBeTruthy();
    expect(csp).not.toContain('unsafe-eval'); // Crucial fix verified
  });
});
