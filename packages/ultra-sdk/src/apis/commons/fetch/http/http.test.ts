import http from './index';

describe('http function', () => {
  it('should fetch data from a URL', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: true,
        json: async () =>
          Promise.resolve([
            {
              userId: 1,
              id: 1,
              title: 'delectus aut autem',
              completed: false,
            },
          ]),
      }),
    ) as jest.Mock;

    type Todo = {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    };

    const todos = await http<Todo[]>({
      path: 'https://jsonplaceholder.typicode.com/todos',
      config: {},
    });

    expect(todos.length).toBeGreaterThan(0);
    expect(todos[0].userId).toBeDefined();
    expect(todos[0].id).toBeDefined();
    expect(todos[0].title).toBeDefined();
    expect(todos[0].completed).toBeDefined();
  });

  it('should throw an error for invalid URL', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      }),
    ) as jest.Mock;

    await expect(
      http({
        path: 'https://jsonplaceholder.typicode.com/invalid-url',
        config: {},
      }),
    ).rejects.toThrowError();
  });

  it('should throw an error for non-200 response', async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      }),
    ) as jest.Mock;

    await expect(
      http({
        path: 'https://jsonplaceholder.typicode.com/todos/9999999',
        config: {},
      }),
    ).rejects.toThrowError();
  });
});
