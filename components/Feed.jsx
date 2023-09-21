"use client";

import { useCallback, useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagsAreClicked }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          prompthandleTagsAreClicked={handleTagsAreClicked}
        />
      ))}
    </div>
  )
}

// this is for the feed 
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [inputText, setInputText] = useState("");
  const [Allposts, setAllPosts] = useState([]);

  const handleTagsAreClicked = (tag) => {
    const searchValue = "#" + tag;
    setInputText(searchValue)
    setSearchText(searchValue);
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
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounce(handleSearchChange), []); // I used this here to have the debouce func get cached.

  //whenever there is a update to searchText, run this effect:
  useEffect(() => {
    const filteredPrompts = []
    const filteredTags = []
    if (searchText !== "") {
      Allposts.forEach(element => {
        let prompt = element.prompt;
        let tag = element.tag;
        let clickedTag = searchText.substring(1);

        if (searchText.startsWith("#") && tag.includes(clickedTag)) {
          filteredTags.push(element);
          setAllPosts(filteredTags)
        }
        if (!(searchText.startsWith("#")) && prompt.startsWith(searchText)) {
          filteredPrompts.push(element);
          setAllPosts(filteredPrompts)
        }
      });
    }
    else {
      const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setAllPosts(data);
      }
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
          value={inputText}
          placeholder="Enter a tag of username"
          // value={searchText}
          onChange={(e) => {
            setInputText(e.target.value);
          
            optimizedFn(e.target.value)
          }}
          required
          className="search_input peer"  //the peer class is used to style the element's siblings using its present state. Look in tailwind docs
        />
      </form>

      {/* to display the prompts */}
      <PromptCardList
        data={Allposts}
        handleTagsAreClicked={handleTagsAreClicked}
      />
    </section>
  )
}

export default Feed