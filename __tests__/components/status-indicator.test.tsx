import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusIndicator } from '../../components/ui/status-indicator'

describe('StatusIndicator Component', () => {
  it('renders online status with green color', () => {
    render(<StatusIndicator status="online" />)
    const indicator = document.querySelector('[class*="bg-success"]')
    expect(indicator).toBeTruthy()
  })

  it('renders offline status with gray color', () => {
    render(<StatusIndicator status="offline" />)
    const indicator = document.querySelector('[class*="bg-text-muted"]')
    expect(indicator).toBeTruthy()
  })

  it('renders busy status with red color', () => {
    render(<StatusIndicator status="busy" />)
    const indicator = document.querySelector('[class*="bg-error"]')
    expect(indicator).toBeTruthy()
  })

  it('renders away status with yellow color', () => {
    render(<StatusIndicator status="away" />)
    const indicator = document.querySelector('[class*="bg-warning"]')
    expect(indicator).toBeTruthy()
  })

  it('shows ping animation for online status', () => {
    render(<StatusIndicator status="online" animate={true} />)
    const indicators = document.querySelectorAll('.animate-ping')
    expect(indicators.length).toBeGreaterThan(0)
  })

  it('shows pulse animation for busy status', () => {
    render(<StatusIndicator status="busy" animate={true} />)
    const indicators = document.querySelectorAll('.animate-pulse')
    expect(indicators.length).toBeGreaterThan(0)
  })

  it('shows label when showLabel is true', () => {
    render(<StatusIndicator status="online" showLabel />)
    expect(screen.getByText('Çevrimiçi')).toBeTruthy()
  })

  it('renders different sizes', () => {
    const { rerender } = render(<StatusIndicator status="online" size="sm" />)
    const smIndicator = document.querySelector('.w-2')
    expect(smIndicator).toBeTruthy()

    rerender(<StatusIndicator status="online" size="md" />)
    const mdIndicator = document.querySelector('.w-3')
    expect(mdIndicator).toBeTruthy()

    rerender(<StatusIndicator status="online" size="lg" />)
    const lgIndicator = document.querySelector('.w-4')
    expect(lgIndicator).toBeTruthy()
  })

  it('does not animate when animate is false', () => {
    render(<StatusIndicator status="online" animate={false} />)
    const pingIndicators = document.querySelectorAll('.animate-ping')
    expect(pingIndicators.length).toBe(0)
  })
})
