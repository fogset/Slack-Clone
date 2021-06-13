import React from 'react';
import styled from 'styled-components';
import { Avatar } from "@material-ui/core"
import AccessTimeIcon from "@material-ui/icons/AccessTime"

function Header() {
    return (
        <HeaderContainer>
            {/*Header left */}
            <HeaderLeft>
                <HeaderAvatar
                //TODO: Add onclick
                />
                <AccessTimeIcon />
            </HeaderLeft>
            {/*Header Search */}

            {/*Header Right */}
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.div`
    display: flex;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;
`;

const HeaderAvatar = styled(Avatar)``