"use client";

import { useState, useEffect } from "react";
import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js",
      { scope: "/" },
    );
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        setIsSupported(true);
        registerServiceWorker();
      }
    }, 0);
  }, []);

  if (!isSupported) {
    return (
      <p className="text-pink-800 bg-pink-50 p-4 rounded-xl text-center">
        مرورگر شما از نوتیفیکیشن پشتیبانی نمی‌کند.
      </p>
    );
  }

  return (
    <div className="w-full bg-pink-50/50 border border-pink-100 p-6 rounded-2xl flex flex-col gap-4 items-center">
      <h3 className="text-pink-600 font-bold text-xl">مدیریت نوتیفیکیشن‌ها</h3>
      {subscription ? (
        <>
          <p className="text-green-600 font-medium">
            شما نوتیفیکیشن‌ها را فعال کرده‌اید.
          </p>
          <button
            onClick={unsubscribeFromPush}
            className="bg-red-100 text-red-600 px-6 py-2 rounded-full font-bold"
          >
            لغو عضویت
          </button>
          <div className="flex w-full gap-2 mt-4">
            <input
              type="text"
              placeholder="متن پیام تست..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-pink-200 rounded-full px-4 py-2 outline-none focus:border-pink-500"
            />
            <button
              onClick={sendTestNotification}
              className="bg-pink-500 text-white px-6 py-2 rounded-full font-bold"
            >
              ارسال تست
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-pink-800">
            برای دریافت اخبار فروشگاه، نوتیفیکیشن را فعال کنید.
          </p>
          <button
            onClick={subscribeToPush}
            className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-md shadow-pink-200"
          >
            فعال‌سازی نوتیفیکیشن
          </button>
        </>
      )}
    </div>
  );
}
