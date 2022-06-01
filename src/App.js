import './App.css';
import MainContent from './maincontent';
import polls from './polls';
import Sidebar from './sidebar';

function App() {
  return (
      <div className='max-w-6xl mx-auto mt-32 mb-20 flex flex-col items-center md:flex-row md:justify-between px-10'>
        <Sidebar/>
        <MainContent/>
      </div>
  );
}

export default App;
