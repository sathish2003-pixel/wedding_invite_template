import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeddingPage } from "@/components/invitation/WeddingPage";
import { demoWedding } from "@/lib/demoData";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.slug === "demo") {
    return {
      title: `${demoWedding.groomName} & ${demoWedding.brideName}'s Wedding — ShaadiPage`,
      description: `You're invited to ${demoWedding.groomName} & ${demoWedding.brideName}'s wedding celebration!`,
    };
  }

  // For real weddings, fetch from API
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shaadipage.vercel.app";
    const res = await fetch(`${baseUrl}/api/weddings/${params.slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { title: "Wedding Not Found — ShaadiPage" };
    }

    const { data } = await res.json();
    return {
      title: `${data.couple.groomName} & ${data.couple.brideName}'s Wedding — ShaadiPage`,
      description: `You're invited to ${data.couple.groomName} & ${data.couple.brideName}'s wedding celebration!`,
      openGraph: {
        title: `${data.couple.groomName} & ${data.couple.brideName}'s Wedding`,
        description: `Join us for the wedding celebrations!`,
        type: "website",
      },
    };
  } catch {
    return { title: "Wedding — ShaadiPage" };
  }
}

export default async function WeddingSlugPage({ params }: Props) {
  // Demo route
  if (params.slug === "demo") {
    return <WeddingPage data={demoWedding} />;
  }

  // Fetch real wedding
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shaadipage.vercel.app";
    const res = await fetch(`${baseUrl}/api/weddings/${params.slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      notFound();
    }

    const { data: wedding } = await res.json();

    // Transform MongoDB data to WeddingFormData
    const weddingData = {
      brideName: wedding.couple.brideName,
      groomName: wedding.couple.groomName,
      brideFamily: wedding.couple.brideFamily || "",
      groomFamily: wedding.couple.groomFamily || "",
      loveStory: wedding.couple.loveStory || "",
      couplePhoto: wedding.couple.couplePhoto || "",
      hashtag: wedding.couple.hashtag || "",
      customMessage: wedding.couple.customMessage || "",
      language: wedding.couple.language || "en",
      events: wedding.events.map((e: { name: string; date: string; time: string; venueName: string; venueAddress: string; mapsLink?: string; dressCode?: string }) => ({
        name: e.name,
        date: e.date,
        time: e.time,
        venueName: e.venueName,
        venueAddress: e.venueAddress,
        mapsLink: e.mapsLink || "",
        dressCode: e.dressCode || "",
      })),
      gallery: wedding.gallery || [],
      template: wedding.design.template,
      colorTheme: wedding.design.colorTheme,
      musicEnabled: wedding.design.musicEnabled,
      musicTrack: wedding.design.musicTrack,
      rsvpEnabled: wedding.rsvp?.enabled || false,
      rsvpDeadline: wedding.rsvp?.deadline || "",
      plan: wedding.plan,
      slug: wedding.slug,
    };

    return <WeddingPage data={weddingData} />;
  } catch {
    notFound();
  }
}
