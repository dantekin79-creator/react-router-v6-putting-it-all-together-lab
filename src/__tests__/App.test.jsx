import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render as rtlRender, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// Custom render function that wraps components with MemoryRouter
const render = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter {...options}>
      {children}
    </MemoryRouter>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/directors')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: "1",
            name: 'Christopher Nolan',
            bio: 'Director of mind-bending films.',
            movies: [{ id: 'm1', title: 'Inception', time: 148, genres: ['Sci-Fi', 'Thriller'] }],
          },
        ],
      })
    }
  })
})

describe('🎬 Movie Directory App - Vitest Suite', () => {
  it('renders Home component at root ("/")', async () => {
    render(<App />, { initialEntries: ['/'] })
    expect(await screen.findByText(/Welcome to the Movie Directory/i)).toBeInTheDocument()
  })

  it('navigates to About page when clicking About link', async () => {
    render(<App />, { initialEntries: ['/'] })
    const navbars = screen.getAllByRole('navigation')
    const navbar = navbars[0]
  
    const aboutLink = within(navbar).getByRole('link', { name: /^About$/i })
    fireEvent.click(aboutLink)
  
    await waitFor(() => {
      expect(screen.getByText(/About the Movie Directory/i)).toBeInTheDocument()
    })
  })

  it('displays directors list at "/directors"', async () => {
    render(<App />, { initialEntries: ['/directors'] })
    expect(await screen.findByText(/Christopher Nolan/i)).toBeInTheDocument()
  })

  it('navigates to DirectorForm on "/directors/new"', async () => {
    render(<App />, { initialEntries: ['/directors/new'] })
    expect(await screen.findByText(/Add New Director/i)).toBeInTheDocument()
  })

  it('navigates to a specific DirectorCard page', async () => {
    render(<App />, { initialEntries: ['/directors/1'] })
    expect(await screen.findByText(/Director of mind-bending films/i)).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Inception/i })).toBeInTheDocument()
  })

  it('navigates to MovieForm at "/directors/1/movies/new"', async () => {
    render(<App />, { initialEntries: ['/directors/1/movies/new'] })
    expect(await screen.findAllByText(/Add New Movie/i) == 2)
  })

  it('renders MovieCard details correctly', async () => {
    render(<App />, { initialEntries: ['/directors/1/movies/m1'] })
    const movieTitle = await screen.findAllByText(/Inception/i)
    expect(movieTitle[1]).toBeInTheDocument() // Ensure checking the right element (second instance is h2)
    expect(await screen.findByText(/Duration: 148 minutes/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sci-Fi, Thriller/i)).toBeInTheDocument()
  })

  it('handles invalid director ID gracefully', async () => {
    render(<App />, { initialEntries: ['/directors/999'] })
    expect(await screen.findByText(/Director not found/i)).toBeInTheDocument()
  })

  it('handles invalid movie ID gracefully', async () => {
    render(<App />, { initialEntries: ['/directors/1/movies/invalid'] })
    expect(await screen.findByText(/Movie not found/i)).toBeInTheDocument()
  })
})
