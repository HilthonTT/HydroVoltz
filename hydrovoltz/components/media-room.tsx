"use client";

import "@livekit/components-styles";

import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface MediaRoomProps {
  callId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ callId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.username) {
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${callId}&username=${user?.username}`
        );

        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, [user?.username, callId]);

  if (token === "") {
    return (
      <div className="flex felx-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 animate-spin my-4" />
        <p className="text-xs">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
      token={token}
      connect={true}
      video={video}
      audio={audio}>
      <VideoConference />
    </LiveKitRoom>
  );
};
