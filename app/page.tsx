import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./componentts/ClientOnly";
import Container from "./componentts/Container";
import EmptyState from "./componentts/EmptyState";
import ListingCard from "./componentts/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams
}


const Home = async ({
  searchParams
} : HomeProps) => {


  try {
    const listings = await getListings(searchParams);
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
  catch (err) {
    return;
  }
}

export default Home;
