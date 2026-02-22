import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <NavBar />

      <section className="max-w-[1440px] mx-auto">
        <div className="border border-green p-6 md:p-8 flex flex-col items-center justify-center gap-6 min-h-[60vh]">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-green">
            404
          </h1>
          <p className="font-display text-xl md:text-2xl text-[#D2DFD4] tracking-wider text-center">
            EXPERIMENT NOT FOUND
          </p>
          <p className="font-mono text-[#C2C2C2] text-base md:text-lg text-center max-w-md">
            This page doesn&apos;t exist in our lab. It may have been moved or
            dissolved in an experiment gone wrong.
          </p>
          <Button href="/" variant="primary" size="lg">
            BACK TO LAB
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
