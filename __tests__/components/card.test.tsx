import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Card } from '../../components/ui/card'

describe('Card Component', () => {
  it('renders with default styles', () => {
    render(<Card>Kart İçeriği</Card>)
    const card = screen.getByText('Kart İçeriği')
    expect(card.className).toContain('bg-[#111113]')
    expect(card.className).toContain('border')
    expect(card.className).toContain('rounded-xl')
  })

  it('renders interactive variant with hover effects', () => {
    render(<Card variant="interactive">Etkileşimli Kart</Card>)
    const card = screen.getByText('Etkileşimli Kart')
    expect(card.className).toContain('hover:border-[#10b981]')
    expect(card.className).toContain('hover:-translate-y-0.5')
    expect(card.className).toContain('hover:shadow-md')
  })

  it('applies hover prop correctly', () => {
    render(<Card hover>Hover Kart</Card>)
    const card = screen.getByText('Hover Kart')
    expect(card.className).toContain('hover:border-[#10b981]')
    expect(card.className).toContain('hover:-translate-y-0.5')
  })

  it('renders with different padding sizes', () => {
    const { rerender } = render(<Card padding="sm">Küçük Padding</Card>)
    expect(screen.getByText('Küçük Padding').className).toContain('p-4')

    rerender(<Card padding="md">Orta Padding</Card>)
    expect(screen.getByText('Orta Padding').className).toContain('p-6')

    rerender(<Card padding="lg">Büyük Padding</Card>)
    expect(screen.getByText('Büyük Padding').className).toContain('p-8')

    rerender(<Card padding="none">Padding Yok</Card>)
    expect(screen.getByText('Padding Yok').className).toContain('')
  })

  it('renders featured variant with primary border', () => {
    render(<Card variant="featured">Öne Çıkan</Card>)
    const card = screen.getByText('Öne Çıkan')
    expect(card.className).toContain('border-[#10b981]/30')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Card onClick={handleClick}>Tıklanabilir</Card>)
    fireEvent.click(screen.getByText('Tıklanabilir'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
