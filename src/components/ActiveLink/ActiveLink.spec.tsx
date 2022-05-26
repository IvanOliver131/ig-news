import { render } from '@testing-library/react';
import { ActiveLink } from '.';

// sempre que importar o next router eu retorno
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );
  
    // Espero que o home esteja presente dentro do documento retornado
    expect(getByText('Home')).toBeInTheDocument();
  });
  
  it('adds active class if the link as currently active', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );
  
    // Espero que o home esteja presente dentro do documento tenha uma classe 'active'
    expect(getByText('Home')).toHaveClass('active');
  });
});
