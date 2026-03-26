import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input, Textarea } from '../../components/ui/input'

describe('Input Component', () => {
  it('renders with default styles', () => {
    render(<Input placeholder="E-posta adresi" />)
    const input = screen.getByPlaceholderText('E-posta adresi')
    expect(input.className).toContain('bg-background-elevated')
    expect(input.className).toContain('border')
  })

  it('shows focus ring with primary color', () => {
    render(<Input placeholder="Adınız" />)
    const input = screen.getByPlaceholderText('Adınız')
    expect(input.className).toContain('focus:border-primary')
    expect(input.className).toContain('ring-2')
    expect(input.className).toContain('ring-primary/20')
  })

  it('shows error state with error message', () => {
    render(
      <Input 
        placeholder="E-posta" 
        error 
        errorMessage="Geçerli bir e-posta girin" 
      />
    )
    const input = screen.getByPlaceholderText('E-posta')
    expect(input.className).toContain('border-error')
    expect(input.className).toContain('ring-error/20')
    expect(screen.getByText('Geçerli bir e-posta girin')).toBeTruthy()
  })

  it('renders with left and right icons', () => {
    render(
      <Input 
        placeholder="Ara" 
        leftIcon={<span data-testid="left-icon" />} 
        rightIcon={<span data-testid="right-icon" />} 
      />
    )
    expect(screen.getByTestId('left-icon')).toBeTruthy()
    expect(screen.getByTestId('right-icon')).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input placeholder="Disabled" disabled />)
    const input = screen.getByPlaceholderText('Disabled')
    expect(input).toHaveProperty('disabled', true)
    expect(input.className).toContain('opacity-50')
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(<Input placeholder="Yazın" onChange={handleChange} />)
    const input = screen.getByPlaceholderText('Yazın')
    fireEvent.change(input, { target: { value: 'Yeni değer' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('renders different sizes', () => {
    const { rerender } = render(<Input placeholder="Küçük" size="sm" />)
    expect(screen.getByPlaceholderText('Küçük').className).toContain('px-3')

    rerender(<Input placeholder="Orta" size="md" />)
    expect(screen.getByPlaceholderText('Orta').className).toContain('px-4')

    rerender(<Input placeholder="Büyük" size="lg" />)
    expect(screen.getByPlaceholderText('Büyük').className).toContain('px-5')
  })
})

describe('Textarea Component', () => {
  it('renders with default styles', () => {
    render(<Textarea placeholder="Mesajınız" />)
    const textarea = screen.getByPlaceholderText('Mesajınız')
    expect(textarea.className).toContain('bg-background-elevated')
    expect(textarea.className).toContain('border')
  })

  it('shows focus ring with primary color', () => {
    render(<Textarea placeholder="Detaylar" />)
    const textarea = screen.getByPlaceholderText('Detaylar')
    expect(textarea.className).toContain('focus:border-primary')
    expect(textarea.className).toContain('ring-2')
  })

  it('shows error state with error message', () => {
    render(
      <Textarea 
        placeholder="Açıklama" 
        error 
        errorMessage="En az 20 karakter gerekli" 
      />
    )
    expect(screen.getByText('En az 20 karakter gerekli')).toBeTruthy()
  })

  it('shows character count when showCount is true', () => {
    render(
      <Textarea 
        placeholder="Bio" 
        value="Merhaba" 
        showCount 
        maxLength={100} 
      />
    )
    expect(screen.getByText('7/100')).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    render(<Textarea placeholder="Disabled" disabled />)
    const textarea = screen.getByPlaceholderText('Disabled')
    expect(textarea).toHaveProperty('disabled', true)
  })
})
