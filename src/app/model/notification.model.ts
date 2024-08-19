export interface Notification  {
	title: string,
	body: string,
}

export interface Notifications {
	notifications: Notification,
	to: string
}