import React, { Suspense } from 'react'
import Photocard from '@/components/Photocard';
import { getAllPhoto } from '@/actions/_actions';
import Loading from '@/components/Loading';

export const metadata = {
    title: "Photo Album | All Photos",
    description: "Arindam's assignment for Founder and Lighntening",
};

async function Photo({ searchParams }) {
    let allPhotos = await getAllPhoto(searchParams.albumId)
    const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
    const photos = allPhotos?.map((photo) => ({
        src: photo.url,
        width: Math.floor(Math.random() * (400 - 100 + 1) + 100),
        height: Math.floor(Math.random() * (300 - 100 + 1) + 100),
        srcSet: breakpoints.map((breakpoint) => {
            const height = Math.round(breakpoint);
            return {
                src: photo.url,
                width: breakpoint,
                height,
            };
        }),
    }));

    return (
        <Suspense fallback={<Loading />}>
                {photos && photos.length > 0 ? <Photocard photos={photos} /> : process.env.NO_DATA_FOUND}
        </Suspense>
    )
}

export default Photo
