import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';

const HomeGridItem = ({ href, imageSrc, alt, title }) => {
  return (
    <Link legacyBehavior href={href} passHref>
      <a className="flex flex-col items-center justify-center text-center p-8 border border-gray-300 rounded-md hover:border-blue-500 transition duration-300">
        <img
          src={imageSrc}
          alt={alt}
          className="w-32 h-32 object-cover rounded-full mb-4 hover:opacity-80 transition duration-300"
        />
        <span className="text-lg font-bold text-blue-500 hover:text-blue-700">{title}</span>
      </a>
    </Link>
  );
};

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Bem-vindo ao Mundo Star Wars</h1>
        <p className="text-xl mb-8 text-center">Escolha um sistema para navegar:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <HomeGridItem
            href="/characters"
            imageSrc="/images/characters.jpg"
            alt="Characters"
            title="Personagens"
          />
          <HomeGridItem
            href="/planets"
            imageSrc="/images/planets.jpg"
            alt="Planets"
            title="Planetas"
          />
          <HomeGridItem
            href="/ships"
            imageSrc="/images/ships.jpg"
            alt="Ships"
            title="Naves"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <HomeGridItem
            href="/vehicles"
            imageSrc="/images/vehicles.jpg"
            alt="Vehicles"
            title="Veículos"
          />
          <HomeGridItem
            href="/species"
            imageSrc="/images/species.jpg"
            alt="Species"
            title="Espécies"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
