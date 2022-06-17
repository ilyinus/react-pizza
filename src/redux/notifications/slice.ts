import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationsState, NotificationType, NotificationItem } from './types'

const initialState: NotificationsState = {
  type: NotificationType.INFO,
  message: 'default',
  shown: false
}

const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    hideNotification(state) {
      state.shown = false
    },
    showNotification(state, action: PayloadAction<NotificationItem>) {
      state.type = action.payload.type
      state.message = action.payload.message
      state.shown = true
    }
  }
})

export const { hideNotification, showNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
