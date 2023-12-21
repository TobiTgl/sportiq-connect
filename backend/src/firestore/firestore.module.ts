import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

@Global()
@Module({
  providers: [
    {
      provide: 'FirestoreAdmin',
      useFactory: () => {
        const serviceAccount = require('../../firestore-admin-key.json');

        const config = {
          credential: cert(serviceAccount),
        };

        const firebaseApp = admin.initializeApp(config);
        const db = getFirestore(firebaseApp, 'cloud-project');

        return db;
      },
    },
  ],
  exports: ['FirestoreAdmin'],
})
export class FirestoreModule {}
