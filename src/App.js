import React, { Component } from 'react';
import './App.css';

import experiences from './experiences.json';

// var sample = {
//   "img": "3c5d7f84-7934-40e7-83de-a822428d5202.jpg",
//   "href": "https://www.airbnb.com/experiences/37820?source=p2&currentTab=experience_tab&searchId=9eb5daaa-81f8-42a7-a046-8afaf37668de",
//   "price": "￥797",
//   "desc": "Enjoy a decadent meal and after party at a secret venue"
//  };

function Experience(props){
  //console.log("Experience props:",props);
  var data = props.experience_object;
  var highlight = props.highlight;
  var img_src = "https://inimino.github.io/js-intro-exercises/airbnb/img/" + data.img
  var desc = data.desc
  var chunks, chunks_after
  if(highlight){
    //desc = desc.replace(RegExp(highlight,"i"),m => <b>{m}</b>)
    chunks = desc.split(RegExp(highlight,"i"))
    chunks_after = [chunks.shift()]
    while(chunks.length){
      chunks_after.push(<b>{highlight}</b>)
      chunks_after.push(chunks.shift())
    }
    desc = chunks_after
  }
  return (
    <div className="Experience">
      <div><img src={img_src}/></div>
      <p><span>{data.price}</span><span>{desc}</span></p>
    </div>
  )
}

class App extends Component {
  render() {
    var state = this.state || {};
    console.log(state.search);
    //console.log(experiences);
    var exp_cards = experiences.filter(match).map(function(exp){
      return <Experience key={exp.img} highlight={state.search} experience_object={exp}/>
    });
    return (
      <div>
        <div className="Experiences-controls">
          <input placeholder="search" onChange={e => {this.setState({search:e.target.value})}}/>
        </div>
        <div className="Experience-container">
          {exp_cards}
        </div>
      </div>

      //  onChange={e => {this.setState({search:e.target.value})}}
    );

    function match(exp){
      if(!state.search) return true;
      return exp.desc.match(RegExp(state.search,'i'));
    }
    // function exp(exp){
    //   return <Experience experience_object={exp} highlight={state.search}/>;
    // }
  }
}

export default App;
