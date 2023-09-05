import admin from "../config/firebase.config";

export const sendPushNotification = (
  token: string,
  title: string,
  body: string
) => {
  const message: admin.messaging.Message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  return admin.messaging().send(message);
};

export const blastNotification = (
  tokens: string[],
  title: string,
  body: string
) => {
  const message: admin.messaging.MulticastMessage = {
    notification: {
      title: title,
      body: body,
    },
    tokens: tokens,
  };

  return admin.messaging().sendEachForMulticast(message);
};
