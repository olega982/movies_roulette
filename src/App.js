import MovieRandomizer from './components/MovieRandomizer'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header" testId="pageHeader">
        <h1>Movie Roulette</h1>
        <p className="App-description">
          🎬 Dont know what to watch? Select genre, year and we will recommend!{' '}
          <br />
          ⭐️ Only the best movies with the 7+ raiting.
          <br />
          💬 At lest 500 reviews for every film.
          <br />
        </p>
      </header>
      <main className="App-main">
        <MovieRandomizer />
      </main>
      <footer className="App-footer">
        <p>
          &copy; {new Date().getFullYear()} Movie Randomizer. Aleh Sinkou 2025
        </p>
        <nav>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/oleg-sinkov-b8998b212/"
            rel="noreferrer"
          >
            Linkedin
          </a>
          <email>sinkovoleg088@gmail.com</email>
        </nav>
      </footer>
    </div>
  )
}

export default App
