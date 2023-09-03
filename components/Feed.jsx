"use client";

import { useCallback, useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}

        />
      ))}
    </div>
  )
}

// this is for the feed 
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [Allposts, setAllPosts] = useState([]);

  const handleTagsAreClicked = (tagArray) => {

  }

  const handleSearchChange = (value) => {
    const searchValue = value;
    setSearchText(searchValue);
  }

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const optimizedFn = useCallback(debounce(handleSearchChange), []);

  //whenever there is a update to searchText, run this effect:
  useEffect(() => {
    const filteredData = []
    if (searchText !== "") {
      Allposts.forEach(element => {
        let prompt = element.prompt;
        if (prompt.startsWith(searchText)) {
          filteredData.push(element);
        }
      });
      setAllPosts(filteredData)
    }
    else {
      const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setAllPosts(data);
      }
      // calling the function here inside useEffect
      fetchPosts();
    }

  }, [searchText])

  //api call in the begining to fill the feed with the data
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    }
    // calling the function here inside useEffect
    fetchPosts();
  }, []); // [] -> It is not depended on changes to any of the states. The effect is called only once when the component is rendered in teh begining.

  return (
    <section className="feed">
      {/* to search the prompts */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Enter a tag of username"
          // value={searchText}
          onChange={(e) => optimizedFn(e.target.value)}
          required
          className="search_input peer"  //the peer class is used to style the element's siblings using its present state. Look in tailwind docs
        />
      </form>

      {/* to display the prompts */}
      <PromptCardList
        data={Allposts}

      />
    </section>
  )
}

export default Feed