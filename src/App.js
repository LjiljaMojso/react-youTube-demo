import React, { Component,Fragment } from "react";
import { axios } from "axios";
import './App.css';


import { Header } from "./components/Header/Header";
import { VideoList } from "./components/VideoList/VideoList";
import { VideoPreview } from "./components/VideoPreview/VideoPreview";

class App extends Component {
  state = {
    results: [],
    key: "AIzaSyBHbxss9C0fVG-y-UqoyQqYy-c1kEGBcvI",
    idToPlay: "",
    loading: false
  };

  getSearchTerm = e => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    this.setState({
      loading: true
    });

    searchTerm
    ? axios
          .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=${searchTerm}&key=${this.state.key}`)
          .then(resolve => {
            const results = resolve.data.items;

            this.setState({
              results: results,
              idToPlay: "",
              loading: false
            });
          })
      : null;
  };

  getRelated = id => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&relatedToVideoId=${id}&type=video&key=${this.state.key}`
      )
      .then(resolve => {
        const results = resolve.data.items;
        this.setState({
          results: results
        });
      });
  };

  componentDidMount() {
    this.setState({
      idToPlay: this.state.idToPlay
    });
  }

  playVideo = id => {
    this.setState({
      idToPlay: id
    });
    console.log(id);
    console.log(this.state.idToPlay);
  };
  render() {
  const { idToPlay} = this.state;

  return (
    <Fragment>    
    <Header/>
    <main>
          {console.log(this.state.idToPlay)}
          <div className="main-wrapper">
            {this.state.idToPlay !== "" && <VideoPreview idToPlay={idToPlay} />}
              <VideoList
                getRelated={id => {
                  this.getRelated(id);
                }}
                playVideo={id => {
                  this.playVideo(id);
                }}
                results={this.state.results}
              />
            )
          </div>
        </main>
    </Fragment>

  );
}
}
export default App;
