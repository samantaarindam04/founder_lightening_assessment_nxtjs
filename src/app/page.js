
import styles from "./page.module.css";
import Usercard from "@/components/Usercard";
import Loading from "@/components/Loading";
import { getAllUsers } from "@/actions/_actions";
import { Suspense } from "react";

export const metadata = {
  title: "Photo Album | All Users",
  description: "Arindam's assignment for Founder and Lighntening",
};

export default async function Home() {
  const users = await getAllUsers()
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loading />}>
        <div className={styles.user_lists} data-testid="usercard">
            {users && users.length > 0 ? <Usercard userLists={users} /> : process.env.NO_DATA_FOUND}
        </div>
      </Suspense>
    </main>
  );
}
