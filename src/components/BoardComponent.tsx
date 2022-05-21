import React, {FC, useState, useEffect} from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';


interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  

  function click(cell: Cell) {
    if(cell.figure) {
      setSelectedCell(cell);
    }
  }


  useEffect(() => {
    highlightCells()
  }, [selectedCell])


  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className="board">
      {board.cells.map((row, index) => 
      <React.Fragment key={index}>
        {row.map(cell => 
          <CellComponent 
          click={click}
          cell={cell}
          key={cell.id}
          selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
          />
          )}
      </React.Fragment>
      )}
        </div>
  )
}

export default BoardComponent