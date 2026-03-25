"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface RSVPEntry {
  _id: string;
  guestName: string;
  guestCount: number;
  mealPreference: string | null;
  message: string;
  submittedAt: string;
}

export default function DashboardPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<"guestName" | "submittedAt" | "guestCount">("submittedAt");

  useEffect(() => {
    fetch(`/api/rsvp/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setRsvps(data.data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const sorted = [...rsvps].sort((a, b) => {
    if (sortField === "guestName") return a.guestName.localeCompare(b.guestName);
    if (sortField === "guestCount") return b.guestCount - a.guestCount;
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
  });

  const totalGuests = rsvps.reduce((sum, r) => sum + r.guestCount, 0);

  const exportCSV = () => {
    const headers = ["Name", "Guests", "Meal", "Message", "Date"];
    const rows = rsvps.map((r) => [
      r.guestName,
      r.guestCount.toString(),
      r.mealPreference || "N/A",
      r.message || "",
      new Date(r.submittedAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-${slug}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF6F0] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-3 border-[#B76E79] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/" className="font-script text-[28px] text-[#B76E79]">
            ShaadiPage
          </Link>
          <span className="font-sans text-[13px] text-gray-400 ml-3">RSVP Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="font-sans text-[14px] text-[#B76E79] border border-[#B76E79] px-4 py-2 rounded-full hover:bg-[#B76E79] hover:text-white transition-colors"
          >
            Export CSV
          </button>
          <Link
            href={`/wedding/${slug}`}
            target="_blank"
            className="font-sans text-[14px] text-gray-500 hover:text-[#B76E79]"
          >
            View Invitation ↗
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total RSVPs", value: rsvps.length },
            { label: "Total Guests", value: totalGuests },
            { label: "Avg Per RSVP", value: rsvps.length ? (totalGuests / rsvps.length).toFixed(1) : "0" },
            { label: "Latest", value: rsvps[0] ? new Date(rsvps[0].submittedAt).toLocaleDateString() : "—" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="font-serif text-[36px] text-[#B76E79]">{stat.value}</div>
              <div className="font-sans text-[13px] text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  {[
                    { field: "guestName" as const, label: "Name" },
                    { field: "guestCount" as const, label: "Guests" },
                    { field: "submittedAt" as const, label: "Message" },
                    { field: "submittedAt" as const, label: "Date" },
                  ].map((col) => (
                    <th
                      key={col.label}
                      onClick={() => setSortField(col.field)}
                      className="px-4 py-3 text-left font-sans text-[13px] text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[#B76E79]"
                    >
                      {col.label} {sortField === col.field && "↓"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center font-sans text-gray-400">
                      No RSVPs yet. Share your invitation to start receiving responses!
                    </td>
                  </tr>
                ) : (
                  sorted.map((rsvp) => (
                    <tr key={rsvp._id} className="border-b last:border-0 hover:bg-[#FDF6F0]/50">
                      <td className="px-4 py-3 font-sans text-[14px] text-gray-800 font-medium">
                        {rsvp.guestName}
                      </td>
                      <td className="px-4 py-3 font-sans text-[14px] text-gray-600">
                        {rsvp.guestCount}
                      </td>
                      <td className="px-4 py-3 font-sans text-[13px] text-gray-500 max-w-[200px] truncate">
                        {rsvp.message || "—"}
                      </td>
                      <td className="px-4 py-3 font-sans text-[13px] text-gray-400">
                        {new Date(rsvp.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
