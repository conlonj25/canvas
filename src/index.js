import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

  class Box extends React.Component{

    constructor(props){
      super(props);

      this.state = {
        list: ["Apple","Orange","Mango"],
      };
    }
    
    render(){
        return(
            <div class={this.props.title}>
                {this.props.title}
                <button onClick={
                  () => {
                    //this.state.list.push("Mango");
                    var newArray = this.state.list.concat("Mango");
                    this.setState({list: newArray});
                    console.log(this.state.list);
                  }
                }>+</button>

                <NumberList numbers={this.state.list} />

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

  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }


  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Canvas/>);