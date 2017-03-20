import React, { Component } from 'react';
import $ from 'jquery'; 
import './App.css';

//***********Variables*********
var names =  []; // the names of repositories of the current page
var starshave = [];
var forkshave = [];
var issueshave = [];
var pagecount = 1; //page number
var currentlan = "All"; // the current language that shown
var prev = 0; // the previous page

//***********Some Nodes*************
const ListPanel = ({ children }) => (
  <ul className="ListPanel">
    { children }
  </ul>
)

const Tab = ({
  _onClick,
  _isActive,
  children,
}) => (
  <li
    className={ `Tab  ${ _isActive ? "active" : "" }` }
    onClick={ _onClick }>
    { children }
  </li>
)

const TabPage = ({
  _onClick,
  _isActive,
  children,
}) => (
  <li
    className={ `TabPage  ${ _isActive ? "active" : "" }` }
    onClick={ _onClick }>
    { children }
  </li>
)

const TabInput = ({
  children,
}) => (
  <li
    className={ `TabPage` }>
    { children }
  </li>
)

const TabSelect = ({
  children,
}) => (
  <li
    className={ `TabSelect` }>
    { children }
  </li>
)


const DetailPanel = ({
  _isActive,
  children,
}) => (
  <div className={ `DetailPanel  ${ _isActive ? "active" : "" }` }>
    { children }
  </div>
)

const Button = ({ children }) => (
  <button className="Button">
    { children }
  </button>
)

const ButtonPage = ({ children }) => (
  <button className="ButtonPage">
    { children }
  </button>
)

//****************AJAX interaction with Github API***************
function getresponame() {
			console.log(currentlan);
    		var url = 'https://api.github.com/search/repositories?q=stars%3A>1';
    		if (currentlan !== "All") {
    			url = url + '+language:' + currentlan;
    		} 
    		url = url+ '&sort=stars&order=desc&page='+pagecount+'&per_page=20'
    		$.ajax(url, {
    		    async: false,
    			dataType: 'json',
    			success: function(r) {
    				for (var i = 0; i<20; i++) {
    					names[i] = (r.items[i].name);
    					starshave[i] = (r.items[i].stargazers_count);
    					forkshave[i] = (r.items[i].forks_count);
    					issueshave[i] = (r.items[i].open_issues_count)
    				}
    				
    			},
    			error: function(r) {
    				console.log('got error in getresponame');
    			}
    		});
}

//******************Main Panel render class******************
class MainPanel extends Component {
  constructor(props) {
    super(props);
      this.state = { selected: this.props.selected /*current tab selected*/,
  			value: 1, /* current page number*/
  			language: "All" /* current language*/};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected })
    }
  }

  handleClick(tab) {
  	//console.log("onClick");
    return () =>this.setSelected(tab);
  }
  handleClickPageL(tab) {
  	if (pagecount === 1) {
  		return;
  	}
  	pagecount--;
  	
  	if (prev === tab) { tab -= 2;};
  	prev = tab;
  	var jumpto = this.state.value;
  	jumpto--;
  	this.setState({value: jumpto--});
    return this.setSelected(tab);
  }
  handleClickPageR(tab) {
  	pagecount++;
  	//console.log("onClick!");
  	if (prev === tab) { tab -= 2;};
  	prev = tab ;
  	//getresponame();
  	var jumpto = this.state.value;
  	jumpto++;
	this.setState({value: jumpto});
    return this.setSelected(tab);
  }

  handleSubmit = (event) => {
	if(event.key === 'Enter'){
		if (document.getElementById("Pageinput").value <= 0) {
			alert("Invalid Input: Page number cannot be smaller than 1");
			document.getElementById("Pageinput").value = ''
			return;
		}
    //alert('A name was submitted: ' + );
	this.setState({value: document.getElementById("Pageinput").value});
	pagecount=document.getElementById("Pageinput").value;
	document.getElementById("Pageinput").value = '';
    }
  }

   handleChange = (event)=> {
   	console.log(this.state.language);
   	currentlan = event.target.value;
    this.setState({language: currentlan});
  }



  renderTabList(child) {
    getresponame();
  	
    let tab = 0;
    let count = -1;

    return React.cloneElement(child, {
      	children: React.Children.map(child.props.children, (childTab) => {
        if (childTab.type.name === "Tab") {
        	const _isActive = (tab === this.state.selected);
          	const _onClick =  this.handleClick(tab);

          	tab++;
          	count++;

          	return React.cloneElement(childTab, { _isActive, _onClick }, (<Button>{(this.state.value-1)*20+count+1}. {names[count]}</Button>));
        } if (childTab.type.name === "TabPage" && count ===19) {
        	const _isActive = (tab === this.state.selected);
          	const _onClick = () => this.handleClickPageL(tab);

          	tab++;
          	count++;

          	return React.cloneElement(childTab, { _isActive, _onClick }, (<ButtonPage> &lt;</ButtonPage>));
        } if (childTab.type.name === "TabPage" && count ===20) {
        	const _isActive = (tab === this.state.selected);
          	const _onClick = () => this.handleClickPageR(tab);

          	tab++;
          	count++;

          	return React.cloneElement(childTab, { _isActive, _onClick }, (<ButtonPage> &gt;</ButtonPage>));
        } if (childTab.type.name === "TabInput") {
        	

          	tab++;
          	count++;

          	return React.cloneElement(childTab, {  }, (
          		
        
          <input id="Pageinput" onKeyDown={this.handleSubmit} className="myinput" placeholder="Jump to..." />
		));
        } if (childTab.type.name === "TabSelect") {
        	

          	tab++;
          	count++;

          	return React.cloneElement(childTab, {  }, (
          	<select onChange={this.handleChange}>
    			<option defaultValue value="All">All</option>
    			<option value="Javascript">Javascript</option>
    			<option value="Java">Java</option>
    			<option value="Python">Python</option>
    			<option value="Ruby">Ruby</option>
    			<option value="PHP">PHP</option>
    			<option value="C++">C++</option>
    			<option value="C%2B%2B">C</option>
    			<option value="C%23">C#</option>
    			<option value="HTML">HTML</option>
    			<option value="Shell">Shell</option>
			</select>));
        }

        return childTab;
      	}),
    })
  }

  renderChildren(children) {
    let panel = 0

    return React.Children.map(children, (child) => {
      if (child.type.name === "ListPanel") { // render the list panel
        return this.renderTabList(child)
      }

      if (child.type.name === "DetailPanel") { // render the detail panel
        const _isActive = (panel === this.state.selected)
        panel++

        return React.cloneElement(child, { _isActive }, (<div className="boxes">
        	<div className="title">{names[panel-1]}</div>
        	<div className="boxindi">{starshave[panel-1]}<div className="smalltext">STARS</div></div>
        	<div className="boxindi">{forkshave[panel-1]}<div className="smalltext">FORKS</div></div>
        	<div className="boxindi">{issueshave[panel-1]}<div className="smalltext">ISSUES</div></div></div>))
      }

      return child
    })
  }

  render() {
    return (
      <div className="MainPanel">
        { this.renderChildren(this.props.children) }
      </div>
    )
  }
}

// ***************Root******************
const Root = () => (
  <div className="Root">
	<header className="main-header">
        <h1>MyGitRank</h1>
    </header>

    <MainPanel selected={ 0 }>
      <ListPanel>
        <Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab>
        <Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab>
        <Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab>
        <Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><Tab></Tab><TabPage></TabPage><TabPage></TabPage><TabInput></TabInput><TabSelect></TabSelect>
      </ListPanel>
     
      <DetailPanel></DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel>
      <DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel>
      <DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel>
      <DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel>
      <DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel><DetailPanel>test</DetailPanel>
      
    </MainPanel>
  </div>
)


class App extends Component {
  render() {
    return (
        <Root />
    );
  }
}

export default App;



