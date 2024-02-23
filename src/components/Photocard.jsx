"use client"
import React, { useEffect, useState } from 'react'
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import 'yet-another-react-lightbox/styles.css';
import CustomImage from './CustomImage';
import ErrorBoundaries from '@/ErrorBoundaries';

export default function Photocard({ photos }) {
    const [index, setIndex] = useState(-1);
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const onPageLoad = () => {
            setloading(false)
        };
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);
    return (
        <ErrorBoundaries>
            {loading && <h3>Loading...</h3>}
            <PhotoAlbum
                layout="masonry"
                photos={photos}
                targetRowHeight={150}
                renderPhoto={CustomImage}
                sizes={{ size: "calc(100vw - 240px)" }}
                onClick={({ index: current }) => setIndex(current)}
            />
            <Lightbox
                index={index}
                slides={photos}
                open={index >= 0}
                close={() => setIndex(-1)}
            />
        </ErrorBoundaries>
    )
}
