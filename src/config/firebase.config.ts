import admin from "firebase-admin";
import serviceAccount from "../../car-rental-d2405-firebase-adminsdk-gkpqw-dae1a79f8d.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
