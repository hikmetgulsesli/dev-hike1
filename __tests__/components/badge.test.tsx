import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Badge } from '../../components/ui/badge'

describe('Badge Component', () => {
  it('renders default variant with correct colors', () => {
    render(<Badge>Etiket</Badge>)
    const badge = screen.getByText('Etiket')
    expect(badge.className).toContain('bg-[#1a1a1f]')
    expect(badge.className).toContain('text-[#a1a1aa]')
  })

  it('renders primary variant with correct colors', () => {
    render(<Badge variant="primary">Birincil</Badge>)
    const badge = screen.getByText('Birincil')
    expect(badge.className).toContain('bg-[#10b981]/20')
    expect(badge.className).toContain('text-[#10b981]')
  })

  it('renders secondary variant with correct colors', () => {
    render(<Badge variant="secondary">İkincil</Badge>)
    const badge = screen.getByText('İkincil')
    expect(badge.className).toContain('bg-[#6366f1]/20')
    expect(badge.className).toContain('text-[#6366f1]')
  })

  it('renders accent variant with correct colors', () => {
    render(<Badge variant="accent">Vurgulu</Badge>)
    const badge = screen.getByText('Vurgulu')
    expect(badge.className).toContain('bg-[#8b5cf6]/20')
    expect(badge.className).toContain('text-[#8b5cf6]')
  })

  it('renders success variant with correct colors', () => {
    render(<Badge variant="success">Başarılı</Badge>)
    const badge = screen.getByText('Başarılı')
    expect(badge.className).toContain('bg-[#22c55e]/20')
    expect(badge.className).toContain('text-[#22c55e]')
  })

  it('renders warning variant with correct colors', () => {
    render(<Badge variant="warning">Uyarı</Badge>)
    const badge = screen.getByText('Uyarı')
    expect(badge.className).toContain('bg-[#f59e0b]/20')
    expect(badge.className).toContain('text-[#f59e0b]')
  })

  it('renders error variant with correct colors', () => {
    render(<Badge variant="error">Hata</Badge>)
    const badge = screen.getByText('Hata')
    expect(badge.className).toContain('bg-[#ef4444]/20')
    expect(badge.className).toContain('text-[#ef4444]')
  })

  it('renders removable badge with close button', () => {
    const handleRemove = vi.fn()
    render(
      <Badge removable onRemove={handleRemove}>
        Kaldırılabilir
      </Badge>
    )
    const badge = screen.getByText('Kaldırılabilir')
    expect(badge.querySelector('button')).toBeTruthy()
  })

  it('calls onRemove when remove button is clicked', () => {
    const handleRemove = vi.fn()
    render(
      <Badge removable onRemove={handleRemove}>
        Kaldır
      </Badge>
    )
    const removeButton = screen.getByRole('button', { name: 'Kaldır' })
    fireEvent.click(removeButton)
    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Badge size="sm">Küçük</Badge>)
    expect(screen.getByText('Küçük').className).toContain('text-xs')
    expect(screen.getByText('Küçük').className).toContain('px-2')

    rerender(<Badge size="md">Orta</Badge>)
    expect(screen.getByText('Orta').className).toContain('text-sm')
    expect(screen.getByText('Orta').className).toContain('px-3')
  })
})
