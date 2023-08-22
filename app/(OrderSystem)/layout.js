import Navbar from "../components/main/Navbar"

export default function OrderLayout({ children }) {
    return <section className="max-w-6xl mx-auto">
        {children}
        <h1>Order Layout</h1>
        </section>
  }