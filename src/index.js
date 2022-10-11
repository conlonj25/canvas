import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

  class Box extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      history: [],
    };
  }
  
    render(){
        return(
            <div class={this.props.title}>
                {this.props.title}
                <button
                  onClick={
                    () => {
                      this.state.history.push("Mango");
                      console.log(this.state.history);
                    }
                  }
                >
                  +
                </button>
                <ul>
                </ul>
            </div>
        )
    }
  }

  class Canvas extends React.Component{

    render(){
      return(
        <div class="canvas">
          <Box title="partners" />
          <Box title="activities" />
          <Box title="resources" />
          <Box title="propositions" />
          <Box title="relationships" />
          <Box title="channels" />
          <Box title="segments" />
          <Box title="structure" />
          <Box title="streams" />
        </div>
      );
    }
    
  }

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Canvas/>);