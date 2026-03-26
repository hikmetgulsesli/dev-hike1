import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../../components/ui/button'

describe('Button Component', () => {
  it('renders primary variant with correct colors', () => {
    render(<Button variant="primary">Gönder</Button>)
    const button = screen.getByRole('button', { name: 'Gönder' })
    expect(button.className).toContain('bg-[#10b981]')
    expect(button.className).toContain('text-white')
  })

  it('renders secondary variant with correct colors', () => {
    render(<Button variant="secondary">İptal</Button>)
    const button = screen.getByRole('button', { name: 'İptal' })
    expect(button.className).toContain('text-[#10b981]')
    expect(button.className).toContain('border')
  })

  it('renders ghost variant with correct colors', () => {
    render(<Button variant="ghost">Detaylar</Button>)
    const button = screen.getByRole('button', { name: 'Detaylar' })
    expect(button.className).toContain('text-[#a1a1aa]')
    expect(button.className).toContain('hover:bg-[#1a1a1f]')
  })

  it('renders destructive variant with correct colors', () => {
    render(<Button variant="destructive">Sil</Button>)
    const button = screen.getByRole('button', { name: 'Sil' })
    expect(button.className).toContain('bg-[#ef4444]')
    expect(button.className).toContain('text-white')
  })

  it('shows loading spinner when loading prop is true', () => {
    render(<Button loading>Gönderiliyor</Button>)
    const button = screen.getByRole('button', { name: /gönderiliyor/i })
    expect(button.querySelector('svg')).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Tıkla</Button>)
    const button = screen.getByRole('button', { name: 'Tıkla' })
    expect(button).toHaveProperty('disabled', true)
    expect(button.className).toContain('opacity-50')
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Tıkla</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Tıkla' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Küçük</Button>)
    expect(screen.getByRole('button', { name: 'Küçük' }).className).toContain('px-4')

    rerender(<Button size="lg">Büyük</Button>)
    expect(screen.getByRole('button', { name: 'Büyük' }).className).toContain('px-8')
  })

  it('renders left and right icons', () => {
    render(<Button leftIcon={<span data-testid="left" />} rightIcon={<span data-testid="right" />}>İkonlu</Button>)
    expect(screen.getByTestId('left')).toBeTruthy()
    expect(screen.getByTestId('right')).toBeTruthy()
  })
})
