import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice"
import ChatInput from './ChatInput';
import { db } from "../firebase";
import Message from './Message';


function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails, setroomDetails] = useState([]);
    const [roomMessages, setroomMessages] = useState([]);
    const [firstTimeLoading, setfirstTimeLoading] = useState(false);

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
        if (firstTimeLoading === false) {
            getRoomInfo();
            getMessageInfo();
            setfirstTimeLoading(true);
        }

        chatRef.current.scrollIntoView({
            behavior: "smooth",
        });
    }, [roomId]);
    // console.log('roomMessages');
    // console.log(roomMessages);

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <div>
                    <Header>
                        <HeaderLeft>
                            {roomDetails.filter(channel => channel.id === roomId).map(singleChannel => (
                                <h3><strong>#{singleChannel.name}</strong></h3>
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
                        {roomMessages
                            .filter(channel => channel.channelId
                                .includes(roomId))
                            .map(singleChannel => (
                                <Message
                                    userImage={singleChannel.image}
                                    message={singleChannel.message}
                                    timestamp={singleChannel.timestamp}
                                    user={singleChannel.user}
                                />
                            ))
                        }
                        <ChatBottom ref={chatRef} />
                    </ChatMessages>

                    {roomDetails.filter(channel => channel.id === roomId).map(singleChannel => (
                        <ChatInput
                            chatRef={chatRef}
                            channelName={singleChannel.name}
                            channelId={roomId}
                        />
                    ))
                    }
                </div>
            )
            }


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

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;
