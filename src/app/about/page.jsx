// pages/about.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-center'>
      <h1 className="text-4xl font-bold mb-8 pt-24">Star Wars Database</h1>
        <Navbar />
      <main className="container mx-auto px-4 py-20 flex-1">
        <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Star Wars Database</h1>
        <p>
          O Star Wars Database é um site para aqueles interessados no mundo de Star Wars. Aqui você pode explorar diversos aspectos do universo de Star Wars, incluindo informações sobre personagens, filmes, veículos, espécies, planetas e muito mais.
        </p>
        <p>
          Nosso site é construído com base na API SWAPI (Star Wars API), uma API gratuita que fornece dados sobre o universo de Star Wars. Você pode encontrar mais informações sobre a API visitando o seguinte link: {' '}
          <a href="https://swapi.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            https://swapi.dev/
          </a>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;


