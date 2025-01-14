import { LinkButton, TrackList, Typography } from "@/components"
import styles from "./Traking.module.css"

interface TrackingProps {
  params: {
    code: string
  }
}

export default async function Tracking({ params: { code } }: TrackingProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/progressTracking/${code}`,
    {
      cache: "no-cache",
    }
  )

  const trackDetails = await response.json()

  return (
    <main className={styles.tracking__main}>
      <div className={styles.tracking__wrapper}>
        <Typography variant="h1">Status da entrega</Typography>
        <p className={styles.tracking__code}>Código de rastreamento: {code}</p>

        {trackDetails.message ? (
          <Typography variant="h3">{trackDetails.message}</Typography>
        ) : (
          <TrackList list={trackDetails.trackProgress} />
        )}

        <LinkButton href="/">Pesquisar novamente</LinkButton>
      </div>
    </main>
  )
}
