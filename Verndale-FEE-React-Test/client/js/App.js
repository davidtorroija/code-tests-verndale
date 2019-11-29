"use strict";
import "babel-polyfill";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Autocomplete from "./components/Autocomplete";
import $ from "jquery";

import app from "../sass/app";

export default class Application extends Component {
    constructor(props) {
		super(props);
		this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
	}
	
	componentDidMount() {
     
    }

    render() {
		const { items } = this.state;
        return (
            <div>
                <Autocomplete
                    width="300px"
                    // suggestions={items.map(item => item.name)}
                />
            </div>
        );
    }
}

ReactDOM.render(<Application />, document.getElementById("app"));
