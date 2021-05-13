import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    margin: 10px 0;

    span {
        padding-left: 10px;
        font-size: ${({ theme }) => theme.font.size.xs};
        /* letter-spacing: ${({ theme }) => theme.font.space.s}; */
        color: red;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 35px;
    border-radius: 20px;
    padding-left: 10px;
    margin-bottom: 5px;

    border: ${(props) => (props.error ? '1px solid red' : '')};

    svg {
        color: gray;
    }

    .error {
        border: 1px solid red;
    }
`;

const InputField = styled.input`
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    height: 100%;
`;

const Input = ({ type, icon, placeholder, value, onChange, error }) => {
    return (
        <Wrapper>
            <InputWrapper error={error}>
                {icon}
                <InputField
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </InputWrapper>
            {error ? <span>{error}</span> : ''}
        </Wrapper>
    );
};

export default Input;
