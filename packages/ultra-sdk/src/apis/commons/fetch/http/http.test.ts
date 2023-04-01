import http from './index';

describe('http function', () => {
  it('should fetch data from a URL', async () => {
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
    await expect(
      http({
        path: 'https://jsonplaceholder.typicode.com/invalid-url',
        config: {},
      }),
    ).rejects.toThrowError();
  });

  it('should throw an error for non-200 response', async () => {
    await expect(
      http({
        path: 'https://jsonplaceholder.typicode.com/todos/9999999',
        config: {},
      }),
    ).rejects.toThrowError();
  });
});
