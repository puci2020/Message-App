import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    padding-left: 10px;
    margin: 10px 0;

    svg {
        color: gray;
    }
`;

const InputField = styled.input`
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    height: 100%;
`;

const Input = ({ type, icon, placeholder, value, onChange }) => {
    return (
        <Wrapper>
            {icon}
            <InputField
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </Wrapper>
    );
};

export default Input;
