import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from '../../components/ui/avatar'

describe('Avatar Component', () => {
  it('renders with image src', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Kullanıcı Avatarı" />)
    const img = screen.getByAltText('Kullanıcı Avatarı') as HTMLImageElement
    expect(img).toBeTruthy()
    expect(img.src).toBe('https://example.com/avatar.jpg')
  })

  it('displays initials fallback when src fails', () => {
    render(<Avatar fallback="Elif Yılmaz" />)
    // The avatar should show initials EY
    const initials = screen.getByText('EY')
    expect(initials).toBeTruthy()
    // The initials span is inside the div with bg-[#10b981]
    expect(initials.parentElement?.className).toContain('bg-[#10b981]')
  })

  it('displays question mark when no fallback provided', () => {
    render(<Avatar />)
    const questionMark = screen.getByText('?')
    expect(questionMark).toBeTruthy()
  })

  it('shows status indicator when status prop is provided', () => {
    render(<Avatar fallback="Ahmet Kaya" status="online" />)
    const indicator = document.querySelector('.bg-\\[\\#22c55e\\]')
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
