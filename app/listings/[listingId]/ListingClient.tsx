'use client';

import { useEffect, useState } from "react";
import { Reservation } from "@prisma/client";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { toast } from "react-hot-toast";
import { useMemo } from "react";
import { categories } from "@/app/componentts/navbar/Categories";
import Container from "@/app/componentts/Container";
import ListingHead from "@/app/componentts/listings/ListingHead";
import ListingInfo from "@/app/componentts/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import  axios  from "axios";
import { useCallback } from "react";
import ListingReservation from "@/app/componentts/listings/ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser 
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });
            dates = [...dates, ...range];
        })
        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id,
        })
        .then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);

            //redirect to /trips
            router.refresh();
        })
        .catch(() => {
            toast.error('something went wrong');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [
        currentUser,
        loginModal,
        totalPrice,
        dateRange,
        listing?.id,
        router,
    ]);

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if(dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === listing.category);
    }, [listing.category]);
    return ( 
        <div className="max-w-screen-lg mx-auto">
            <div>
                <ListingHead 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            dateRange={dateRange}
                            onChangeDate={(value) => setDateRange(value)}
                            disabledDates={disabledDates}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ListingClient;