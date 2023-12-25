import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import credentials from '../service-credentials.json';
import { getFirestore } from 'firebase-admin/firestore';

@Global()
@Module({
  providers: [
    {
      provide: 'FirestoreAdmin',
      useFactory: () => {
        const firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(
            credentials as admin.ServiceAccount,
          ),
        });
        const db = getFirestore(firebaseApp, 'cloud-project');

        return db;
      },
    },
  ],
  exports: ['FirestoreAdmin'],
})
export class FirestoreModule {}
