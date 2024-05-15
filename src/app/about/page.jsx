// pages/about.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 justify-center text-center">
        <h1 className="text-4xl font-bold mb-8 pt-24">Sobre</h1>
        <p>
          O Mundo Star Wars é um site para aqueles interessados no mundo de Star Wars. Aqui você pode explorar diversos aspectos do universo de Star Wars, incluindo informações sobre personagens, filmes, veículos, espécies, planetas e muito mais.
        </p>
        <p>
          Nosso site é construído com base na API SWAPI (Star Wars API), uma API gratuita que fornece dados sobre o universo de Star Wars. Você pode encontrar mais informações sobre a API visitando o seguinte link: {' '}
          <a href="https://swapi.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            https://swapi.dev/
          </a>
          .
        </p>
        <p>
          Infelizmente, a API não disponibiliza imagens para nada além dos personagens, mas esperamos que mesmo sem as imagens você possa descobrir mais sobre seus planetas, naves, espécies ou veículos favoritos.
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default About;


