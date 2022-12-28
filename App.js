import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { StatusBar, Pressable, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Block } from './src/Block';

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

const TicTacContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const TextResult = styled.Text`
  font-size: 24px;
  color: #000;
  margin-bottom: 20px;
`;

const ResetButton = styled.View`
  background-color: #0984e3;
  padding: 16px 24px;
  border-radius: 6px;
`;
const TextResetButton = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

// 'O' = 0, 'X' = 1
export default function App() {
  const INITIAL_TURN = 1;
  const INITIAL_WINNER = { player: 'none', blocks: [] };
  const WIN_POSITIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  const INITIAL_TICTACTOE_VALUES = Array(9).fill().map((_) => undefined);

  const [turn, setTurn] = useState(INITIAL_TURN);
  const [winner, setWinner] = useState(INITIAL_WINNER);
  const [blocks, setBlocks] = useState(INITIAL_TICTACTOE_VALUES);

  useEffect(() => {
    const checkWinner = calculateWinner();
    if (checkWinner) {
      let winBlocks = [];
      for (let i = 0; i < WIN_POSITIONS.length; i++) {
        if (isEqual(WIN_POSITIONS[i])) {
          winBlocks = [...WIN_POSITIONS[i]]; break;
        }
      }
      setWinner(prev => {
        const newState = {...prev};
        newState.player = checkWinner;
        newState.blocks = [...winBlocks];
        return newState;
      });
    } else if (blocks.every(b => b !== undefined)) {
      setWinner(prev => {
        const newState = {...prev};
        newState.player = 'draw';
        return newState;
      });
    }
  }, [blocks]);

  function isEqual(pos) {
    return blocks[pos[0]] === blocks[pos[1]] && blocks[pos[1]] === blocks[pos[2]] && blocks[pos[1]] !== undefined;
  }

  function calculateWinner() {
    let player_winner = null;

    WIN_POSITIONS.forEach(v => {
      if (!player_winner && isEqual(v)) {
        player_winner = blocks[v[0]];
      }
    });
    return player_winner; 
  }

  function handlePress(idx) {
    if (calculateWinner() !== null || blocks[idx] !== undefined) {
      return;
    }

    setBlocks(prev => {
      const newState = [...prev];
      newState[idx] = turn == 1 ? 'X' : 'O';
      return newState;
    });
    setTurn(!turn);
    
  }

  function handleReset() {
    setTurn(INITIAL_TURN);
    setWinner(INITIAL_WINNER);
    setBlocks(INITIAL_TICTACTOE_VALUES);
  }

  const displayBlocks = blocks.map((v, i) => {
    if (winner.blocks.includes(i)) {
      return (<Block highlight={true} content={v} key={i} onPress={() => handlePress(i)} />);
    } else {
      return (<Block highlight={false} content={v} key={i} onPress={() => handlePress(i)} />);
    }
  });

  return (
    <SafeAreaView>
      <Container>
        {winner.player === 'none' && (<TextResult>A jogar: {turn == 1 ? 'X' : 'O'}</TextResult>)}
        {winner.player === 'draw' && (<TextResult>Deu velha!</TextResult>)}
        {winner.player !== 'none' && winner.player !== 'draw' && (<TextResult>{winner.player} ganhou!</TextResult>)}
        <TicTacContainer>
          {displayBlocks}
        </TicTacContainer>
        <Pressable onPress={handleReset}>
          <ResetButton>
            <TextResetButton>Reiniciar</TextResetButton>
          </ResetButton>
        </Pressable>
      </Container>
      
      <StatusBar barStyle="light-content" />
    </SafeAreaView>
  );
}
