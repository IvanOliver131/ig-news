import { getByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

test('it renders correctly', async () => {
  render(<Async />);
 
  expect(screen.getByText('Hello World')).toBeInTheDocument();
  // O findByText espera algo aparecer em tela
  // expect(await screen.findByText('Button')).toBeInTheDocument();

  // O waitFor espera algo aparecer em tela
  // await waitFor(() => {
  //   return expect(screen.getByText('Button')).toBeInTheDocument();
  // });

  // await waitForElementToBeRemoved(screen.queryByText('Button'));

  await waitFor(() => {
    return expect(screen.queryByText('Button')).not.toBeInTheDocument();
  });
})