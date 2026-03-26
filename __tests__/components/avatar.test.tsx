import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from '../../components/ui/avatar'

describe('Avatar Component', () => {
  it('renders with image src', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Kullanıcı Avatarı" />)
    const img = screen.getByAltText('Kullanıcı Avatarı') as HTMLImageElement
    expect(img).toBeTruthy()
    expect(img.src).toBe('https://example.com/avatar.jpg')
  })

  it('displays initials when image errors', () => {
    render(<Avatar src="https://example.com/avatar.jpg" fallback="Test User" />)
    const img = screen.getByAltText('')
    fireEvent.error(img)
    const fallbackDiv = screen.getByTestId('avatar-fallback')
    expect(fallbackDiv).toBeTruthy()
    expect(fallbackDiv.className).toContain('bg-primary')
    expect(screen.getByText('TU')).toBeTruthy()
  })

  it('displays question mark when no fallback provided', () => {
    render(<Avatar />)
    const questionMark = screen.getByText('?')
    expect(questionMark).toBeTruthy()
  })

  it('shows status indicator when status prop is provided', () => {
    render(<Avatar fallback="Ahmet Kaya" status="online" />)
    // Check for status indicator via the indicator div having bg-success
    const indicator = document.querySelector('[class*="bg-success"]')
    expect(indicator).toBeTruthy()
  })

  it('renders different sizes correctly', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
    const expectedWidths = ['w-6', 'w-8', 'w-10', 'w-14', 'w-20', 'w-32']
    
    sizes.forEach((size, index) => {
      const { container } = render(<Avatar fallback="Test" size={size} />)
      const avatarContainer = container.firstChild as HTMLElement
      expect(avatarContainer.className).toContain(expectedWidths[index])
    })
  })

  it('renders as rounded-full by default', () => {
    render(<Avatar fallback="Test" />)
    const avatar = document.querySelector('.rounded-full')
    expect(avatar).toBeTruthy()
  })

  it('renders as rounded-lg when rounded is false', () => {
    render(<Avatar fallback="Test" rounded={false} />)
    const avatar = document.querySelector('.rounded-lg')
    expect(avatar).toBeTruthy()
    expect(avatar?.className).not.toContain('rounded-full')
  })

  it('handles single word fallback', () => {
    render(<Avatar fallback="Hikmet" />)
    const initials = screen.getByText('HI')
    expect(initials).toBeTruthy()
  })
})
