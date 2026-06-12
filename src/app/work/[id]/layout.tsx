import { Metadata } from "next";

const projectTitles: Record<string, string> = {
  barberchehban: "Barber Chehban",
  standardpool: "Standard Pool",
  port: "Portfolio",
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const title = projectTitles[id] ? `${projectTitles[id]} - Premium Web Design Project | Ashraf Web` : "Premium Web Design Project | Ashraf Web";
  
  return {
    title,
    description: `View the ${projectTitles[id] || "latest"} premium web design and development project created by Ashraf Web using Next.js and Tailwind CSS.`,
    alternates: {
      canonical: `https://ashrafweb.me/work/${id}`,
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
