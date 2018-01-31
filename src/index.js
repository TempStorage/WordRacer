import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var arrLen = 1000

function TypeText(props) {
  return (
    <div className="type-box" placeholder="Your text will appear here">{props.AllText}</div>
  );

}

function TypeBox(props) {
  return (
    <div className="type-text">
      <span className="wrong-text">{props.WrongText}</span>
      <span className="todo-text">{props.TodoText}</span>
    </div>
  );
}

class PlayArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PlayArea: {
        DoneText: "",
        WrongText: "",
        TodoText: "Coffee is a brewed drink prepared from roasted coffee beans, which are the seeds of berries from the Coffea plant. The genus Coffea is native to tropical Africa (specifically having its origin in Ethiopia and Sudan) and Madagascar, the Comoros, Mauritius, and Reunion in the Indian Ocean.",
        AllText: new Array(arrLen),
        indexLen: 0
      }
    }
  }


  RenderTypeBox() {
    return (
      <TypeBox WrongText={this.state.PlayArea.WrongText} 
        DoneText={this.state.PlayArea.DoneText} 
        TodoText={this.state.PlayArea.TodoText}/>
    )
  }

  RenderTypeText() {
    return (
      <TypeText AllText={this.state.PlayArea.AllText}/>
    )
  }


  handleKeyPress = (event) => {
    console.log(event.key)
    var PlayArea = {...this.state.PlayArea}
    if (!(PlayArea.TodoText.length === 0)) {
      if (event.key === "Backspace") {
        if (!(PlayArea.WrongText.length === 0)) {
          PlayArea.WrongText = PlayArea.WrongText.slice(0, -1);
        } else if (!(PlayArea.DoneText.length === 0)) {
          PlayArea.TodoText = PlayArea.DoneText.slice(-1) + PlayArea.TodoText
          PlayArea.DoneText = PlayArea.DoneText.slice(0, -1);
        }
      } else if (event.key.length === 1) {
        if (event.key === PlayArea.TodoText.charAt(0) && PlayArea.WrongText.length === 0) {
          PlayArea.DoneText += PlayArea.TodoText.charAt(0)
          PlayArea.TodoText = PlayArea.TodoText.slice(1)
          PlayArea.AllText.push(event.key)
        } else {
          PlayArea.WrongText += event.key
          PlayArea.AllText.push(<span class="wrong-text">{event.key}</span>)
        }
      }
      console.log(PlayArea)
      this.setState({ PlayArea: PlayArea })
    }
  }

  render() {
    return (<div class="play-area" autoFocus tabIndex="0" onKeyDown={this.handleKeyPress}>
    Type this:
    {this.RenderTypeBox()}
    This is what you have written:
    {this.RenderTypeText()}
    Make sure this is in focus before typing!
    </div>)
  }
}

ReactDOM.render(
  <PlayArea />,
  document.getElementById('root')
);