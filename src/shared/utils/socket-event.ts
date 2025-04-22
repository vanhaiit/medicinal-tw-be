export const getEventNotificationRoom = () => 'event-notification';

export const getUserRoomById = (userId: number | string) =>
    `user-room-${userId}`;
export const getTeamRoomById = (teamId: number | string) =>
    `team-room-${teamId}`;
