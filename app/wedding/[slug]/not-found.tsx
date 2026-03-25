import Link from "next/link";

export default function WeddingNotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6F0] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-script text-[64px] text-[#B76E79]">Oops!</h1>
        <p className="font-serif text-[24px] text-[#2C1810] mt-4">
          This invitation was not found
        </p>
        <p className="font-sans text-[16px] text-gray-500 mt-3">
          The invitation link may have expired or the URL might be incorrect.
          Please check with the couple for the correct link.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 bg-gradient-to-r from-[#B76E79] to-[#D4A574] text-white font-sans font-semibold px-8 py-3 rounded-full hover:brightness-105 transition-all"
        >
          Go to ShaadiPage →
        </Link>
      </div>
    </div>
  );
}
