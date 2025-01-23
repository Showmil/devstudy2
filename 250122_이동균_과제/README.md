# 250122 실습

### EditModal.tsx
```
import React, { ChangeEvent, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux'
import { deleteTask, setModalActive, updateTask } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import { buttons, closeButton, deleteButton, header, input, modalWindow, title, updateButton, wrapper } from './EditModal.css';

const EditModal = () => {

  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector(state => state.modal);
  const [data, setData] = useState(editingState);

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskName: e.target.value
      }
    })
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskDescription: e.target.value
      }
    })
  }

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      task: {
        ...data.task,
        taskOwner: e.target.value
      }
    })
  }

  const handleUpdate = () => {
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    )

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 수정하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )

    dispatch(setModalActive(false));
  }

  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId
      })
    )

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `일 삭제하기: ${editingState.task.taskName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )

    dispatch(setModalActive(false));
  }

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>{editingState.task.taskName}</div>
          <FiX className={closeButton} onClick={handleCloseButton} />
        </div>
        <div className={title}>제목</div>
        <input
          type='text'
          value={data.task.taskName}
          onChange={handleNameChange}
        />
        <div className={title}>설명</div>
        <input
          className={input}
          type='text'
          value={data.task.taskDescription}
          onChange={handleDescriptionChange}
        />
        <div className={title}>
          생성한 사람
        </div>
        <input
          className={input}
          type='text'
          value={data.task.taskOwner}
          onChange={handleAuthorChange}
        />
        <div className={buttons}>
          <button onClick={handleUpdate} className={updateButton}>
            일 수정하기
          </button>
          <button onClick={handleDelete} className={deleteButton}>
            일 삭제하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal
```
### EditModal.css.ts
```
import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10000,
});

export const modalWindow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "800px",
  height: "max-content",
  maxHeight: "500px",
  overflowY: "auto",
  backgroundColor: vars.color.mainDarker,
  opacity: 0.95,
  borderRadius: 14,
  padding: 20,
  boxShadow: vars.shadow.basic,
  color: vars.color.brightText,
});

export const header = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "40px",
});

export const closeButton = style({
  fontSize: vars.fontSizing.T2,
  cursor: "pointer",
  marginTop: "-20px",
  ":hover": {
    opacity: 0.8,
  },
});

export const title = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: "auto",
  marginBottom: vars.spacing.medium,
});

export const buttons = style({
  display: "flex",
  justifyContent: "space-around",
  marginBottom: 50,
});

export const updateButton = style({
  border: "none",
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.updateButton,
  cursor: "pointer",
  ":hover": {
    opacity: 0.8,
  },
});

export const deleteButton = style({
  border: "none",
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.deleteButton,
  cursor: "pointer",
  ":hover": {
    opacity: 0.8,
  },
});

export const input = style({
  width: "100%",
  minHeight: "30px",
  border: "none",
  borderRadius: 5,
  marginBottom: vars.spacing.big2,
  padding: vars.spacing.medium,
  fontSize: vars.fontSizing.T4,
  boxShadow: vars.shadow.basic,
});
```

### LoggerModal.tsx
```
import React, { FC } from 'react'
import { useTypedSelector } from '../../hooks/redux'
import { FiX } from 'react-icons/fi'
import LogItem from './LogItem/LogItem'
import { body, closeButton, header, modalWindow, title, wrapper } from './LoggerModal.css'

type TLoggerModalProps = {
  setIsLoggerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoggerModal: FC<TLoggerModalProps> = ({
  setIsLoggerOpen
}) => {

  const logs = useTypedSelector(state => state.logger.logArray);

  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>활동 기록</div>
          <FiX className={closeButton} onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div className={body}>
          {logs.map((log, index) => (
            <LogItem key={log.logId} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoggerModal
```

### LogItem.tsx
```
import React, { FC } from 'react'
import { ILogItem } from '../../../types'
import { BsFillPersonFill } from 'react-icons/bs';

type TLogItemProps = {
  logItem: ILogItem;

}

const LogItem: FC<TLogItemProps> = ({
  logItem
}) => {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimestamp)); // let으로 해야함 오류떠서 const로 해둠
  console.log('timeOffset', timeOffset);

  const showOffsetTime = `
    ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ""}
    ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}s ago` : ""}
    ${timeOffset.getSeconds() === 0 ? `just now` : ""}
    `
  
  return (
    <div>
      <div>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div>{logItem.logMessage}</div>
      <div></div>
    </div>
  )
}

export default LogItem
```

### LogItem.css.ts
```
import { style } from "@vanilla-extract/css";
import { vars } from "../../../App.css";

export const logItemWrap = style({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-start',
    padding: vars.spacing.medium,
    marginBottom: vars.spacing.big2,
    width: '100%',
    borderBottom: 'solid 1px rgb(191, 197, 217, 0.3)',
    ':hover': {
        backgroundColor: vars.color.mainFadedBright,
        borderRadius: 10
    },
})

export const message = style({
    alignItems: 'center',
    color: vars.color.brightText,
    fontWeight: 'bold',
    fontSize: vars.fontSizing.T4,
    marginBottom: vars.spacing.small
})

export const author = style({
    display: 'flex',
    alignItems: 'center',
    columnGap: 10,
    color: vars.color.brightText,
    fontSize: vars.fontSizing.T3,
    fontWeight: 'medium',
    marginBottom: vars.spacing.medium
})

export const date = style({
    fontSize: vars.fontSizing.T4,
    fontWeight: 'bold',
    marginBottom: vars.spacing.medium
})
```