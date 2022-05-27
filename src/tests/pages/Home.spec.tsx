import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react'
import { stripe } from '../../services/stripe';
import { useRouter } from 'next/router';

import Home, { getStaticProps } from '../../pages';

jest.mock('next/router');
jest.mock('../../services/stripe');
jest.mock('next-auth/react');

describe('Home Page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    });

    render(
      <Home product={{ priceId: 'fake-priceId', amount: 'R$10,00'}}/>
    );

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    // Quando é uma função asyncrona
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    // coloca o objetContaining pq senao o toEqual compara se é totalmente igual
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    );
  })
});