"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import VideoRoom from "./VideoRoom";
import { Globe } from "lucide-react";

const s = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
  transports: ["websocket"],
});

export default function HomeHelper() {
  const [status, setStatus] = useState<"idle" | "waiting" | "matched">("idle");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    s.on("matched", ({ roomId }) => {
      setRoomId(roomId);
      setStatus("matched");
    });
    s.on("waiting", () => {
      setStatus("waiting");
    });
    s.on("partner_leaft", () => {
      window.location.reload();
    });

    return () => {
      s.off();
    };
  }, []);

  const startChat = () => {
    s.emit("start");
    setStatus("waiting");
  };
  const nextHandler = () => {
    s.emit("next");
    window.location.reload();
  };

  return (
    <>
      {/* ================= NORMAL UI ================= */}
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl rounded-3xl bg-white/5 backdrop-blur-xl
          border border-white/10 shadow-2xl p-8 sm:p-12 text-center"
        >
          {status === "idle" && (
            <>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                Connect with{" "}
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                  Strangers
                </span>
              </h1>

              <p className="text-gray-300 text-lg mb-10">
                Anonymous real-time conversations.
              </p>

              <motion.button
                onClick={startChat}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="px-14 py-4 rounded-full text-lg font-semibold text-white
                bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg"
              >
                Start Chat
              </motion.button>
            </>
          )}

          {status === "waiting" && (
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="h-14 w-14 rounded-full border-4
                border-violet-500 border-t-transparent"
              />

              <p className="text-white text-xl font-semibold">
                Finding someone…
              </p>

              <p className="text-gray-400 text-sm">Please wait ✨</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ================= VIDEO OVERLAY ================= */}
      <AnimatePresence>
        {status === "matched" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col z-[9999] bg-black"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-black/60 backdrop-blur border-b border-white/10">
              <div className=" flex items-center gap-2 text-zinc-400 text-sm">
                <Globe size={16} />
                OmegaX | Connected
              </div>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={nextHandler}
                className="px-5 py-2 rounded-full text-lg font-semibold text-white
                bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg"
              >
                Next
              </motion.button>
            </div>
            <div className="flex-1 relative">
              <VideoRoom roomId={roomId} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
