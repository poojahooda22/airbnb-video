import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/componentts/ClientOnly";
import EmptyState from "@/app/componentts/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";


interface IParams {
    listingId?: string;
}
 


const ListingPage = async ({ params }: {params: IParams}) => {
    const listing= await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);

    if(!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
     );
}
 
export default ListingPage;