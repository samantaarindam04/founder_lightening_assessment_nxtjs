import Albumcard from '@/components/Albumcard'
import styles from "@/styles/Albumcard.module.css";
import React, { Suspense } from 'react'
import { getAllAlbums } from '@/actions/_actions';
import Loading from '@/components/Loading';

export const metadata = {
    title: "Photo Album | All Albums",
    description: "Arindam's assignment for Founder and Lighntening",
};

async function Album({ params, searchParams }) {
    let albumLists = await getAllAlbums(searchParams.userId)
    return (
        <Suspense fallback={<Loading />}>
            <div className={styles.album_lists} data-testid="albumcard">
                    {albumLists && albumLists.length > 0 ? <Albumcard albums={albumLists} username={params.id} /> : process.env.NO_DATA_FOUND}
            </div>
        </Suspense>
    )
}

export default Album