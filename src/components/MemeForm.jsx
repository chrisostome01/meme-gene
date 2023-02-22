import React, { useEffect, useState } from "react";

export default function MemeForm() {
  const [allMemes, setAllMemes] = useState([]);
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "walk into Mordor",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevState) => {
      return { ...prevState, randomImage: url };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return { ...prevMeme, [name]: value };
    });
  }

  return (
    <main>
      <div className="form">
        <input
          className="form--input"
          type="text"
          name="topText"
          placeholder="Top text"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="form--input"
          type="text"
          name="bottomText"
          placeholder="Bottom text"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 📸
        </button>
        <div className="meme">
          <img src={meme.randomImage} alt="meme" className="meme--img" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}
