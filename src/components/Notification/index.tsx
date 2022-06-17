import React from 'react'

import styles from './Notifications.module.scss'
import { useAppDispatch } from '../../redux/hooks'
import { hideNotification } from '../../redux/notifications/slice'
import { NotificationItem } from '../../redux/notifications/types'

export const Notification: React.FC<NotificationItem> = ({ type, message }) => {
  console.log(styles)
  const dispatch = useAppDispatch()
  return (
    <div className={styles.modal}>
      <div className={styles[type]}>
        {message}
        <svg
          onClick={() => dispatch(hideNotification())}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </div>
    </div>
  )
}
