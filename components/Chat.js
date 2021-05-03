import {Avatar} from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import styled from 'styled-components';
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import { useRouter } from "next/router";

export default function Chat({id, users}) {

    const router = useRouter();

    const [user] = useAuthState(auth);

    // Get the receptor info
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email','==',getRecipientEmail(users,user))
    );

    // "Redirect" to url
    const enterChat = () => {
        router.push(`/chat/${id}`);
    }

    // Collection lenght == 1
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    // Get the user receptor
    const recipientEmail = getRecipientEmail(
        users,
        user
    );


    return(
        <Container onClick={enterChat}>
            {recipient?
                (<UserAvatar src={recipient?.photoURL}></UserAvatar>)
                : (<UserAvatar>{recipientEmail[0]}</UserAvatar>)
            }
            <p>{recipientEmail}</p>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover{
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;