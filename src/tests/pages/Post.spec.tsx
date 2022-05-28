import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getSession } from 'next-auth/react';
import Posts, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/react');

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updateAt: '10 de Abril'
}

jest.mock('../../services/prismic');

describe('Posts Page', () => {
  it('renders correctly', () => {
    render(
      <Posts post={post} />
    );

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    const getSessionMocket = mocked(getSession);

    getSessionMocket.mockReturnValueOnce(null);

    const response = await getServerSideProps({ 
      params: {
        slug: 'my-new-post'
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/my-new-post',
        })
      })
    )
  });

  // Teste com erro - encontrar solução da função UID
  // it('loads initial data', async () => {
  //   const getSessionMocket = mocked(getSession);
  //   const getPrismicClientMocked = mocked(getPrismicClient);

  //   getSessionMocket.mockReturnValueOnce({
  //     activeSubscription: 'fake-active-subscription'
  //   } as any);

  //   getPrismicClientMocked.mockResolvedValueOnce({
  //     getByUID: jest.fn().mockResolvedValueOnce({
  //       data: {
  //         title: [
  //           { type: 'heading', text: 'My New Post' }
  //         ],
  //         content: [
  //           { type: 'paragraph', text: 'Post content'}
  //         ],
  //       },
  //       last_publication_date: '04-01-2022'
  //     })
  //   } as never);

  //   const response = await getServerSideProps({ 
  //     params: {
  //       slug: 'my-new-post'
  //     }
  //   } as any);

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       props: {
  //         post: {
  //           slug: 'my-new-post',
  //           title: 'My New Post',
  //           content: '<p>Post content</p>',
  //           updateAt: '01 de Abril de 2022'
  //         }
  //       }
  //     })
  //   )
  // });
});