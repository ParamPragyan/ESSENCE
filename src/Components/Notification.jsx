import React from "react";


export function showNotification() {
    const notification = new Notification("New message from me", {
      body: "Please correct your body posture.",
    });
    return <div>notification</div>;
}
