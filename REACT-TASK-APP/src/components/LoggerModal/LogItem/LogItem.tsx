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