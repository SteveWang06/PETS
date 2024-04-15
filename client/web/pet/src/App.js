import Contain from "./components/ContainerDashboard"
import Navi from "./components/NavigationTopBar"
import Post from "./pages/Post"
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <Contain/>
      <Navi/>
      <Post/>
      <Footer/>
    </div>
  );
}
export default App;
