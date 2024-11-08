import { delay, http, HttpResponse } from 'msw';
import { posts } from './post.data';
import { Post } from '../../app/post/data-access/post.type';
import { addScenarios } from '../scenario.util';
import { postScenario } from './post.scenario';

export const postHandler = [
  ...addScenarios(postScenario),
  http.get('https://api.example.com/posts', async () => {
    await delay();
    return HttpResponse.json(posts);
  }),
  http.get('https://api.example.com/posts/:id', async ({ params }) => {
    await delay();
    const post = posts.find((post) => post.id === Number(params['id']));

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),
  http.post('https://api.example.com/posts', async ({ request }) => {
    await delay();
    const post = (await request.json()) as Post;
    post.id = posts.length + 1;
    posts.push(post);
    return HttpResponse.json(post);
  }),
];
