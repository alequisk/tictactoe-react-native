import React from 'react';
import styled from 'styled-components/native';

const Option = styled.Pressable`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  border: 2px solid #eee;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.highlight ? '#ffecaf' : 'transparent'};
  /* background-color: #ffeaa7; */
`;

const OptionText = styled.Text`
  font-size: 56px;
  font-weight: bold;
  color: ${props => props.option === 'X' ? '#f00' : '#00f'};
`;

export function Block({ content, onPress, highlight }) {
  return (
    <Option onPress={onPress} highlight={highlight}>
      <OptionText option={content} >
        {content}
      </OptionText>
    </Option>
  );
}