import { render, screen } from '@testing-library/react';
import { Header } from '.';

// sempre que importar o next router eu retorno
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Header />
    );
  
    // Espero que o home esteja presente dentro do documento retornado
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});
