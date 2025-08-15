import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Header from "@/components/Header"

export default function Home() {
  return (
    <>  
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
