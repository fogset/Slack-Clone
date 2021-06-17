import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice"
import ChatInput from './ChatInput';
import { db } from "../firebase";

// const [roomDetails] = useDocument(
//     roomId && db.collection('rooms').doc(roomId)
// )
// const [roomMessages] = useCollection(
//     roomId &&
//     db
//         .collection('rooms')
//         .doc(roomId)
//         .collection('messages')
// )

function Chat() {
    const roomId = useSelector(selectRoomId);
    const [roomDetails, setroomDetails] = useState([]);
    const [roomMessages, setroomMessages] = useState([]);

    function getRoomInfo() {
        db.collection("rooms").get()
            .then(snapshot => {
                const items = [];
                snapshot.forEach(doc => {
                    items.push(doc.data());
                })
                setroomDetails(items);
            })
            .catch(error => console.log(error))
    }
    function getMessageInfo() {
        db.collection("messages")
            .orderBy("timestamp", "asc")
            .get()
            .then(snapshot => {
                const items = [];
                snapshot.forEach(doc => {
                    items.push(doc.data());
                })
                setroomMessages(items);
            })
            .catch(error => console.log(error))
    }


    useEffect(() => {
        getRoomInfo();
        getMessageInfo()
    }, []);

    return (
        <ChatContainer>
            <>
                <Header>
                    <HeaderLeft>
                        {roomDetails.filter(channel => channel.id === roomId).map(singleChannel => (
                            <h4><strong>#{singleChannel.name}</strong></h4>
                        ))
                        }
                        <StarBorderOutlinedIcon />
                    </HeaderLeft>

                    <HeaderRight>
                        <p>
                            <InfoOutlinedIcon /> Details
                        </p>
                    </HeaderRight>
                </Header>
                <ChatMessages>

                </ChatMessages>

                {roomDetails.filter(channel => channel.id === roomId).map(singleChannel => (
                    <ChatInput
                        channelName={singleChannel.name}
                        channelId={roomId}
                    />
                ))
                }

                {roomMessages.map(singleChannel => (
                    <h1>{singleChannel.message}</h1>
                ))
                }

            </>
        </ChatContainer>
    )
}

export default Chat

const Header = styled.div`
    display: flex;
    justify-content:space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    `;
const ChatMessages = styled.div``;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

>h4{
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
}

>h4 >.MuiSvgIcon-root{
    margin-left: 20px;
    font-size: 18px;
}
`;

const HeaderRight = styled.div`
>p{
    display:flex;
    align-items: center;
    font-size: 14px;
}
>p>.MuiSvgIcon-root{
    margin-right: 5px !important;
    font-size:16px;
}
`;

const ChatContainer = styled.div`
    flex:0.7;
    flex-grow:1;
    overflow-y:scroll;
    margin-top: 60px;
`;
