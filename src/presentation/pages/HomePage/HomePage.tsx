import { TopBarClient } from "@/components/TopBarClient";
import TopRatedMoviesSectionClient from "./TopRatedMoviesSectionClient";
import { getTopRatedMoviesSSR } from "@/lib/queries";
import { serializePaginatedMovies } from "@/lib/serialization";

export default async function HomePage() {
  // fetch initial data on server using clean architecture
  const initialData = await getTopRatedMoviesSSR();

  // serialize the data
  const serializedInitialData = serializePaginatedMovies(initialData);

  return (
    <>
      <TopBarClient />
      <TopRatedMoviesSectionClient initialData={serializedInitialData} />
    </>
  );
}
