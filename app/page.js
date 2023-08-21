import Image from 'next/image'

import Link from 'next/link'
import Hero from './components/home/Hero'

export default function Home() {
  return (
    <main className='pb-56'>
      {/* <h2>Dashboard</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero repellendus tempore, exercitationem odit, quasi doloremque possimus recusandae alias sequi totam soluta natus iure eius, obcaecati sint dolores blanditiis aspernatur quo officia iusto ut. Et, aliquid sed voluptates iste cum totam, facere explicabo, fugit suscipit ratione aspernatur consequuntur ex mollitia quaerat?</p> */}

      <Hero/>
      <div style={{ height: '150vh', background: 'lightgray', zIndex: 0 }}>
        Scroll down to see the image grow in width.
      </div>
    </main>
  )
}
