// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
  },
  {
    id: 'cato',
    name: 'Little Cato'
  },
  {
    id: 'kvn',
    name: 'KVN'
  }
]

function App() {
  const [characters, setcharacters] = useState(finalSpaceCharacters)

  const handleEnd = (result) => {
    if (!result.destination) return;

  // 리액트 불변성을 지켜주기 위해 새로운 배열 todoData 생성
  const items = Array.from(characters);
  console.log(items);

  // 1. 변경시키는 아이템을 배열에서 제거
  // 드래그된 요소를 삭제하기 위해 result.source.index를 사용
  const [reorderedItem] = items.splice(result.source.index, 1);
  console.log(reorderedItem);

  // 2. 원하는 자리에 reorderedItem을 삽입
  items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    setcharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className='characters'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
              {
                characters.map(({ id, name }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          
                          <p>
                            {name}
                          </p>
                        </li>
                      )}
                      </Draggable>
                    )
                  })
                }
                {provided.placeholder}
            </ul>
            )}
            </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;