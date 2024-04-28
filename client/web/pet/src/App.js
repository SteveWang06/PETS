import Contain from "./components/ContainerDashboard"
import Navi from "./components/NavigationTopBar"
// import Post from "./pages/Post"
import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
// import Login from "./login"


function App() {
  return (
    <div>
      <Contain/>
      <Navi/>
      {/* <Post/>  */}
      <Footer/>
      <Dashboard/>
      {/* <Login/> */}
    </div>
  );
}
export default App;
