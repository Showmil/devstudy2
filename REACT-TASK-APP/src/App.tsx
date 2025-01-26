import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { appContainer, board, buttons, deleteBoardButton } from './App.css'
import BoardList from './components/BoardList/BoardList'
import ListsContainer from './components/ListsContainer/ListsContainer';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard, sort } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setisLoggerOpen] = useState(false)
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelector(state => state.boards.modalActive);
  const boards = useTypedSelector(state => state.boards.boardArray)

  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];

  const lists = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(
        deleteBoard({boardId: getActiveBoard.boardId})
      )

      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 지우기 ${getActiveBoard.boardName}`,
          logAuthor: "User",
          logTimestamp: String(Date.now())
        })
      )

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          board => board.boardId === activeBoardId
        )

        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted
      }

      setActiveBoardId(boards[newIndexToSet()].boardId)
    } else {
      alert('최소 게시판 개수는 한 개입니다.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    const sourcelist = lists.filter(
      list => list.listId === source.droppableId
    )[0];

    dispatch(
      sort({
        boardIndex: boards.findIndex(board => board.boardId === activeBoardId),
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId,
      })
    )

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `
          리스트 "${sourcelist.listName}"에서 
          리스트 "${lists.filter((list) => list.listId === destination.droppableId)[0].listName
          }"으로 
          ${sourcelist.tasks.filter((task) => task.taskId === draggableId)[0].taskName
          }을 옮김.
        `,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  }


  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setisLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}

      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />

      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        </DragDropContext>
      </div>

      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button onClick={() => setisLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>

  )
}

export default App
