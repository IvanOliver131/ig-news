import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

import { SubscribeButton } from '.';

jest.mock('next-auth/react');
jest.mock('next/router');

describe('SubscribeButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce(
      { 
        data: null, 
        status: 'unauthenticated'
      }
    );
    
    render(
      <SubscribeButton />
    );
  
    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce(
      { 
        data: null, 
        status: 'unauthenticated'
      }
    );

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText('Subscribe now');
      
    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce(
      { 
        data: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          },
          activeSubscription: 'fake-active-subscription',
          expires: 'fake-expires'
        },
        status: 'authenticated'
      }
    );

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any); // pra parar de dar erro no type

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
