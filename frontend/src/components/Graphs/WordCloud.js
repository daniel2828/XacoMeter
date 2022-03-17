import React from 'react'
import { TagCloud } from 'react-tagcloud'
const data = [
  { value: 'JavaScawdawdawdawdawdawdawdawdawdawdawdawdawdawdawwdawdript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'MongoDB', count: 18 },
  { value: 'CSS3', count: 20 },
]
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
