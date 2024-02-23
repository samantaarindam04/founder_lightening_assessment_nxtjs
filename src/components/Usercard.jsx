"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import styles from '@/styles/Usercard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import ErrorBoundaries from '@/ErrorBoundaries';

export default function Usercard({ userLists }) {
    const [loading, setloading] = useState(true)
    const router = useRouter()
    const handleView = (e) => {
        e.preventDefault();
        const routeObj = {
            username: e.currentTarget.dataset.username.toLowerCase(),
            userid: e.currentTarget.dataset.user,
        }
        router.push('/album/' + routeObj.username + '?userId=' + routeObj.userid)
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
                {loading ? <h3 style={{ gridColumnStart: 3 }} > Loading...</h3 > :
                    userLists && userLists.map((key, index) =>
                        <div className={styles.user_card} key={index}>
                            <div className={styles.user_img}>
                                <Image src={`/user.png`} width={100} height={100} alt="profile_img" priority={true} />
                            </div>
                            <div className={styles.user_detail}>
                                <div className={styles.details}>
                                    <FontAwesomeIcon icon={faUser} size='sm' /> <span>{key.name}</span>
                                </div>
                                <div className={styles.details}>
                                    <FontAwesomeIcon icon={faEnvelope} size='sm' /> <span>{key.email}</span>
                                </div>
                                <div className={styles.details}>
                                    <FontAwesomeIcon icon={faPhone} size='sm' /> <span>{key.phone}</span>
                                </div>
                                <div className={styles.album_btn}>
                                    <button onClick={handleView} data-username={key.username} data-user={key.id}>View Album</button>
                                </div>
                            </div>
                        </div>
                    )
                }
        </ErrorBoundaries>
    )
}
