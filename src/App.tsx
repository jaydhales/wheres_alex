import PuzzleAccount from './models/account.js';
import { useState } from 'react';
import Home from './pages/Home.js';
import NewGame from './pages/NewGame.js';
import StartWager from './pages/StartWager.js';
// import mainImg from '../src/assets/alex_behind_wall.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HideAlex from './pages/HideAlex.js';
import ConfirmStartGame from './pages/ConfirmStartGame.js';
import PendingConfirmStartGame from './pages/PendingConfirmStartGame.js';

import GameStarted from './pages/GameStarted.js';
import { Header } from './components/header.js';
import { Welcome } from './components/Welcome.js';
import { useAccount, useConnect } from '@puzzlehq/sdk';
import initWasm, {init_panic_hook}  from "@puzzlehq/aleo-wasm-web";


function App() {
  // const [isConnected, setIsConnected] = useState<boolean>(false);
  // const { isConnected, loading } = useConnect();
  const { isConnected, loading } = useConnect();
  const { account } = useAccount();

  // const account: PuzzleAccount = {
  //   network: 'Aleo',
  //   chainId: '1',
  //   address: 'aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6',
  //   shortenedAddress: 'aleo1as..tuvr6'
  // };

  // Initialize wasm
  async function setup() {
    try {
      console.log('trying to initiate wasm...');
      console.log(initWasm);
      // todo: figure out a better solution here?
      await initWasm('../node_modules/@puzzlehq/aleo-wasm-web/aleo_wasm_bg.wasm');
      console.log('wasm initiated...');
      init_panic_hook();
    } catch (error) {
      console.error('Error initializing wasm:', error);
    }
  }

  setup()

  return (
    <div className="App min-h-screen bg-yellow-500 flex justify-center">
      <div className="max-w-screen-sm w-full bg-neutral-900 shadow-md overflow-y-auto flex flex-col">

        {isConnected && account?.address && <Header isConnected={isConnected} address={account?.address} />}

        <Router>
          <div className="max-w-screen-sm w-full h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/new-game" element={<NewGame account={account} />} />
              <Route path="/start-wager" element={<StartWager />} />
              <Route path="/hide-alex" element={<HideAlex />} />
              <Route path="/confirm-start-game" element={<ConfirmStartGame account={account}/>} />
              <Route path='/game-started' element={<GameStarted />} />
              <Route path="/pending-confirm-start-game" element={<PendingConfirmStartGame />} />
              <Route
                path="/"
                element={ !loading && isConnected ? <Home /> : <Welcome /> }
              />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;


