import { logout } from '../../actions/Users';

export default function Test() {
  return (
    <main className="grow flex flex-col items-center justify-center">
      <h1 className="bg-primary-50 text-primary text-center text-4xl font-bold p-4">سلام دنیا</h1>

      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </main>
  );
}
