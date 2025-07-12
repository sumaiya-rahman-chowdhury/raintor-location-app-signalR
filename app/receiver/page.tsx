"use client"
import dynamic from "next/dynamic";
const ReceiverClient = dynamic(() => import("@/components/ReceiverClient"), {
  ssr: false,
});

function page() {
  return <ReceiverClient />;
}

export default page;
