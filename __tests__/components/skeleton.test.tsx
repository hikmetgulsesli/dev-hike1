import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from '../../components/ui/skeleton'

describe('Skeleton Component', () => {
  it('renders text variant', () => {
    render(<Skeleton variant="text" />)
    const skeleton = document.querySelector('.rounded')
    expect(skeleton).toBeTruthy()
  })

  it('renders circular variant', () => {
    render(<Skeleton variant="circular" />)
    const skeleton = document.querySelector('.rounded-full')
    expect(skeleton).toBeTruthy()
  })

  it('renders rectangular variant', () => {
    render(<Skeleton variant="rectangular" />)
    const skeleton = document.querySelector('.rounded-lg')
    expect(skeleton).toBeTruthy()
  })

  it('renders card variant', () => {
    render(<Skeleton variant="card" />)
    const skeleton = document.querySelector('.rounded-xl')
    expect(skeleton).toBeTruthy()
  })

  it('shows wave animation by default', () => {
    render(<Skeleton variant="rectangular" />)
    const skeleton = document.querySelector('.relative')
    expect(skeleton).toBeTruthy()
    expect(skeleton?.className).toContain('overflow-hidden')
  })

  it('shows pulse animation when specified', () => {
    render(<Skeleton variant="rectangular" animation="pulse" />)
    const skeleton = document.querySelector('.animate-pulse')
    expect(skeleton).toBeTruthy()
  })

  it('shows no animation when animation is none', () => {
    const { container } = render(<Skeleton variant="rectangular" animation="none" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toBeTruthy()
    expect(skeleton.className).not.toContain('animate-pulse')
    expect(skeleton.className).not.toContain('overflow-hidden')
  })

  it('applies custom width and height', () => {
    render(<Skeleton width={200} height={100} />)
    const skeleton = document.querySelector('[style]') as HTMLElement
    expect(skeleton).toBeTruthy()
  })

  it('renders with custom className', () => {
    render(<Skeleton className="mt-4" />)
    const skeleton = document.querySelector('.mt-4')
    expect(skeleton).toBeTruthy()
  })
})
