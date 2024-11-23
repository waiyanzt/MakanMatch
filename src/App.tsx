import { PreferenceForm } from "./components/PreferenceForm";
import logoImage from "./assets/logoImage.png";

function App() {
  return (
    <div className="app-container">
      <img src={logoImage} alt="MakanMatch Logo" className="logo" />
      <PreferenceForm />
    </div>
  );
}

export default App;
