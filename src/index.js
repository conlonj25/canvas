import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

  class Box extends React.Component{
    render(){
        return(
            <div class="myBox">
                {this.props.title}
            </div>
        )
    }
  }

  class Canvas extends React.Component{

    render(){
      return(
        <div>
          <Box title="partners" />
          <Box title="projects" />
        </div>
      );
    }
    
  }

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Canvas/>);