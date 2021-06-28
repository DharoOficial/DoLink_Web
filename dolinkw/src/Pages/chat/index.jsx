import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Chat } from "@material-ui/icons";

firebase.initializeApp({
    apiKey: "AIzaSyDVK7pECqLUFH6PywHU536dwp6fbpMsdQc",
    authDomain: "chatdolink-392ee.firebaseapp.com",
    projectId: "chatdolink-392ee",
    storageBucket: "chatdolink-392ee.appspot.com",
    messagingSenderId: "498776411041", 
    appId: "1:498776411041:web:1aafdc490224afaba299e0",
    measurementId: "G-9VPG3XF8DC"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);


function SignIn(params) {
    const SignInWithGoogle = () => {

    }

    return (
        <button onClick={SignInWithGoogle}></button>
    )
}

function SignOut() {

    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>SignOut</button>
    )

}

function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });



}

// return (
//     <div className="app">
//         <header>

//         </header>

//         <section>
//             {user ? <ChatRoom /> : <SignIn />}
//         </section>
//     </div>
// )
    return(
        <>
        <div>
            {messages && messages.map(msg => <ChatMessage key={msg.id} />)}
        </div>
        <div>

        </div>
        </>
    )

    function ChatMessage(props) {
        const {text, uid} = props.message
        return <p>{text}</p>
    }

    export default Chat;