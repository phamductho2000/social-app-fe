import React, {useState} from "react";
import {Input, Tag} from "antd";
import "./style.css";

type PropTag = {
  value: string,
  onChange?: (value: string) => void;
}
// @ts-ignore
const InputTags: React.FC<PropTag> = ({value, onChange, ...res}) => {
  const [inputVal, setInputVal] = useState<string>();
  const [tags, setTags] = useState<any[]>(['ok', '123']);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  }

  return (
    <>
      <div className="wrap-input-tags">
        {/*{*/}
        {/*  tags?.map(tag => (*/}
        {/*    // <Tag key={tag} className="tag-ele" closable onClose={() => handleRemoveTag(tag)}>{tag}</Tag>*/}
        {/*  ))*/}
        {/*}*/}
        <Input className="input-ele" allowClear
               size={"large"}
               value={inputVal}
               onChange={handleOnChange}
               {...res}></Input>
      </div>

    </>
  )
}
export default InputTags;
