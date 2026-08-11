import PushManager from "../PushManager";

export default function PwaPage() {
  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white flex flex-col items-center p-8 rounded-3xl shadow-xl shadow-pink-100 border border-pink-100 gap-8">
        <h1 className="bg-pink-100 text-pink-500 text-center text-3xl font-extrabold px-10 py-4 rounded-full w-full tracking-wide">
          تنظیمات اپلیکیشن ناوا
        </h1>
        <div className="flex flex-col w-full gap-4">
          <PushManager />
        </div>
      </div>
    </main>
  );
}
