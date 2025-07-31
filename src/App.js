
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import RootLayout from './pages/RootLayout';
import MainMap,{loader as MainMapLoader} from './pages/MainMap';
import StateMap from './pages/StateMap';
import {loader as stateloader} from './pages/StateMap';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout/>,
   
    id: 'main',
    children:[{ 
      index: true,
      element: <MainMap/>,
      loader: MainMapLoader
    },{
      path : ':id',
      element: <StateMap/>,
      loader: stateloader,
      

    }

    ] 
  }
]
);


function App() {

  return (
    <RouterProvider router = { router }/>
  );
}

export default App;
