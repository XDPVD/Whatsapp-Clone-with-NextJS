import styled from "styled-components"

import { Avatar,Button, IconButton } from "@material-ui/core";

import ChatIcon from "@material-ui/icons/Chat";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import SearchIcon from "@material-ui/icons/Search";


// Evaluate the email syntax
import * as EmailValidator from "email-validator";

import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Chat from "./Chat";

// This is a component
export default function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where('users','array-contains',user.email); // Select doc
    const [chatsSnapshot] = useCollection(userChatRef); // Select collection by userChat

    const createChat = () =>{
        const input = prompt(
            "Please enter an email address for the user you wish to chat with"
        );

        if(!input) return null;

        if(
            EmailValidator.validate(input) && // Evaluate the syntax
            !chatAlreadyExists(input) && // If chat already exists  ...(f)
            input !== user.email // If not user email
        ){
            // Add the chat into the DB 'chats' collection
            db.collection('chats').add({
                users: [user.email,input],
            });
        }

    };

    // (f)
    const chatAlreadyExists = (recipientEmail) => 
        !!chatsSnapshot?.docs.find(
            (chat) => // It is a document
                chat.data() // { users: [u1,u2] }
                    .users.find( // [u1,u2]
                        (user) => user === recipientEmail
                    )?.length > 0 // Return a query
        );

    return (
        <Container>
            <Header>
                {/* User Icon */}
                <UserAvatar src={user.photoURL} onClick={ () => auth.signOut() } /> 

                {/* Container of Icons */}
                <IconsContainer>
                    {/* Give it the characteristics of a button*/}
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>

            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {/* List of Chats */}
            {chatsSnapshot?.docs.map(chat => 
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            )}

        </Container>
    )
}

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    /* Increase the priority */
    &&&{ 
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex:1;
`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    border-bottom: 2px solid whitesmoke
`;

const UserAvatar = styled(Avatar)`
    margin: 10px;
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }

`;

const IconsContainer = styled.div`

`;