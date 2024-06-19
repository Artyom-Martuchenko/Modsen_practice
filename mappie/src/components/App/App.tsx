import { SideBar } from "../SideBar/SideBar";
import { Map } from "../Map/Map";
// import './App.module.css';

export const App = () => {
  return (
    <div className="app">
      <SideBar />
      <Map />
    </div>
  );
};

export default App;