import React from 'react'
import { TagCloud } from 'react-tagcloud'

export default function WordCloud({tweetData}) {
    console.log("EEE", tweetData);
  return (
    <TagCloud
              minSize={12}
              maxSize={35}
              tags={tweetData.slice(-10).map(element=>{
                  return {value: element.tweet.text, count:20}
              })}
              onClick={tag => alert(`'${tag.value}' was selected!`)}
    />
  )
}
