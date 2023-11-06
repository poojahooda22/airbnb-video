import getListings from "./actions/getListings";
import ClientOnly from "./componentts/ClientOnly";
import Container from "./componentts/Container";
import EmptyState from "./componentts/EmptyState";
import ListingCard from "./componentts/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  // const isEmpty = true;

  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState  showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div 
          className="pt-24 grid grid-cols-1 sm:grid-cols-2 
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
          gap-8"
        >
          {listings.map((listing) => {
            return (
              <ListingCard 
                currentUser={currentUser}
                data={listing} 
                key={listing.id} 
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}
