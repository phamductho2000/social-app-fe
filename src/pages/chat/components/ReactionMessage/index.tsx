import React, {FC, useEffect, useState} from "react";
import './style.css';

type ReactionMessageProps = {
  data?: API.Reaction[];
};

const ReactionMessage: FC<ReactionMessageProps> = ({data}) => {

  const [source, setSource] = useState<any[]>([])

  const groupByWithCount = (arr: any[], key: string) => {
    const map = new Map();

    for (const item of arr) {
      const k = item[key];
      if (map.has(k)) {
        map.get(k).count += 1;
      } else {
        map.set(k, {...item, count: 1});
      }
    }

    return Array.from(map.values());
  };

  useEffect(() => {
    if (data && data?.length > 0) {
      setSource(groupByWithCount(data, 'unified'))
    }
  }, [data]);

  return (
    <div className={"reaction-container"}>
      {
        source?.map(m => (
          <span key={m.unified}>{`${m.emoji} ${m.count > 1 ? m.count : ''}`}</span>
        ))
      }
    </div>
  )
}
export default ReactionMessage;
