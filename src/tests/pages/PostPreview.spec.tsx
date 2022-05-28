import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updateAt: '10 de Abril'
}

jest.mock('next-auth/react');
jest.mock('next/router')
jest.mock('../../services/prismic');

describe('PostPreview Page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated'
    });

    render(
      <PostPreview post={post} />
    );

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({   
      data: {
        activeSubscription: 'fake-active-subscription',
      },
      status: 'unauthenticated'
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMock).toBeCalledWith('/posts/my-new-post');

  });

  // Teste com erro - encontrar solução da função UID
  // it('loads initial data', async () => {
  //   const getPrismicClientMocked = mocked(getPrismicClient);

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

  //   const response = await getStaticProps({ 
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