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
    expect(screen.getByText(/SEÇİLMİŞ ÇALIŞMALAR/i)).toBeInTheDocument()
    expect(screen.getByText(/Vesta Dashboard/i)).toBeInTheDocument()
  })

  it('renders the recent writing section', () => {
    render(<Home />)
    expect(screen.getByText(/GÜNLÜK & ARAŞTIRMA/i)).toBeInTheDocument()
  })

  it('renders the CTA section with contact button', () => {
    render(<Home />)
    expect(screen.getByText(/İletişime Geç/i)).toBeInTheDocument()
  })

  it('renders the footer with navigation', () => {
    render(<Home />)
    expect(screen.getByText(/HİKMET GÜLEŞLİ/i)).toBeInTheDocument()
    expect(screen.getByText(/STACK/i)).toBeInTheDocument()
    expect(screen.getAllByText(/BLOG/i)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/İLETİŞİM/i)[0]).toBeInTheDocument()
  })
})
