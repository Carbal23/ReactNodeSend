import LinkClient from "@/components/LinkClient";
import { paths } from "@/utils/paths";
interface LinkPageProps {
  params: Promise<{ link: string }>;
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${paths.link.getAll}`
    );
    if (!response.ok) throw new Error("Error al obtener links");

    const data = await response.json();

    return data.links.map((link: { url: string }) => ({
      link: link.url,
    }));
  } catch (error) {
    console.error("Error en generateStaticParams:", error);
    return []; 
  }
}

export default async function Page({ params }: LinkPageProps) {
  const { link } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${paths.link.get}${link}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Error al obtener datos: ${res.status}`);
    }

    const data: { link?: string; file?: string; password?: string } =
      await res.json();

    return (
      <LinkClient link={data.link} file={data.file} password={data.password} />
    );
  } catch (error) {
    console.error("API Request Error:", error);
    return (
      <p className="text-4xl text-center text-gray-700 mt-20">
        Archivo o link ya no existen.
      </p>
    );
  }
}
