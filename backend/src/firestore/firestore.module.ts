import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Global()
@Module({
  providers: [
    {
      provide: 'FirestoreAdmin',
      useFactory: () => {
        const serviceAccount = require('../../firestore-admin-key.json');
        const firebaseAdmin = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });

        return firebaseAdmin.firestore();
      },
    },
  ],
  exports: ['FirestoreAdmin'],
})
export class FirestoreModule {}
