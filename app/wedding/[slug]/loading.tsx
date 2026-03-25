export default function WeddingLoading() {
  return (
    <div className="min-h-screen bg-[#FDF6F0] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-[#D4A574]/30 border-t-[#B76E79] rounded-full animate-spin mb-4" />
        <p className="font-script text-[32px] text-[#B76E79]">ShaadiPage</p>
        <p className="font-sans text-[14px] text-gray-400 mt-2">
          Loading your invitation...
        </p>
      </div>
    </div>
  );
}
