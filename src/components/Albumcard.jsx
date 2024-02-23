"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import styles from '@/styles/Albumcard.module.css'
import { useRouter } from 'next/navigation';
import ErrorBoundaries from '@/ErrorBoundaries';

export default function Albumcard({ albums, username }) {
  const [loading, setloading] = useState(true)
  const router = useRouter()
  const handlePhoto = (e) => {
    e.preventDefault();
    const routeObj = {
      username: username.toLowerCase(),
      name: e.currentTarget.dataset.name.replaceAll(' ', '_'),
      id: e.currentTarget.dataset.id,
      userid: e.currentTarget.dataset.user,
    }
    router.push('/album/' + routeObj.username + '/' + routeObj.name + '?albumId=' + routeObj.id + '&userId=' + routeObj.userid)
  }

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
      {loading ? <h3 style={{ gridColumnStart: 3 }}>Loading...</h3> :
        albums && albums.map((key, index) =>
          <div className={styles.single_album} onClick={handlePhoto} key={index} data-id={key.id} data-user={key.userId} data-name={key.title} data-username={key.username} data-testid={`single_album_test_${index}`}>
            <Image src={`/folder.png`} priority={true} width={200} height={200} alt={`folder_img`} blurDataURL={`data:image/gif;base64,R0lGODlhAQABAPAAAO21BgEA/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`} />
            <span>{key.title}</span>
          </div>
        )}

    </ErrorBoundaries>

  )
}
