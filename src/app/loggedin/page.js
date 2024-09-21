'use client';
import { useSearchParams } from "next/navigation"



export default function Home() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code')
  return (
    <div>
      <h1>{code}</h1>
    </div>
  )
}
