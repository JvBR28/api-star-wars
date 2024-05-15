import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <div className='p-20'>
        <Navbar />
      </div>
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Mundo Star Wars</h1>
      <p className="text-xl mb-8">Escolha um sistema para navegar:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Link legacyBehavior href="/characters">
          <a className="flex flex-col items-center justify-center text-center p-8 border border-gray-300 rounded-md hover:border-blue-500 transition duration-300">
            <img src="/images/characters.jpg" alt="Characters" className="w-32 h-32 object-cover rounded-full mb-4 hover:opacity-80 transition duration-300" />
            <span className="text-lg font-bold text-blue-500 hover:text-blue-700">Personagens</span>
          </a>
        </Link>
        <Link legacyBehavior href="/planets">
          <a className="flex flex-col items-center justify-center text-center p-8 border border-gray-300 rounded-md hover:border-blue-500 transition duration-300">
            <img src="/images/planets.jpg" alt="Planets" className="w-32 h-32 object-cover rounded-full mb-4 hover:opacity-80 transition duration-300" />
            <span className="text-lg font-bold text-blue-500 hover:text-blue-700">Planetas</span>
          </a>
        </Link>
        <Link legacyBehavior href="/ships">
          <a className="flex flex-col items-center justify-center text-center p-8 border border-gray-300 rounded-md hover:border-blue-500 transition duration-300">
            <img src="/images/ships.jpg" alt="Ships" className="w-32 h-32 object-cover rounded-full mb-4 hover:opacity-80 transition duration-300" />
            <span className="text-lg font-bold text-blue-500 hover:text-blue-700">Naves</span>
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <Link legacyBehavior href="/vehicles">
          <a className="flex flex-col items-center justify-center text-center p-8 border border-gray-300 rounded-md hover:border-blue-500 transition duration-300">
            <img src="/images/vehicles.jpg" alt="Vehicles" className="w-32 h-32 object-cover rounded-full mb-4 hover:opacity-80 transition duration-300" />
            <span className="text-lg font-bold text-blue-500 hover:text-blue-700">Veículos</span>
          </a>
        </Link>
        <Link legacyBehavior href="/species">
          <a className="flex flex-col items-center justify-center text-center p-8 border border-gray-300 rounded-md hover:border-blue-500 transition duration-300">
            <img src="/images/species.jpg" alt="Species" className="w-32 h-32 object-cover rounded-full mb-4 hover:opacity-80 transition duration-300" />
            <span className="text-lg font-bold text-blue-500 hover:text-blue-700">Espécies</span>
          </a>
        </Link>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
