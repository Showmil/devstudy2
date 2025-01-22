# 250121 강의 요약(실습)

```
// ActionButton.tsx
import React,  { FC, useState } from 'react'
import DropDowmForm from './DropDownForm/DropDownForm';
import { IoIosAdd } from 'react-icons/io';
import { listButton, taskButton } from './ActionButton.css';

type TActionButtonProps = {
  boardId: string;
  listId: string;
  list?: boolean;
}

const ActionButton: FC<TActionButtonProps> = ({
  boardId,
  listId,
  list
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const buttonText = list ? "새로운 리스트 등록" : "새로운 일 등록";
  return isFormOpen ? (
    <DropDowmForm
      setIsFormOpen={setIsFormOpen}
      list={list ? true : false}
      boardId={boardId}
      listId={listId}
    />
  )
    :
    (<
      div className={list ? listButton : taskButton}
      onClick={() => setIsFormOpen(true)}
    >
      <IoIosAdd />
      <p>{buttonText}</p>
    </div>)
}

export default ActionButton

// List.tsx
import React, { FC } from 'react'
import { GrSubtract } from 'react-icons/gr'
import Task from '../Task/Task'
import ActionButton from '../ActionButton/ActionButton'
import { IList } from '../../types'
import { useTypedDispatch } from '../../hooks/redux'
import { deleteList } from '../../store/slices/boardsSlice'
import { addLog } from '../../store/slices/loggerSlice'
import { v4 } from 'uuid'
import { ITask } from '../../types'
import { setModalData } from '../../store/slices/modalSlice'
import { setModalActive } from '../../store/slices/boardsSlice'
import { listWrapper, name, header, deleteButton } from './List.css'

type TListProps = {
  boardId: string;
  list: IList;
}

const List: FC<TListProps> = ({
  list,
  boardId
}) => {

  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )
  }

  const handleTaskChange = (
    boardId: string,
    listId: string,
    taskId: string,
    task: ITask
  ) => {
    dispatch(setModalData({ boardId, listId, task }))
    dispatch(setModalActive(true));
  }

  return (
    <div
      className={listWrapper}
    >
      <div className={header}>
        <div className={name}>{list.listName}</div>
        <GrSubtract
          className={deleteButton}
          onClick={()=>handleListDelete(list.listId)}
        />
      </div>
      {list.tasks.map((task, index) => (
        <div
          onClick={() => handleTaskChange(boardId, list.listId, task.taskId, task)}
          key={task.taskId}
        > 
          <Task
            taskName={task.taskName}
            taskDescription={task.taskDescription}
            boardId={boardId}
            id={task.taskId}
            index={index}
          />
          </div>
          ))
        }
      <ActionButton
        boardId={boardId}
        listId={list.listId}
      />
    </div>
  )
}

export default List

// ListContainer.tsx
import React, { FC } from 'react'
import { IList } from '../../types'
import List from '../List/List'
import ActionButton from '../ActionButton/ActionButton'
import { listsContainer } from './ListsContainer.css'

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
}

const ListsContainer: FC<TListsContainerProps> = ({
  lists,
  boardId
}) => {
  return (
    <div className={listsContainer}>
      {
        lists.map(list => (
          <List
            key={list.listId}
            list={list}
            boardId={boardId}
           />
        ))
      }
      <ActionButton
        boardId={boardId}
        listId={""}
        list
      />
    </div>
  )
}

export default ListsContainer
```