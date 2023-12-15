// import router from "@/router";
// import { auth } from "@/plugins/firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// async function signUp(email: string, password: string) {
//   try {
//     const user = await createUserWithEmailAndPassword(auth, email, password);
//     if (user) {
//       router.replace({ name: "Home" });
//     }
//   } catch (error) {}
// }

// async function login(email: string, password: string) {
//   try {
//     const user = await signInWithEmailAndPassword(auth, email, password);
//     if (user) {
//       router.replace({ name: "Home" });
//     }
//   } catch (error) {}
// }

// async function logout() {
//   await signOut(auth);
//   router.replace({ name: "Home" });
// }
