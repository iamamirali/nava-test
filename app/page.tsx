import { logout } from '@/actions/Users';

export default function Home() {
  return (
    <main className="grow flex flex-col items-center justify-center">
      <h1 className="bg-primary-50 text-primary text-center text-4xl font-bold p-4">سلام دنیا</h1>
      <p className="grow bg-primary-100 p-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quisquam illo dolorum
        earum praesentium sint iste dicta? Expedita quaerat modi praesentium, nihil dolore magni
        nostrum accusantium eos iure, velit fugiat est, facilis suscipit labore impedit quia amet
        odio quisquam iusto aliquid debitis nesciunt fuga nisi eum. Consequatur molestiae quidem
        quibusdam!
      </p>

      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </main>
  );
}
