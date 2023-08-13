import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const { roomCode } = useParams();

  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  useEffect(() => {
    getRoomDetails();
  }, []);

  const getRoomDetails = () => {
    fetch('/api/get-room?code=' + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails({
          votesToSkip: data.votes_to_skip, // Adjust property name
          guestCanPause: data.guest_can_pause, // Adjust property name
          isHost: data.is_host, // Adjust property name
        });
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  };

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>{roomDetails.votesToSkip}</p>
      <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p>
      <p>Host: {roomDetails.isHost.toString()}</p>
    </div>
  );
}