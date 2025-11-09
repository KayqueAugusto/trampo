import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import LandingTail from "./components/LandingTail";

function App() {
  return (
    <>
      <Navbar variant="public" surface="light" />
      <main>
        <Hero />
        <FeatureCards />
        <LandingTail />
      </main>
    </>
  );
}
export default App;
