import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders the hero section with terminal greeting', () => {
    render(<Home />)
    expect(screen.getByText(/system.init/i)).toBeInTheDocument()
  })

  it('renders the status badge', () => {
    render(<Home />)
    expect(screen.getByText(/Projeler için uygun/i)).toBeInTheDocument()
  })

  it('renders the main heading with gradient text', () => {
    render(<Home />)
    expect(screen.getByText(/KINETIC EXPERIENCES/i)).toBeInTheDocument()
  })

  it('renders the CTA buttons', () => {
    render(<Home />)
    expect(screen.getByText(/Hakkımda Bilgi Al/i)).toBeInTheDocument()
    expect(screen.getByText(/Projeleri Gör/i)).toBeInTheDocument()
  })

  it('renders the featured projects section', () => {
    render(<Home />)
    expect(screen.getByText(/Selected Works/i)).toBeInTheDocument()
    expect(screen.getByText(/Vesta Dashboard/i)).toBeInTheDocument()
  })

  it('renders the recent writing section', () => {
    render(<Home />)
    expect(screen.getByText(/Logs & Research/i)).toBeInTheDocument()
  })

  it('renders the CTA section with contact button', () => {
    render(<Home />)
    expect(screen.getByText(/Birlikte çalışalım/i)).toBeInTheDocument()
    expect(screen.getByText(/İletişime Geç/i)).toBeInTheDocument()
  })

  it('renders the footer with navigation', () => {
    render(<Home />)
    expect(screen.getByText(/Hikmet Güleşli/i)).toBeInTheDocument()
    expect(screen.getByText(/Stack/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Blog/i)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/İletişim/i)[1]).toBeInTheDocument()
  })
})
