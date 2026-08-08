import PushManager from "./PushManager";
import InstallPrompt from "./InstallPrompt";

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white flex flex-col items-center p-8 rounded-3xl shadow-xl shadow-pink-100 border border-pink-100 gap-8">
        <h1 className="bg-pink-100 text-pink-500 text-center text-4xl font-extrabold px-10 py-4 rounded-full w-full tracking-wide">
          سلام دنیا
        </h1>
        <p className="bg-pink-50/50 text-pink-800 p-6 rounded-2xl leading-loose text-justify w-full font-medium border border-pink-50">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          quisquam illo dolorum earum praesentium sint iste dicta? Expedita
          quaerat modi praesentium, nihil dolore magni nostrum accusantium eos
          iure, velit fugiat est, facilis suscipit labore impedit quia amet odio
          quisquam iusto aliquid debitis nesciunt fuga nisi eum. Consequatur
          molestiae quidem quibusdam!
        </p>

        <div className="flex flex-col md:flex-row w-full gap-4">
          <PushManager />
          <InstallPrompt />
        </div>
      </div>
    </main>
  );
}
