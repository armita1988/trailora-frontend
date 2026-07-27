export default function Hero() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const heroImageUrl = `${BACKEND_URL}/img/hero.png`;

  return (
    <section className="bg-[#F8FAF9]">
      <div
        className="xs:h-80 relative h-72 bg-cover bg-center sm:h-90 md:h-96"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(248, 250, 249, 0.5),
            rgba(248, 250, 249, 0.08)
          ), url('${heroImageUrl}')`,
        }}
      >
        <div className="xs:top-16 xs:left-8 absolute top-14 left-5 max-w-md sm:top-18 md:top-22 md:left-14 lg:left-20 xl:left-28 2xl:left-32">
          <h1 className="xs:text-4xl mb-2 text-3xl font-bold tracking-normal text-[#0F172A] md:mb-3 md:text-5xl">
            Explore Tours
          </h1>

          <p className="xs:text-base text-sm font-medium tracking-wide text-[#475569] md:text-lg">
            Find your next adventure
          </p>
        </div>
      </div>
    </section>
  );
}
