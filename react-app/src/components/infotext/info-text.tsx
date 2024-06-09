import { NotificationAlertSize, NotificationAlertVariation } from '@digi/arbetsformedlingen'
import { DigiNotificationAlert } from '@digi/arbetsformedlingen-react'
import React from 'react'

export default function Notification() {

  return (
    <DigiNotificationAlert
	afSize={NotificationAlertSize.SMALL}
	afVariation={NotificationAlertVariation.SUCCESS}		
    onAfOnClose={close}
>
	Sparat
</DigiNotificationAlert>
  )
}
